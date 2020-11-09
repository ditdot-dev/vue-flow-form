<template>
  <span class="d-flex justify-content-between w-100">
    <span style="position: absolute; color: grey">$</span>
    <input
      ref="input"
      v-bind:type="inputType"
      style="padding-left: 30px"
      v-bind:value="value"
      v-bind:required="question.required"
      v-on:keydown="onKeyDown"
      v-on:keyup="onChange"
      v-on:keyup.enter.prevent="onEnter"
      v-on:keyup.tab.prevent="onEnter"
      v-on:focus="setFocus"
      v-on:blur="unsetFocus"
      v-bind:placeholder="placeholder"
    />
    <b-form-checkbox
      style="font-size: 16px; width: 600px"
      class="d-flex justify-content-center align-items-center vff-checkbox"
      id="checkbox-1"
      value="true"
      v-model="question.checkbox"
      name="checkbox-1"
    >
      <span class="">{{ question.checkboxText }}</span>
    </b-form-checkbox>
  </span>
</template>

<script>
export default {};
</script>

<script>
import NumberType from "./NumberType.vue";
import LanguageModel from "../../models/LanguageModel";
import { QuestionType } from "../../models/QuestionModel";
import TheMask from "vue-the-mask/src/component";

export default {
  extends: NumberType,
  name: QuestionType.Salary,
  components: {
    TheMask,
  },
  data() {
    return {};
  },
  methods: {
    isValid() {
      return (
        this.question.checkbox ||
        (Number(this.value) > 9 && Number(this.value) < 100)
      );
    },
  },
};
</script>