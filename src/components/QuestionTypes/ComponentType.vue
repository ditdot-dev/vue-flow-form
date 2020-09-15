<template>
  <div>
    <component v-if="question.component" v-bind:is="question.component" ref="component" />
  </div>
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
    name: QuestionType.Slot,
    methods: {
      onEnter() {
        this.dirty = true

        this._onEnter()
      },

      isValid() {
        return this.question.validateComponent ? this.$refs.component.isValid() : true
      }
    }
  }
</script>