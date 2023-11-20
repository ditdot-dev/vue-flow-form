<template>
  <div class="f-content" v-if="question.content">
    <span class="f-section-text" v-html="question.content"></span>
  </div>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import logic from '../../composables/QuestionTypes/SectionBreakType'

  export default logic
</script>