/*
Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
https://github.com/ditdot-dev/vue-flow-form
https://www.ditdot.hr/en
*/

import BaseType from '../../components/QuestionTypes/BaseType.vue'
import { QuestionType } from '../../models/QuestionModel'

export default {
  extends: BaseType,
  
  name: QuestionType.Matrix,

  data() {
    return {
      selected: {},
      inputList: []
    }
  },

  beforeMount() {
    // Pre-fill the form if there is a predefined answer
    if (this.question.multiple) {
      for (let row of this.question.rows) {
        this.selected[row.id] = this.question.answer && this.question.answer[row.id] ? [...this.question.answer[row.id]] : []
      }
    } else if (this.question.answer) {
      this.selected = {...this.question.answer}
    }
  },

  beforeUpdate() {
    this.inputList = []
  },

  methods: {
    onChange($event) {
      this.dirty = true
      this.dataValue = this.selected
      this.onKeyDown()
      this.setAnswer(this.dataValue)
    }, 

    validate() {
      if (!this.question.required) {
        return true
      }

      const checked = inputs => inputs.some(input => input.checked)

      if (!Object.values(this.inputGroups).every(value => checked(value))) {
        return false
      }

      return true
    },

    getElement() {
      return this.inputList[0]
    }, 
  },

  computed: {
    inputGroups() {
      const inputGroups = {}

      // Setting input list for validation
      for (let row of this.question.rows) {
        inputGroups[row.id] = []
      }
      
      this.inputList.forEach(input => {
        inputGroups[input.dataset.id].push(input) 
      })

      return inputGroups
    }
  }
}