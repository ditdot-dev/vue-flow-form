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
    v-on:focus.native="setFocus"
    v-on:blur.native="unsetFocus"
    v-on:keyup.native.enter.prevent="onEnter"
    v-on:keyup.native.tab.prevent="onEnter"
  />
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import BaseType from './BaseType.vue'
  import LanguageModel from '../../models/LanguageModel'
  import { QuestionType } from '../../models/QuestionModel'
  import TheMask from 'vue-the-mask/src/component'
  
  export default {
    extends: BaseType,
    components: {
      TheMask
    },
    name: QuestionType.Phone,
    data() {
      return {
        inputType: 'tel'
      }
    }
  }
</script>