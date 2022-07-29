<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import OpinionScaleType from './OpinionScaleType.vue'
  import { QuestionType } from '../../models/QuestionModel'

  export default {
    extends: OpinionScaleType,
    name: QuestionType.IconRate,

    data() {
      return {
        isIconScale: true
      }
    },
  }
</script>