import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import * as firebase from 'firebase'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import DateFilter from './filters/date'
import Alert from './components/Alert'

Vue.config.productionTip = false

Vue.prototype.$http = Axios
Vue.prototype.$http.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1'
Vue.prototype.$http.defaults.headers.common.Accept = 'application/json'
Vue.prototype.$http.defaults.headers.common['Accept-language'] = 'nl'
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/json'

const user = JSON.parse(localStorage.getItem('user'))
if (user) {
  console.log(user)
  console.log('User fount and set as common header. Token is ' + user.token)
  Vue.prototype.$http.defaults.headers.common.Authorization = 'Bearer ' + user.token
}

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
