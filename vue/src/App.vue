<template>
  <div class="globalcontainer">
    <nav class="globalheader">
      <Navigation />
    </nav>
    <main class="globalmain">
      <div v-if="alert.message" :class="`alert ${alert.type}`">
        {{ alert.message }}
      </div>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  name: "App",
  components: {
    Navigation
  },
  computed: {
    alert() {
      return this.$store.state.alert;
    }
  },
  /* eslint-disable no-unused-vars */
  watch: {
    $route(to, from) {
      this.$store.dispatch("alert/clear");
    }
  }
  /* eslint-enable no-unused-vars */
};
</script>

<style>
.globalcontainer {
  display: grid;
  grid-template-areas:
    "header"
    "main";
  grid-template-columns: auto;
  grid-template-rows: 100px auto;
  min-height: 100%;
}

.globalheader {
  background-color: orange;
  grid-area: header;
  text-align: center;
}

.globalmain {
  background-color: #ffffff;
  grid-area: main;
  text-align: center;
  color: #2c3e50;
  padding: 30px;
}
</style>
