<template>
  <div>
    <vue-slider
      v-model="value"
      ref="slider"
      v-bind="options"
      @change="broadcastOnChange"
    >
    </vue-slider>
    <div>
      <input class="faux-form" type="number" v-model="value" max="100" />
      <div class="vff-animate f-fade-in f-enter" v-if="showClearButton">
        <a
          href="#"
          v-on:click.prevent="clear"
          v-bind:aria-label="language.ariaClear"
        >
          <span>{{ language.clear }}</span>
        </a>
      </div>
    </div>
  </div>
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
import "vue-slider-component/theme/default.css";

export default {
  extends: BaseType,
  name: QuestionType.Slider,
  components: { VueSlider },

  data() {
    return {
      value: null,
      canReceiveFocus: true,
      marks: [],
      options: {
        contained: true,
        useKeyboard: true,
        tooltip: false,
        min: this.question.min,
        max: this.question.max,
        marks: this.transformMarks(this.question.marks),
      },
    };
  },
  computed: {
    showClearButton() {
      return this.value !== null;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.slider.$el.querySelector(".vue-slider-dot").style.left = "50%";
    });
  },
  methods: {
    focus() {
      this.$refs.slider.focus(this.$refs.slider);
    },
    blur() {
      this.$refs.slider.blur(this.$refs.slider);
    },
    clear() {
      this.value = null;
    },
    broadcastOnChange(e) {
      this.onChange({ target: { value: e } });
    },
    transformMarks(marks) {
      return marks.reduce(
        (acc, mark) => ({ ...acc, [`${mark.value}`]: mark.label }),
        {}
      );
    },
    validate() {
      return Number.isInteger(this.value) && this.value >= 0;
    },
  },
  watch: {
    value(newValue) {
      if (newValue > this.options.max) {
        this.value = this.options.max;
      } else if (newValue < this.options.min) {
        this.value = this.options.min;
      }
    },
  },
};
</script>
<style scoped>
.vue-slider {
  box-sizing: content-box;
}
</style>
