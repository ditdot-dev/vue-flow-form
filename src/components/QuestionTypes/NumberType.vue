<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import TextType from './TextType.vue'
  import { QuestionType } from '../../models/QuestionModel'

  export default {
    extends: TextType,
    name: QuestionType.Number,

    data() {
      return {
        inputType: 'tel',
        allowedChars: '-0123456789.'
      }
    },

    methods: {
      validate() {
         if (!isNaN(this.question.min) && this.dataValue < this.question.min) {
          return false
        }

        if (!isNaN(this.question.max) && this.dataValue > this.question.max) {
          return false
        }

        if (this.hasValue) {
          if (this.question.mask) {
            return this.validateMask()
          }

          return !isNaN(+this.dataValue)
        }

        return !this.question.required || this.hasValue
      }
    }
  }
</script>