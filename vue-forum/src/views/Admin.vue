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
        <h1>Admin</h1>
        <p>Deze pagina is alleen bereikbaar voor admins</p>
        <div>
          Lijst van geregistreerde users vanuit API call:
          <ul v-if="users.length">
            <li
              v-for="user in users"
              :key="user.id"
            >
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
  name: 'Admin',
  data () {
    return {
      users: []
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      return this.$http.get('/users')
        .then(res => {
          console.log(res)
          this.users = res.data
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
