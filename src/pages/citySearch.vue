<template>

    <div class='grid-container  bg-transition'>
      <div class='box fullwidth'></div>
      <div class='box'></div>
      <div class='box'></div>
      <div class='box'></div>
      <div class='box'>
        <q-card color="brand" square style="height: 100%; width: 100%">
        <q-card-main>
          <q-field>
          <div class="flex-container">
          <div class="flex-item-narrow"></div>
          <h4 class="flex-item-wide"> Weather Service</h4>
          </div>
          </q-field>
         <q-field>
          <div class='flex-container'>
          <q-icon  class='flex-item-narrow' name="location_on" color="teal-7" style="font-size: 3em; margin-bottom:-0.3em;padding:0.3em" />
          <q-input  float-label="your city" class='flex-item-wide'
          icon="location_on"
            v-model='input.cityName'
            clearable
            type='search'
            color="secondary"
            v-on:keyup.enter="submit"
            />
          </div>
          </q-field>
        </q-card-main>
      </q-card>
          </div>
        <div class='box'></div>
        <div class='box'></div>
        <div class='box'></div>
        <div class='box'></div>
         <q-page-sticky position="top" :offset="[150, 150]">
        <transition
          enter-active-class="animated jello"
          leave-active-class="animated fadeOut"
          appear
        >
           <q-alert   color="teal-5"  icon="info" v-if="this.$store.state.error === 404"> City was not found </q-alert>
        </transition>
        </q-page-sticky>
    </div>

</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      input: {
        cityName: ''
      }
    }
  },
  validations: {
    input: {
      cityName: { required }
    }
  },
  methods: {
    submit () {
      this.$q.loading.show()
      this.$store.dispatch('actionForecastByCityName', this.input.cityName)
        // .dispatch('actions/forecastByCityName', cityName)
        .then(result => {
          this.$q.loading.hide()
          this.$router.push({
            path: '/weather'
          })
        })
        .catch(ex => {
          // handle exception forwarded via axios
          this.loading = false
          this.$store.dispatch('actionRemoveError')
          this.$q.loading.hide()
        })
    },
    clear () {
      this.form.cityName = ''
      this.$v.input.$reset()
    }
  }
}
</script>
