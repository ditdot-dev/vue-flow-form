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
    v-bind:placeholder="placeholder"
  />
</template>

<script>
  import QuestionModel, { QuestionType } from '../../models/QuestionModel'
  import BaseType from './BaseType'
  import LanguageModel from '../../models/LanguageModel'

  export default {
    extends: BaseType,
    name: 'TextType',
    data() {
      return {
        inputType: 'text'
      }
    }
  }
</script>