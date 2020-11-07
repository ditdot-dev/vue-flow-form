<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import TextType from './TextType.vue'
  import LanguageModel from '../../models/LanguageModel'
  import { QuestionType } from '../../models/QuestionModel'
  import TheMask from 'vue-the-mask/src/component'

  export default {
    extends: TextType,
    name: QuestionType.Number,
    components: {
      TheMask
    },
    data() {
      return {
        inputType: 'tel',
        allowedChars: '0123456789.',
        canReceiveFocus: true
      }
    }
  }
</script>
