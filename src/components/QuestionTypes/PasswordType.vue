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
    name: QuestionType.Password,
    data() {
      return {
        inputType: 'password'
      }
    }
  }
</script>