<template>
  <div class="f-content" v-if="question.content">
    <span class="f-section-text">{{ question.content }}</span>
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
    name: QuestionType.SectionBreak,
    methods: {
      onEnter() {
        this.dirty = true

        this._onEnter()
      },

      isValid() {
        return true
      }
    }
  }
</script>