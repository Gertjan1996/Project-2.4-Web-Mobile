<template>
  <v-container
    class="fill-height"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        align="center"
        cols="12"
        sm="8"
        md="6"
        lg="5"
      >
        <h1>User</h1>
        <p>Deze pagina is alleen bereikbaar voor users en admins</p>
        <div>
          Huidige user vanuit API call:
          <ul v-if="user">
            <li>
              {{ 'Gebruikersnaam: ' + user.username + ' - E-mail: ' + user.email + ' - Rol: ' + user.role }}
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      user: null
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      return this.$http.get(`/users/${this.$store.getters.user.id}`)
        .then(res => {
          console.log(res)
          this.user = res.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
