<template>
  <input
    ref="input"
    type="file"
    v-bind:accept="question.accept"
    v-bind:multiple="question.multiple"
    v-bind:value="modelValue"
    v-bind:required="question.required"
    v-on:keyup.enter.prevent="onEnter"
    v-on:keyup.tab.prevent="onEnter"
    v-on:focus="setFocus"
    v-on:blur="unsetFocus"
    v-on:change="onChange"
  />
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import logic from '../../composables/QuestionTypes/FileType'

  export default logic
</script>