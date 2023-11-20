/*
Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
https://github.com/ditdot-dev/vue-flow-form
https://www.ditdot.hr/en
*/

import BaseType from '../../components/QuestionTypes/BaseType.vue'
import { QuestionType } from '../../models/QuestionModel'
import TextareaAutosize from 'vue-textarea-autosize/src/components/TextareaAutosize'

export default {
  extends: BaseType,

  name: QuestionType.LongText,

  components: {
    TextareaAutosize
  },

  data () {
    return {
      canReceiveFocus: true
    }
  },

  mounted() {
    window.addEventListener('resize', this.onResizeListener)
  },

  beforeUnmount() {
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
      this._onEnter()
      
      if (this.isMobile) {
        this.focus()
      }
    }
  }
}