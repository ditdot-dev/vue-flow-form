<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import TextType from './TextType.vue'
  import { QuestionType } from '../../models/QuestionModel'
  import LanguageModel from '../../models/LanguageModel'

  export default {
    extends: TextType,
    name: QuestionType.Date,
    data() {
      return {
        inputType: 'date'
      }
    }, 
    methods: {
      validate() {
        if (this.question.min && this.dataValue < this.question.min) {
          return false
        }

        if (this.question.max && this.dataValue > this.question.max) {
          return false
        }

        return !this.question.required || this.hasValue
      }
    }
  }
</script>