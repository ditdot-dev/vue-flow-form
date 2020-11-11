<template>
  <div v-if="question.mask" class="d-flex justify-content-between w-100">
    <span :style="{ position: 'absolute', color: Dollarcolor }">$</span>
    <the-mask
      v-if="question.mask"
      ref="input"
      style="padding-left: 20px"
      v-bind:mask="question.mask"
      v-bind:masked="false"
      v-bind:type="inputType"
      v-bind:value="value"
      v-bind:required="question.required"
      v-on:keydown.native="onKeyDown"
      v-on:keyup.native="onChange"
      v-on:focus.native="setFocus"
      v-on:blur.native="unsetFocus"
      v-on:keyup.native.enter.prevent="onEnter"
      v-on:keyup.native.tab.prevent="onEnter"
      v-bind:placeholder="placeholder"
    />
  </div>
  <div class="d-flex justify-content-between w-100" v-else>
    <span :style="{ position: 'absolute', color: Dollarcolor }">$</span>
    <input
      ref="input"
      v-bind:type="inputType"
      :value="dollar"
      v-bind:required="question.required"
      v-on:keydown="onKeyDown"
      style="padding-left: 20px"
      v-on:keyup="onChange"
      v-on:keyup.enter.prevent="onEnter"
      v-on:keyup.tab.prevent="onEnter"
      v-on:focus="setFocus"
      @input="handleInput"
      v-on:blur="unsetFocus"
      v-bind:placeholder="placeholder"
    />
  </div>
</template>
<script>
import TextType from "./TextType";
import LanguageModel from "../../models/LanguageModel";
import { QuestionType } from "../../models/QuestionModel";
import TheMask from "vue-the-mask/src/component";
export default {
  extends: TextType,
  name: QuestionType.Dollar,
  components: {
    TheMask,
  },
  data() {
    return {
      dollar: "",
      Dollarcolor: "grey",
    };
  },
  methods: {
    setFocus() {
      this.Dollarcolor = "black";
    },
    unsetFocus() {
      this.Dollarcolor = "grey";
    },
    handleInput(e) {
      const newVal = e.target.value;
      this.dollar = newVal.replace(/^[0-9]{1,2}([,.][0-9]{1,2})?$/, "");
      this.dollar = newVal
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  watch: {
    value(newVal, oldVal) {},
  },
};
</script>
