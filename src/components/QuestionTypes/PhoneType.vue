<template>
  <the-mask
    ref="input"
    v-bind:mask="question.mask"
    v-bind:value="value"
    type="tel"
    v-bind:masked="false"
    v-bind:placeholder="placeholder"
    v-on:keydown.native="onKeyDown"
    v-on:keyup.native="onChange"
    v-on:keyup.native.enter.prevent="onEnter"
    v-on:keyup.native.tab.prevent="onEnter"
  />
</template>

<script>
  import QuestionModel, { QuestionType } from '../../models/QuestionModel'
  import BaseType from './BaseType'
  import LanguageModel from '../../models/LanguageModel'
  import { TheMask } from 'vue-the-mask'
  export default {
    extends: BaseType,
    components: {
      TheMask
    },
    name: 'PhoneType',
    props: {},
    data() {
      return {
        inputType: 'tel'
      }
    }
  }
</script>