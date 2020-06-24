<template>
    <span v-if="question.content" v-html="question.content" class="f-content"></span>
</template>

<script>
  import QuestionModel, { QuestionType } from '../../models/QuestionModel'
  import BaseType from './BaseType'
  import LanguageModel from '../../models/LanguageModel'

  export default {
    extends: BaseType,
    name: 'SectionBreakType'
  }
</script>