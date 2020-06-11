<template>
  <v-alert
    type="error"
    dismissible
    :value="true"
    @input="onClose"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
