export const alert = {
  namespaced: true,
  state: {
    message: null
  },
  actions: {
    success({ commit }, message) {
      commit("success", message);
    },
    error({ commit }, message) {
      commit("error", message);
    },
    clear({ commit }) {
      commit("clear");
    }
  },
  mutations: {
    success(state, message) {
      state.type = "success"; // TODO: add bootstrap to use this as css style
      state.message = message;
    },
    error(state, message) {
      state.type = "danger"; // TODO: add bootstrap to use this as css style
      state.message = message;
    },
    clear(state) {
      state.type = null;
      state.message = null;
    }
  }
};
