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
            <v-toolbar-title>Maak een nieuwe categorie aan</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="onCreateCategory">
            <v-card-text>
              <v-text-field
                id="category"
                v-model="category"
                prepend-icon="mdi-mail"
                :rules="[rules.required]"
                type="text"
                name="category"
                label="Nieuwe sportcategorie"
                hint="Dit is hoe de categorie op de homepage weergegeven wordt"
                required
              />
              <v-text-field
                id="imgPath"
                v-model="imgPath"
                prepend-icon="mdi-mail"
                :rules="[rules.required]"
                type="text"
                name="imgPath"
                label="Image URL"
                hint="Voer de link naar de afbeelding toe"
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
                Categorie aanmaken
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
  name: 'CreateCategory',
  data () {
    return {
      category: '',
      imgPath: '',
      rules: {
        required: value => !!value || 'Verplicht.'
      }
    }
  },
  computed: {
    formIsValid () {
      return this.category !== '' && this.imgPath !== ''
    }
  },
  methods: {
    onCreateCategory () {
      if (!this.formIsValid) {
        return
      }
      const categoryData = {
        category: this.category,
        imgPath: this.imgPath
      }
      this.$http.post('/categories', categoryData)
        .then(this.$router.push('/categories'))
        .catch(error => console.log(error)) // TODO: Logout?
    }
  }
}
</script>
