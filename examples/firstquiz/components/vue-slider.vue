<template>
  <vue-slider
    v-model="newValue"
    :interval="10"
    @change="handleChange"
    :min="0"
    :mask="mask"
    :max="max || 100"
    width="300"
    height="30px"
    :tooltip="'none'"
  >
    <template v-slot:dot> <span class="custom-inner-dot" /> </template
  ></vue-slider>
</template>

<script>
export default {
  name: "vue-custom-slider",
  props: {
    max: {
      type: Number,
      default: 100,
    },
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
