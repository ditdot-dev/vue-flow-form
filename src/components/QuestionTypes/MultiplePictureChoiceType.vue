<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import MultipleChoiceType from './MultipleChoiceType.vue'
  import { QuestionType } from '../../models/QuestionModel'

  export default {
    extends: MultipleChoiceType,
    name: QuestionType.MultiplePictureChoice,

    data() {
      return {
        hasImages: true
      }
    }
  }
</script>