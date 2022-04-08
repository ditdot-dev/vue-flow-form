<template>
  <vue-slider v-model="value" v-bind="options" />
  <input v-model="value" type="number" v-bind:min="20" name="" id="" />
</template>

<script>
/*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

import BaseType from "./BaseType.vue";
import { QuestionType } from "../../models/QuestionModel";
import VueSlider from "vue-slider-component";
// import "vue-slider-component/theme/default.css";

export default {
  extends: BaseType,
  name: QuestionType.Slider,
  components: { VueSlider },

  data() {
    return {
      value: this.question.min,
      canReceiveFocus: true,
      options: {
        min: this.question.min,
        max: this.question.max,
      },
    };
  },

  methods: {},
};
</script>
<style scoped>
.vue-slider {
  box-sizing: content-box;
}
</style>
