import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categories',
    name: 'Categorieen',
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/categorie/new',
    name: 'CreateCategory',
    component: () => import('../views/CreateCategory.vue')
  },
  {
    path: '/categories/:id',
    name: 'Category',
    props: true,
    component: () => import('../views/Category.vue')
  },
  {
    path: '/login',
    name: 'Inloggen',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/post/new',
    name: 'CreatePost',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/profiel',
    name: 'Profiel',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/registreren',
    name: 'Registreren',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
