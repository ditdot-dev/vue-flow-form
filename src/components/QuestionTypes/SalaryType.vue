<template>
  <!-- mask is fixed for salary component -->
  <div class="d-flex justify-content-between w-100">
    <template>
      <span :style="{ position: 'absolute', color: Dollarcolor }">$</span>
      <input
        ref="input"
        v-bind:type="inputType"
        :value="dollar"
        v-bind:required="question.required"
        v-on:keydown="onKeyDown"
        style="padding-left: 20px"
        :maxlength="9"
        v-on:keyup="onChange"
        v-on:keyup.enter.prevent="onEnter"
        v-on:keyup.tab.prevent="onEnter"
        :disabled="question.checkbox"
        v-on:focus="setFocus"
        @input="handleInput"
        v-on:blur="unsetFocus"
        v-bind:placeholder="placeholder"
      />
    </template>
    <b-form-checkbox
      style="font-size: 16px"
      class="d-flex justify-content-center align-items-center vff-checkbox"
      v-model="question.checkbox"
      @change="handleCheckbox"
    >
      <span>{{ question.checkboxText }}</span>
    </b-form-checkbox>
  </div>
</template>

<script>
export default {};
</script>

<script>
import DollarType from ".//DollarType";
import LanguageModel from "../../models/LanguageModel";
import { QuestionType } from "../../models/QuestionModel";
import TheMask from "vue-the-mask/src/component";
export default {
  extends: DollarType,
  name: QuestionType.Salary,
  components: {
    TheMask,
  },
  data() {
    return {};
  },
  methods: {
    handleCheckbox() {
      if (!this.question.checkbox) {
        this.dollar = "";
      }
    },
    isValid() {
      const { id, answer } = this.question;
      if (
        id === "age" ||
        id === "salary" ||
        id === "expenses" ||
        id === "income"
      ) {
        if (answer.toString()[0] == 0) {
          return false;
        }
      }
      if (!this.question.required) {
        return true;
      }
      if (this.question.checkbox) {
        return true;
      }
      if (
        this.question.mask &&
        this.dataValue.length !== this.question.mask.length
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>
