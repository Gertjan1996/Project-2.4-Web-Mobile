import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import DateFilter from './filters/date'
import Alert from './components/Alert'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)

new Vue({
  router,
  store,
  vuetify,
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyB-JwAc997JC9q-qxncQVsVNf-NXGemKYc',
      authDomain: 'web-mobile-279621.firebaseapp.com',
      databaseURL: 'https://web-mobile-279621.firebaseio.com',
      projectId: 'web-mobile-279621',
      storageBucket: 'web-mobile-279621.appspot.com',
      messagingSenderId: '1035975640170',
      appId: '1:1035975640170:web:048a048581e11d1c483613',
      measurementId: 'G-YLGVTM2MTK'
    })
  },
  render: h => h(App)
}).$mount('#app')
