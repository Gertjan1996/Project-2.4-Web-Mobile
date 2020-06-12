import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedCategories: [
      {
        sport: 'Fitness',
        imageUrl: '../assets/logo.svg',
        id: '1'
      },
      {
        sport: 'Hardlopen',
        imageUrl: '../assets/logo.svg',
        id: '2'
      },
      {
        sport: 'Voetbal',
        imageUrl: '../assets/logo.svg',
        id: '3'
      },
      {
        sport: 'Zwemmen',
        imageUrl: '../assets/logo.svg',
        id: '4'
      },
      {
        sport: 'Tennis',
        imageUrl: '../assets/logo.svg',
        id: '5'
      },
      {
        sport: 'Fietsen',
        imageUrl: '../assets/logo.svg',
        id: '6'
      },
      {
        sport: 'Yoga',
        imageUrl: '../assets/logo.svg',
        id: '7'
      },
      {
        sport: 'Hockey',
        imageUrl: '../assets/logo.svg',
        id: '8'
      },
      {
        sport: 'Paardrijden',
        imageUrl: '../assets/logo.svg',
        id: '9'
      },
      {
        sport: 'Golf',
        imageUrl: '../assets/logo.svg',
        id: '10'
      },
      {
        sport: 'Wielrennen',
        imageUrl: '../assets/logo.svg',
        id: '11'
      },
      {
        sport: 'Overig',
        imageUrl: '../assets/logo.svg',
        id: '12'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createCategory (state, payload) {
      state.loadedCategories.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    createCategory ({ commit }, payload) {
      const category = {
        sport: payload.sport,
        imageUrl: payload.imageUrl,
        id: 'tempID'
      }
      // TODO: Add to database/ firebase including image upload
      commit('createCategory', category)
    },
    registerUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      axios.post('/accounts:signUp?key=AIzaSyATj4BPnYWTW4kNrEoU8Ged-9Oe1t9tSog', {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('setLoading', false)
          const newUser = {
            id: res.data.localId,
            email: payload.email,
            username: payload.username,
            token: res.data.idToken
          }
          localStorage.setItem('user', newUser)
          axios.defaults.headers.common.Authorization = 'Bearer ' + res.data.idToken
          commit('setUser', newUser)
        })
        .catch(error => {
          console.log(error)
          localStorage.removeItem('user')
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    loginUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          data => {
            commit('setLoading', false)
            const loginUser = {
              id: data.user.uid,
              username: 'test'
            }
            commit('setUser', loginUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loadedCategories (state) {
      return state.loadedCategories.sort((categorieA, categorieB) => {
        return categorieA.sport > categorieB.sport ? 1 : -1
      })
    },
    loadedCategory (state) {
      return (id) => {
        return state.loadedCategories.find((categorie) => {
          return categorie.id === id
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  },
  modules: {
  }
})
