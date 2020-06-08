import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedCategories: [
      {
        sport: 'Fitness',
        link: '/categories',
        id: '1'
      },
      {
        sport: 'Hardlopen',
        link: '/categories',
        id: '2'
      },
      {
        sport: 'Voetbal',
        link: '/categories',
        id: '3'
      },
      {
        sport: 'Zwemmen',
        link: '/categories',
        id: '4'
      },
      {
        sport: 'Tennis',
        link: '/categories',
        id: '5'
      },
      {
        sport: 'Fietsen',
        link: '/categories',
        id: '6'
      },
      {
        sport: 'Yoga',
        link: '/categories',
        id: '7'
      },
      {
        sport: 'Hockey',
        link: '/categories',
        id: '8'
      },
      {
        sport: 'Paardrijden',
        link: '/categories',
        id: '9'
      },
      {
        sport: 'Golf',
        link: '/categories',
        id: '10'
      },
      {
        sport: 'Wielrennen',
        link: '/categories',
        id: '11'
      },
      {
        sport: 'Overig',
        link: '/categories',
        id: '12'
      }
    ],
    user: {
      id: '1',
      username: 'test'
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    loadedCategories (state) {
      return state.loadedCategories.sort((categorieA, categorieB) => {
        return categorieA.id > categorieB.id // TODO: fix sorting on alphabet
      })
    },
    loadedCategorie (state) {
      return (id) => {
        return state.loadedCategories.find((categorie) => {
          return categorie.id === id
        })
      }
    }
  },
  modules: {
  }
})
