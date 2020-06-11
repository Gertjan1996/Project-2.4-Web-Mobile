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
            <v-toolbar-title>Inloggen</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="onLogin">
            <v-card-text>
              <v-text-field
                id="email"
                v-model="email"
                prepend-icon="mdi-mail"
                :rules="[rules.required]"
                type="email"
                name="email"
                label="E-mail"
                hint="Voer uw e-mailadres in"
              />
              <v-text-field
                id="username"
                v-model="username"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
                type="text"
                name="username"
                label="Gebruikersnaam"
                hint="Voer uw gebuikersnaam in"
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
                hint="Voer uw wachtwoord in"
                counter
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
                color="primary"
              >
                Inloggen
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
  name: 'Login',
  data () {
    return {
      email: '',
      username: '',
      password: '',
      showPassword: false,
      rules: {
        required: value => !!value || 'Verplicht.',
        minimum: value => value.length >= 8 || 'Minimaal 8 karakters'
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
    onLogin () {
      this.$store.dispatch('loginUser', { email: this.email, password: this.password })
    }
  }
}
</script>
