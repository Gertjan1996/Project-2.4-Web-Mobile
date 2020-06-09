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
          name="sport"
          label="Nieuwe sportcategorie *"
          id="sport"
          v-model="sport"
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
          name="imageUrl"
          label="Image URL *"
          id="image-url"
          v-model="imageUrl"
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
        >
          Categorie aanmaken
        </v-btn>
      </v-col>
    </v-row>
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
  }
}
</script>
