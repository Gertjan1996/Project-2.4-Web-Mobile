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
            <v-toolbar-title>Inloggen</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="onLogin">
            <v-card-text>
              <v-text-field
                id="username"
                v-model="username"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
                type="text"
                name="username"
                label="Gebruikersnaam"
                hint="Voer uw gebuikersnaam in"
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
                hint="Voer uw wachtwoord in"
                counter
                required
                @click:append="showPassword = !showPassword"
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
                Inloggen
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
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      showPassword: false,
      rules: {
        required: value => !!value || 'Verplicht.',
        minimum: value => value.length >= 6 || 'Minimaal 6 karakters'
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
          this.$router.push('/gebruiker')
        } else {
          this.$router.push('/')
        }
      }
    }
  },
  methods: {
    onLogin () {
      this.$store.dispatch('loginUser', { username: this.username, password: this.password })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
