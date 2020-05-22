import Vue from "vue";
import Axios from "axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = "https://localhost/api"; // TODO: Add right link to API
Vue.prototype.$http.defaults.headers.common.Accept = "application/json";
Vue.prototype.$http.defaults.headers.common["Accept-language"] = "nl";
Vue.prototype.$http.defaults.headers.post["Content-Type"] = "application/json";

const token = localStorage.getItem("token");
if (token) {
  console.log("Token found and set as common header. Token is " + token);
  Vue.prototype.$http.defaults.headers.common.Authorization = "Bearer " + token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
