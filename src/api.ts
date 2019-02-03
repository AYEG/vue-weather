// alternative approach is to import the axios instance which can hold an api baseURL
// https://quasar-framework.org/guide/app-plugins.html#Examples-of-app-plugins
// import {axiosInstance as axios} from 'plugins/axios'

import axios from 'axios'

const apiKey = process.env.API_KEY


async function getForecastByCityName (cityName : string){

  return axios.post(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
  
}
// approach for error handling ( not required with axios ):
// try {
//   res = await axios.post(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
// } catch (err) {
//   console.error("Error response:");
//   console.error(err.response.data);    // ***
//   console.error(err.response.status);  // ***
//   console.error(err.response.headers); // ***
//   alert("city not found")
//   // optional: return error, put it in vuex store and display message via quasar q-alert component
// } finally {
//   return res
// }

export const api = {
  getForecastByCityName
}
