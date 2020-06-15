import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import DateFilter from './filters/date'
import Alert from './components/Alert'

Vue.config.productionTip = false

Vue.prototype.$http = Axios
Vue.prototype.$http.defaults.baseURL = 'http://localhost:4000'
Vue.prototype.$http.defaults.headers.common.Accept = 'application/json'
Vue.prototype.$http.defaults.headers.common['Accept-language'] = 'nl'
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/json'

const user = JSON.parse(localStorage.getItem('user'))
if (user) {
  console.log(user)
  console.log('User fount and set as common header. Token is ' + user.token)
  Vue.prototype.$http.defaults.headers.common.Authorization = 'Bearer ' + user.token
  store.dispatch('setUser', user)
}

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
