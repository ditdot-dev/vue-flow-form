<template>
  <vue-slider
    v-model="newValue"
    :interval="1"
    @change="handleChange"
    :min="0"
    :mask="mask"
    :max="100"
    width="300"
    height="30px"
  ></vue-slider>
</template>

<script>
export default {
  name: "vue-custom-slider",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    mask: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newValue: this.value,
    };
  },
  methods: {
    handleChange(e) {
      this.$emit("input", e);
    },
  },
};
</script>

<style>
</style>