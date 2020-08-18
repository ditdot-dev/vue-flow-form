<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
  */

  import QuestionModel, { QuestionType } from '../../models/QuestionModel'
  import TextType from './TextType'
  import LanguageModel from '../../models/LanguageModel'
  import { TheMask } from 'vue-the-mask'

  export default {
    extends: TextType,
    components: {
      TheMask
    },
    name: 'NumberType',
    data() {
      return {
        inputType: 'tel',
        allowedChars: '0123456789.'
      }
    }
  }
</script>