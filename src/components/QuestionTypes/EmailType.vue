<script>
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