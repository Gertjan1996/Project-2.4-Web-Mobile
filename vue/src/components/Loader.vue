<template>
  <div class="loader" />
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style scoped>
.loader { /* TODO: Fix spinner - not spinning in Chrome */
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #ff8d00;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
</style>
