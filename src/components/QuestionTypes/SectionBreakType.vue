<script>
  import QuestionModel, { QuestionType } from '../../models/QuestionModel'
  import BaseType from './BaseType'
  import LanguageModel from '../../models/LanguageModel'

  export default {
    extends: BaseType,
    name: 'SectionBreakType',
    render(h) {
      if (typeof this.question.content === 'function') {
        const c = this.question.content(h)

        return <div class="f-content">
          {c}
        </div>
      }

      if (this.question.content) {
        return <div domPropsInnerHTML={this.question.content} class="f-content"></div>
      }
    },
    methods: {
      valid() {
        return this.active
      }
    }
  }
</script>