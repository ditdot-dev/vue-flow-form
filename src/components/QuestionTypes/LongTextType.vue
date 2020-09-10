<template>
  <span>
    <textarea-autosize
      ref="input"
      rows="1"
      v-bind:value="value"
      v-bind:required="question.required"
      v-on:keydown.native="onKeyDown"
      v-on:keyup.native="onChange"
      v-on:keydown.enter.exact.native="onEnterDown"
      v-on:keyup.enter.exact.prevent.native="onEnter"
      v-on:keyup.tab.prevent.native="onEnter"
      v-on:focus.native="setFocus"
      v-on:blur.native="unsetFocus"
      v-bind:placeholder="placeholder"
    />
  </span>
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
      },

      unsetFocus($event) {
        if ($event || !this.isMobile) {
          this.focused = false
        }
      },

      onEnterDown($event) {
        if (!this.isMobile) {
          $event.preventDefault()
        }
      },

      onEnter() {
        if (!this.isMobile) {
          this._onEnter()
        }
      }
    },
    computed: {
      editingFinished() {
        return !this.isMobile
      }
    }
  }
</script>