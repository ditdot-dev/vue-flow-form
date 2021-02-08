<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import LanguageModel from '../models/LanguageModel'
  import QuestionModel, { QuestionType, LinkOption } from '../models/QuestionModel'
  import FlowFormDropdownType from './QuestionTypes/DropdownType.vue'
  import FlowFormEmailType from './QuestionTypes/EmailType.vue'
  import FlowFormLongTextType from './QuestionTypes/LongTextType.vue'
  import FlowFormMultipleChoiceType from './QuestionTypes/MultipleChoiceType.vue'
  import FlowFormMultiplePictureChoiceType from './QuestionTypes/MultiplePictureChoiceType.vue'
  import FlowFormNumberType from './QuestionTypes/NumberType.vue'
  import FlowFormPasswordType from './QuestionTypes/PasswordType.vue'
  import FlowFormPhoneType from './QuestionTypes/PhoneType.vue'
  import FlowFormSectionBreakType from './QuestionTypes/SectionBreakType.vue'
  import FlowFormTextType from './QuestionTypes/TextType.vue'
  import FlowFormUrlType from './QuestionTypes/UrlType.vue'
  import FlowFormDateType from './QuestionTypes/DateType.vue'
  import { IsMobile } from '../mixins/IsMobile'

  export default {
    name: 'Question',
    components: {
      FlowFormDateType,
      FlowFormDropdownType,
      FlowFormEmailType,
      FlowFormLongTextType,
      FlowFormMultipleChoiceType,
      FlowFormMultiplePictureChoiceType,
      FlowFormNumberType,
      FlowFormPasswordType,
      FlowFormPhoneType,
      FlowFormSectionBreakType,
      FlowFormTextType,
      FlowFormUrlType
    },

    props: {
      question: QuestionModel,
      language: LanguageModel,
      value: [String, Array, Boolean, Number, Object],
      active: {
        type: Boolean,
        default: false
      },
      reverse: {
        type: Boolean,
        default: false
      }
    },

    mixins: [
      IsMobile
    ],

    data() {
      return {
        question: null
      }
    },

    mounted() {
      this.focusField()
      this.dataValue = this.question.answer
    },

    render() {
      return null
    },

    beforeDestroy() {
      this.$refs.qanimate.removeEventListener('animationend', this.onAnimationEnd)
    },

    methods: {
      /**
       * Autofocus the input box of the current question
       */
      focusField() {
        const el = this.$refs.questionComponent
        
        el && el.focus()
      },

      onAnimationEnd() {
        this.focusField()
      },

      shouldFocus() {
        const q = this.$refs.questionComponent

        return q && q.canReceiveFocus && !q.focused
      },

      returnFocus() {
        const q = this.$refs.questionComponent

        if (this.shouldFocus()) {
          this.focusField()
        }
      },

      /**
       * Emits "answer" event and calls "onEnter" method on Enter press
       */ 
      onEnter($event) {
        this.checkAnswer(this.emitAnswer)
      },

      onTab($event) {
        this.checkAnswer(this.emitAnswerTab)
      },

      checkAnswer(fn) {
        const q = this.$refs.questionComponent

        if (q.isValid() && this.question.nextStepOnAnswer && !this.question.multiple) {
          this.debounce(() => fn(q), 350)
        } else {
          fn(q)
        }
      },

      emitAnswer(q) {
        if (q) {
          if (!q.focused) {
            this.$emit('answer', q)
          }

          q.onEnter()
        }
      },

      emitAnswerTab(q) {
        if (q && this.question.type !== QuestionType.Date) {
          this.returnFocus()
          this.$emit('answer', q)
          
          q.onEnter()
        }
      },

      debounce(fn, delay) {
        let debounceTimer
        this.debounced = true
      
        return (() => {
          clearTimeout(debounceTimer)
          debounceTimer = setTimeout(fn, delay)
        })()
      },
      
      /**
       * Check if the "OK" button should be shown.
       */
      showOkButton() {
        const q = this.$refs.questionComponent

        if (this.question.type === QuestionType.SectionBreak) {
          return this.active
        }

        if (!this.question.required) {
          return true
        }

        if (this.question.allowOther && this.question.other) {
          return true
        }

        if (QuestionType.MultipleChoice && !this.question.multiple && this.question.nextStepOnAnswer) {
          return false
        }
      
        // If there is no question referenced, or dataValue is still set to its default (null).
        // This allows a ChoiceOption value of false, but will not allow you to use null as a value.
        if (!q || this.dataValue === null) {
          return false
        }

        return q.hasValue && q.isValid()
      },

      showSkip() {
        const q = this.$refs.questionComponent

        // We might not have a reference to the question component at first
        // but we know that if we don't, it's definitely empty
        return !this.question.required && (!q || !q.hasValue)
      },

      /**
       * Determins if the invalid message should be shown.
       */
      showInvalid() {
        const q = this.$refs.questionComponent

        if (!q || this.dataValue === null) {
          return false
        }

        return q.showInvalid()
      }
    },

    computed: {
      mainClasses: {
        cache: false,
        get() {
          const classes = {
            'q-is-active': this.active,
            'q-is-inactive': !this.active,
            'f-fade-in-down': this.reverse,
            'f-fade-in-up': !this.reverse,
            'f-focused': this.$refs.questionComponent && this.$refs.questionComponent.focused,
            'f-has-value': this.$refs.questionComponent && this.$refs.questionComponent.hasValue
          }

          classes['field-' + this.question.type.toLowerCase().substring(8, this.question.type.length - 4)] = true

          return classes
        }
      },

      showHelperText() {
        if (this.question.subtitle) {
          return true
        }

        if (this.question.type === QuestionType.LongText || this.question.type === QuestionType.MultipleChoice) {
          return this.question.helpTextShow
        }
      }
    },

    watch: {
      'question.answer'(val) {
        this.$emit('input', val)
      }
    }
  }
</script>