<template>
  <div @click="handleDrag">
    <vue-slider
      v-model="value"
      :interval="10"
      @change="handleChange"
      :min="0"
      :mask="mask"
      :max="max || 100"
      width="300"
      height="30px"
      :tooltip="'none'"
      @drag-end="handleDrag"
    >
      <template v-slot:dot> <span class="custom-inner-dot" /> </template
    ></vue-slider>
  </div>
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
    handleDrag() {
      this.$emit("handleDrag");
    },
    handleChange(e) {
      this.$emit("input", e);
    },
  },
};
</script>

<style>
</style>
