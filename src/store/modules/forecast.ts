
import { api } from '../../api'
import Vue from 'vue'
import Vuex from 'vuex'

import * as icons from '../../assets/icons.json' 
const weatherIcons = (<any>icons).default;

Vue.use(Vuex)

export interface State {
  error: boolean;
  forecast: {
    cityName: string | null;
    temperatureScale: string;
    prevTemperatureScale: string;
    humidity: number | null;
    temp: number | null;
    temp_min: number | null;
    temp_max: number | null;
    icon: string | null;
    description: string | null;
    main: string | null;
    wind_speed: number | null;
    wind_deg: number | null;
    country: string | null;
  }
  tempCache: {
      temp: number | null;
      temp_min: number | null;
      temp_max: number | null;
    }
}
// initial state used when creating store
const defaultState: State = {
  error: false,
  forecast: {
    cityName: null,
    temperatureScale: 'kelvin',
    prevTemperatureScale: 'kelvin',
    humidity: null,
    temp: null,
    temp_min: null,
    temp_max: null,
    icon: null,
    description: null,
    main: null,
    wind_speed: null,
    wind_deg: null,
    country: null
  },
  tempCache: {
    temp: null,
    temp_min: null,
    temp_max: null
  }
};

// mutations
export const setCityName = 'setCityName'
export const setTempScale = 'setTempScale'
export const calculateTempValues = 'calculateTempValues'
export const ERROR = 'ERROR'
// export const setIsLoading = 'setIsLoading' // done via $q.isloading in components
export const setWeatherForecast = 'setWeatherForecast'
export const setPrevWeatherForecast = 'setPrevWeatherForecast'
// getters
export const getTemp = 'getTemp'
// actions
export const actionForecastByCityName = 'actionForecastByCityName'
export const actionRemoveError = 'actionRemoveError'
export const actionSetTempScale = 'actionSetTempScale'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default function (/* { ssrContext } */) {
  Vue.config.devtools = true
  const Store = new Vuex.Store({
    state: defaultState,
    mutations: {

      [setCityName]: (state, payload: string) => {
        state.forecast.cityName = payload
      },
      [setTempScale]: (state, scale: string) => {
        state.forecast.temperatureScale = scale
      },
      
      [calculateTempValues]: (state) => {
        
        var keys : Array<string> = ['temp', 'temp_min', 'temp_max']

        keys.forEach(function(key:string){
          
          // Use original cached Kelvin temparaturel for each conversion 
          var temp:number = state.tempCache[key]

          if (state.forecast.temperatureScale === 'fahrenheit') {

              state.forecast[key] =   Math.round((temp * 1.8 - 459.67) * 100) / 100
          }
          else if (state.forecast.temperatureScale === 'kelvin') {

              state.forecast[key] = temp 
          }
          if (state.forecast.temperatureScale === 'celcius') {

              state.forecast[key] =    Math.round((temp - 273.15) * 100) / 100
            }
        })
        // update prevTempScale after loop is finished
        if (state.forecast.prevTemperatureScale !== state.forecast.temperatureScale) {
          state.forecast.prevTemperatureScale = state.forecast.temperatureScale
        }
      },
      [ERROR](state, error) {
        state.error = error;
      },

      [setWeatherForecast]: (state, payload) => {

        state.tempCache.temp = payload.main.temp,
        state.tempCache.temp_min = payload.main.temp_min,
        state.tempCache.temp_max = payload.main.temp_max

        state.forecast.temp = payload.main.temp
        state.forecast.temp_min = payload.main.temp_min
        state.forecast.temp_max = payload.main.temp_max
        state.forecast.description = payload.weather[0].description.charAt(0).toUpperCase() + payload.weather[0].description.slice(1)

        state.forecast.humidity = payload.main.humidity
        state.forecast.wind_speed = payload.wind.speed
        state.forecast.wind_deg = payload.wind.deg
        state.forecast.country = payload.sys.country

        var prefix = 'icon-wi-';
        var code = payload.weather[0].id;
        var icon = weatherIcons[code].icon;
        // If we are not in the ranges mentioned above, add a day/night prefix.
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
          icon = 'day-' + icon;
        }
        //  tack on the prefix.
        state.forecast.icon = prefix + icon;
      }
    },
    actions: {

      [actionRemoveError](context) {
        function sleep(ms: number) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function removeError() {
          await sleep(4000);
          // remove error from state after 4 seconds
          context.commit(ERROR, false)
        }
        removeError();
      },
      [actionForecastByCityName](context, payload: string) {
        return new Promise((resolve, reject) => {
          context.commit(setCityName, payload)
          api.getForecastByCityName(payload).then((response) => {
            context.commit(setWeatherForecast, response.data)
            resolve(response)
          }).catch(error => {
            // set error to state
            context.commit(ERROR, error.response.status)  // handle 404 or other status with custom message
            // context.commit(ERROR, error.message) // "response failed with a code 404"

            reject(error)
          })
        })
      },

      [actionSetTempScale](context, scale: string) { // accept any type
        context.commit(setTempScale, scale)
        context.commit(calculateTempValues)
      },
    }
  })
  return Store
}