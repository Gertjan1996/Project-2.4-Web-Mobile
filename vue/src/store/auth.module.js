import router from "../router";
import axios from "axios";

let token = localStorage.getItem("token");
const initialState = token
  ? { status: { loggedIn: true }, token: token }
  : { status: {}, token: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit("loginRequest");
      const body = {
        // grant_type: "password",
        username: username,
        password: password,
        // client_id: "aaabbbcccdddeeefff" // TODO: Add right client_id
      };
      delete axios.defaults.headers.common.Authorization;
      axios
        .post("/users/authenticate", body)
        .then(response => {
          console.log(response)
          token = response.data.token;
          console.log("Response OK, token: " + token);
          localStorage.setItem("token", token);
          axios.defaults.headers.common.Authorization = "Bearer " + token;
          commit("loginSuccess", token);
          router.push("/");
        })
        .catch(error => {
          console.log(error)
          commit("loginFailure");
          localStorage.removeItem("token");
          if (error.response.status === 400) {
            error =
              "Verkeerde gebruikersnaam/ wachtwoord combinatie, probeer opnieuw";
          } else if (error.response.status === 500) {
            error = "Server momenteel niet bereikbaar, neem contact op met ..."; // TODO: Add name
          } else {
            console.log(
              "Errorcode not found, add errorhandling for this error! Error: " +
                error
            );
          }
          dispatch("alert/error", error, { root: true });
        });
    },
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    }
  },
  mutations: {
    loginRequest(state) {
      state.status = { loggingIn: true };
    },
    loginSuccess(state, token) {
      state.status = { loggedIn: true };
      state.token = token;
    },
    loginFailure(state) {
      state.status = {};
      state.token = null;
    },
    logout(state) {
      state.status = {};
      state.token = null;
    }
  }
};
