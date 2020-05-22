<template>
  <div>
    <form @submit.prevent="loginHandler">
      <h2>Inloggen</h2>
      <label class="container">
        <Input
          id="username"
          v-model="username"
          type="text"
          placeholder="Gebruikersnaam"
          :required="true"
        />
      </label>
      <label class="container">
        <Input
          id="password"
          v-model="password"
          type="password"
          placeholder="Wachtwoord"
          :required="true"
        />
      </label>
      <button type="submit">
        Inloggen
      </button>
      <Loader v-show="loggingIn" />
    </form>
  </div>
</template>

<script>
import Input from "../components/Input";
import Loader from "../components/Loader";

export default {
  name: "Login",
  components: {
    Input,
    Loader
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    loggingIn() {
      return this.$store.state.auth.status.loggingIn;
    }
  },
  methods: {
    loginHandler() {
      const { username, password } = this;
      this.$store.dispatch("auth/login", { username, password });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 10px 0px 10px 0px;
}
</style>
