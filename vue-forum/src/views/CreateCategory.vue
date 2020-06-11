<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col
        align="center"
        cols="12"
      >
        <h2>Maak een nieuwe categorie aan</h2>
      </v-col>
    </v-row>
    <form @submit.prevent="onCreateCategory">
      <v-row
        justify="center"
      >
        <v-col
          align="center"
          cols="12"
          sm="10"
          md="8"
          lg="6"
        >
          <v-text-field
            id="sport"
            v-model="sport"
            name="sport"
            label="Nieuwe sportcategorie *"
            required
          />
        </v-col>
      </v-row>
      <v-row
        justify="center"
      >
        <v-col
          align="center"
          cols="12"
          sm="10"
          md="8"
          lg="6"
        >
          <v-text-field
            id="image-url"
            v-model="imageUrl"
            name="imageUrl"
            label="Image URL *"
            required
          />
        </v-col>
      </v-row>
      <v-row
        justify="center"
      >
        <v-col
          align="center"
          cols="6"
          md="4"
          lg="3"
        >
          <v-img
            :src="imageUrl"
            contain
            height="200"
          />
        </v-col>
      </v-row>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="6"
        >
          <v-btn
            class="primary"
            :disabled="!formIsValid"
            type="submit"
          >
            Categorie aanmaken
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </v-container>
</template>

<script>
export default {
  name: 'CreateCategory',
  data () {
    return {
      sport: '',
      imageUrl: ''
    }
  },
  computed: {
    formIsValid () {
      return this.sport !== '' && this.imageUrl !== ''
    }
  },
  methods: {
    onCreateCategory () {
      if (!this.formIsValid) {
        return
      }
      const categoryData = {
        sport: this.sport,
        imageUrl: this.imageUrl
      }
      this.$store.dispatch('createCategory', categoryData)
      this.$router.push('/categories')
    }
  }
}
</script>
