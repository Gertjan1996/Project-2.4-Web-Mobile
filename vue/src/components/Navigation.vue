<template>
  <ul>
    <li>
      <router-link to="/">
        Homepage
      </router-link>
      <br />
    </li>
    <li>
      <router-link to="/subcategorie">
        Subcategorie
      </router-link>
      <br />
    </li>
    <li>
      <router-link to="/login">
        Inloggen
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  padding-inline-start: 20px;
}

a,
li {
  color: #000000;
  text-decoration: none;
}

a:hover,
li:hover {
  cursor: pointer;
  color: #a9a9a9;
}
</style>
