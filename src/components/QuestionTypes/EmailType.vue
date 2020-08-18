<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
  */

  import QuestionModel from '../../models/QuestionModel'
  import TextType from './TextType'

  export default {
    extends: TextType,
    name: 'EmailType',
    data() {
      return {
        inputType: 'email'
      }
    },
    methods: {
      validate() {
        return this.hasValue && /^[^@]+@.+[^.]$/.test(this.dataValue)
      }
    }
  }
</script>