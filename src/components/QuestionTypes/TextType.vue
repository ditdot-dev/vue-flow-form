<template>
  <span v-bind:data-placeholder="inputType === 'date' ? placeholder : null">
    <the-mask
      v-if="question.mask"
      ref="input"
      v-bind:mask="question.mask"
      v-bind:masked="false"
      v-bind:tokens="tokens.Build()"
      v-bind:type="inputType"
      v-bind:value="modelValue"
      v-bind:required="question.required"
      v-on:keydown="onKeyDown"
      v-on:keyup="onChange"
      v-on:focus="setFocus"
      v-on:blur="unsetFocus"
      v-on:keyup.enter.prevent="onEnter"
      v-on:keyup.tab.prevent="onEnter"
      v-bind:placeholder="placeholder"
      v-bind:min="question.min"
      v-bind:max="question.max"
      v-on:change="onChange"
    />
    <input
      v-else
      ref="input"
      v-bind:type="inputType"
      v-bind:value="modelValue"
      v-bind:required="question.required"
      v-on:keydown="onKeyDown"
      v-on:keyup="onChange"
      v-on:keyup.enter.prevent="onEnter"
      v-on:keyup.tab.prevent="onEnter"
      v-on:focus="setFocus"
      v-on:blur="unsetFocus"
      v-bind:min="question.min"
      v-bind:max="question.max"
      v-on:change="onChange"
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

  import logic from '../../composables/QuestionTypes/TextType'

  export default logic
</script>
