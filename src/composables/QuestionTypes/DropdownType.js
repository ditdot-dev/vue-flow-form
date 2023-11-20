/*
Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
https://github.com/ditdot-dev/vue-flow-form
https://www.ditdot.hr/en
*/

import BaseType from '../../components/QuestionTypes/BaseType.vue'
import { QuestionType } from '../../models/QuestionModel'

export default {
  extends: BaseType,

  name: QuestionType.Dropdown,

  computed: {
    answerLabel() {
      for (let i = 0; i < this.question.options.length; i++) {
        let option = this.question.options[i]

        if (option.choiceValue() === this.dataValue) {
          return option.choiceLabel()
        }
      }

      return this.question.placeholder
    }
  },

  methods: {
    onKeyDownListener($event) {
      if ($event.key === 'ArrowDown' || $event.key === 'ArrowUp') {
        this.setAnswer(this.dataValue)
      } else if ($event.key === 'Enter' && this.hasValue) {
        this.focused = false
        this.blur()
      }
    },
    
    onKeyUpListener($event) {
      if ($event.key === 'Enter' && this.isValid() && !this.disabled) {
        $event.stopPropagation()
        this._onEnter()
        this.$emit('next')
      }
    }
  }
}