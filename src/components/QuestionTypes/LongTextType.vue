<template>
  <span>
    <textarea-autosize
      ref="input"
      rows="1"
      v-bind:value="value"
      v-bind:required="question.required"
      v-on:keydown.native="onKeyDown"
      v-on:keyup.native="onChange"
      v-on:keydown.enter.exact.prevent.native
      v-on:keyup.enter.exact.prevent.native="onEnter"
      v-on:keyup.tab.prevent.native="onEnter"
      v-bind:placeholder="placeholder"
    />
  </span>
</template>

<script>
  import QuestionModel, { QuestionType } from '../../models/QuestionModel'
  import BaseType from './BaseType'
  import LanguageModel from '../../models/LanguageModel'

  export default {
    extends: BaseType,
    name: 'LongTextType'
  }
</script>