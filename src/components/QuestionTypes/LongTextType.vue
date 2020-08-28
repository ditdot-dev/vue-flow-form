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
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
  */

  import BaseType from './BaseType.vue'
  import LanguageModel from '../../models/LanguageModel'
  import { QuestionType } from '../../models/QuestionModel'
  import TextareaAutosize from 'vue-textarea-autosize/src/components/TextareaAutosize'

  export default {
    extends: BaseType,
    name: QuestionType.LongText,
    components: {
      TextareaAutosize
    },
    mounted() {
      window.addEventListener('resize', this.onResizeListener)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResizeListener)
    },
    methods: {
      onResizeListener() {
        this.$refs.input.resize()
      }
    }
  }
</script>