<script>
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
        if (answer && answer.indexOf('http') === -1) {
          answer = 'https://' + answer
        }

        return answer
      }
    }
  }
</script>