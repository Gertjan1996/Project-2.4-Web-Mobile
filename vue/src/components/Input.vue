<template>
  <div>
    <input
      :id="id"
      class="input"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :required="required"
      @input="inputHandler($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    inputHandler(value) {
      console.log(value);
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped>
.input {
  background-color: #ffffff;
  border: 1px solid #ff8d00;
  box-sizing: border-box;
  height: 27px;
  padding-left: 5px;
  width: 290px;
}
</style>
