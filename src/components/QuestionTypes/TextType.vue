<template>
  <input
    ref="input"
    v-bind:type="inputType"
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
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import BaseType from './BaseType.vue'
  import { QuestionType } from '../../models/QuestionModel'
  import LanguageModel from '../../models/LanguageModel'

  export default {
    extends: BaseType,
    name: QuestionType.Text,
    data() {
      return {
        inputType: 'text', 
        canReceiveFocus: true
      }
    }
  }
</script>