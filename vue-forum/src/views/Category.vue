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
        md="8"
        lg="6"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Reageer op dit topic</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="onCreatePost">
            <v-card-text>
              <v-text-field
                id="text"
                v-model="text"
                prepend-icon="mdi-mail"
                :rules="[rules.required]"
                type="text"
                name="text"
                label="Nieuwe post"
                hint="Schrijf hier een bericht om te reageren op dit topic"
                required
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit"
              >
                Reactie versturen
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
  name: 'Category',
  props: {
    categoryId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      posts: null,
      text: '',
      rules: {
        required: value => !!value || 'Verplicht.'
      }
    }
  },
  computed: {
    formIsValid () {
      return this.text !== ''
    }
  },
  created () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      return this.$http.get(`/categories/${this.categoryId}/posts`)
        .then(res => {
          console.log(res)
          this.categories = res.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    onCreatePost () {
      if (!this.formIsValid) {
        return
      }
      this.$http.post(`/categories/${this.categoryId}/posts`, { text: this.text })
        .then(this.$router.push(`/categories/${this.categoryId}`))
        .catch(error => console.log(error)) // TODO: Logout?
    }
  }
}
</script>
