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
        <app-alert
          v-if="error"
          :text="error.message"
          @dismissed="onDismissed"
        />
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
                prepend-icon="mdi-mail"
                :rules="[rules.required]"
                type="email"
                name="email"
                label="E-mail"
                hint="Voer een geldig e-mailadres in"
                required
              />
              <v-text-field
                id="username"
                v-model="username"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
                type="text"
                name="username"
                label="Gebruikersnaam"
                hint="Let op: na registratie niet te wijzigen"
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
                required
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
                required
                @click:append="showConfirm = !showConfirm"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
                :disabled="loading"
                :loading="loading"
                color="primary"
              >
                Registreren
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
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
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        if (value.role === 'Admin') {
          this.$router.push('/admin')
        } else if (value.role === 'User') {
          this.$router.push('/user')
        } else {
          this.$router.push('/')
        }
      }
    }
  },
  methods: {
    onRegister () {
      this.$store.dispatch('registerUser', { email: this.email, username: this.username, password: this.password })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
