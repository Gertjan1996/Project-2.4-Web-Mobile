import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    clearUser (state) {
      state.user = null
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
    registerUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      axios.post('/users/register', {
        username: payload.username,
        password: payload.password,
        email: payload.email
      })
        .then(res => {
          console.log('Registratie succesvol: ')
          console.log(res)
        })
        .catch(error => {
          console.log('Error: ')
          console.log(error)
        })
    },
    loginUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      axios.post('/users/authenticate', {
        username: payload.username,
        password: payload.password
      })
        .then(res => {
          console.log(res)
          commit('setLoading', false)
          localStorage.setItem('user', JSON.stringify(res.data))
          axios.defaults.headers.common.Authorization = 'Bearer ' + res.data.token
          commit('setUser', res.data)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
          commit('logoutUser')
          commit('setError', error)
        })
    },
    setUser ({ commit }, payload) {
      commit('setUser', payload)
    },
    logoutUser ({ commit }) {
      commit('clearUser')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common.Authorization
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
