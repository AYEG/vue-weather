<template>
  <div class="grid-container bg-transition">
    <div class="box fullwidth"></div>
    <div class="box" style="height: 15vh;"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box" >
      <q-card color="brand" square style="height: 100%; width: 100%; color: black">
        <q-card-main>
          <q-field>
            <div class="flex-container">
              <div class="flex-item-narrow"></div>
              <h5 class="flex-item-wide">{{ cityName }}, {{ country }}</h5>
              <q-btn-toggle
                class="flex-item-wide"
                v-model="temperatureScale"
                flat
                color="grey-5"
                size="1.10em"
                toggle-color="secondary"
                :options="[
                {label: 'Kelvin', value: 'kelvin'},
                {label: 'Celcius', value: 'celcius'},
                {label: 'Fahrenheit', value: 'fahrenheit'},
              ]"
              />
              <div class="flex-item-narrow" id="time">{{this.time}}</div>
              <div class="flex-item-narrow"></div>
            </div>
            <q-card-separator/>
          </q-field>
          <div class="flex-container">
            <div class="flex-item-narrow"></div>
            <div class="flex-item-wide">
              <q-field>
                <div class="flex-container" >
                  <div style="flex-wrap: nowrap;margin-right:10px;">
                    <p>
                      Temperature: <b> {{temp}}</b>
                      <span v-if="temperatureScale === 'kelvin'">&#8490;</span>
                      <span v-else-if="temperatureScale === 'celcius'">&#8451;</span>
                      <span v-else-if="temperatureScale === 'fahrenheit'">&#8457;</span>
                    </p>
                  </div>
                  <p>Min <b> {{temp_min}} / </b>Max  <b>{{temp_max}} </b></p>
                </div>
                <p>humidity {{humidity }} %</p>
                <p>wind speed: {{ wind_speed }}</p>
                <p>wind deg: {{ wind_deg }}</p>
              </q-field>
            </div>
            <div class="flex-item-wide"><p>
              <q-icon :name="`${icon}`" size="9em" color="teal-4"/>
                {{ description }} </p>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</template>
<style>
.i {
  font-family: weathericons-regular;
  font-size: 30px;
}
</style>

<script>
export default {
  name: 'cityWeather',
  data () {
    return {
      time: this.getTime(),
      temperatureScale: 'kelvin'
    }
  },
  computed: {
    temp () {
      return this.$store.state.forecast.temp
    },
    temp_min () {
      return this.$store.state.forecast.temp_min
    },
    temp_max () {
      return this.$store.state.forecast.temp_max
    },
    cityName () {
      return this.$store.state.forecast.cityName
    },
    humidity () {
      return this.$store.state.forecast.humidity
    },
    description () {
      return this.$store.state.forecast.description
    },
    wind_speed () {
      return this.$store.state.forecast.wind_speed
    },
    wind_deg () {
      return this.$store.state.forecast.wind_deg
    },
    icon () {
      return this.$store.state.forecast.icon
    },
    country () {
      return this.$store.state.forecast.country
    }

  },
  watch: {
    temperatureScale: function (val, oldVal) {
      this.$nextTick(function () {
        this.$store.dispatch('actionSetTempScale', this.temperatureScale, val)
      })
    }
  },
  methods: {
    getTime () {
      var date = new Date()
      var minutes = date.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      var hours = date.getHours() + ':' + minutes
      return hours
    }
  }
}
</script>
