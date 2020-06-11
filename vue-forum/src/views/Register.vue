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
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Registreren</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="onRegister">
            <v-card-text>
              <v-text-field
                id="email"
                v-model="email"
                label="E-mail"
                name="email"
                prepend-icon="mdi-mail"
                type="email"
                required
              />
              <v-text-field
                id="username"
                v-model="username"
                label="Gebruikersnaam"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                required
              />
              <v-text-field
                id="password"
                v-model="password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.minimum]"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                label="Wachtwoord"
                hint="Let op: minimaal 8 karakters"
                counter
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                id="confirmPassword"
                v-model="confirmPassword"
                prepend-icon="mdi-lock"
                :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.match]"
                :type="showConfirm ? 'text' : 'password'"
                name="confirmPassword"
                label="Wachtwoord bevestigen"
                hint="De ingevulde wachtwoorden moeten overeen komen"
                @click:append="showConfirm = !showConfirm"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
                color="primary"
              >
                Registreren
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      username: '',
      password: '',
      showPassword: false,
      confirmPassword: '',
      showConfirm: false,
      rules: {
        required: value => !!value || 'Verplicht.',
        minimum: value => value.length >= 8 || 'Minimaal 8 karakters',
        match: value => value === this.password || 'Wachtwoorden komen niet overeen'
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onRegister () {
      this.$store.dispatch('registerUser', { email: this.email, password: this.password })
    }
  }
}
</script>
