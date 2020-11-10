<template>
  <div class="d-flex justify-content-between w-100">
    <template v-if="question.mask">
      <span :style="{ position: 'absolute', color: Dollarcolor }">$</span>
      <the-mask
        ref="input"
        v-bind:mask="question.mask"
        v-bind:masked="false"
        :disabled="question.checkbox"
        style="padding-left: 20px"
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
    </template>
    <template v-else>
      <span :style="{ position: 'absolute', color: Dollarcolor }">$</span>
      <input
        ref="input"
        v-bind:type="inputType"
        v-bind:value="dollar"
        :disabled="question.checkbox"
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
    </template>
    <b-form-checkbox
      style="font-size: 16px"
      class="d-flex justify-content-center align-items-center vff-checkbox"
      v-model="question.checkbox"
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
    isValid() {
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