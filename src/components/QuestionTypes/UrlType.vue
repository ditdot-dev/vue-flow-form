<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
  */

  import QuestionModel from '../../models/QuestionModel'
  import TextType from './TextType'

  export default {
    extends: TextType,
    name: 'UrlType',
    data() {
      return {
        inputType: 'url'
      }
    },
    methods: {
      fixAnswer(answer) {
        if (answer && answer.indexOf('://') === -1) {
          // Insert https protocol to make it easier to enter
          // correct URLs
          answer = 'https://' + answer
        }

        return answer
      },

      validate() {
        if (this.hasValue) {
          try {
            var url = new URL(this.fixAnswer(this.dataValue))

            return true
          } catch(_) { /* Invalid URL */ }
        }

        return false
      }
    }
  }
</script>