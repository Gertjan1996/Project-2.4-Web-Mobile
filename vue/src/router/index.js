import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login")
  },
  {
    path: "/subcategorie",
    name: "Subcategorie",
    component: () => import("../views/Subcategorie")
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  if (authRequired && !store.state.auth.status.loggedIn) {
    return next("/login");
  }
  next();
});

export default router;
