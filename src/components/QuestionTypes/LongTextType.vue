<template>
  <span>
    <textarea-autosize
      ref="input"
      rows="1"
      v-bind:value="modelValue"
      v-bind:required="question.required"
      v-on:keydown="onKeyDown"
      v-on:keyup="onChange"
      v-on:keydown.enter.exact="onEnterDown"
      v-on:keyup.enter.exact.prevent="onEnter"
      v-on:keyup.tab.prevent="onEnter"
      v-on:focus="setFocus"
      v-on:blur="unsetFocus"
      v-bind:placeholder="placeholder"
      v-bind:maxlength="question.maxLength"
    />
  </span>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import logic from '../../composables/QuestionTypes/LongTextType'

  export default logic
</script>
