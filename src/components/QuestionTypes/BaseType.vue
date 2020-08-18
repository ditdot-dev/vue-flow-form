// Used as the basis and extended by other Question Type components

<template></template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
  */

  import QuestionModel, { QuestionType } from '../../models/QuestionModel'
  import LanguageModel from '../../models/LanguageModel'

  export default {
    name: 'BaseType',
    props: {
      language: LanguageModel,
      question: QuestionModel,
      active: Boolean,
      value: [String, Array]
    },
    data() {
      return {
        dirty: false,
        dataValue: '',
        answer: null,
        enterPressed: false,
        allowedChars: null,
        alwaysAllowedKeys: ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace']
      }
    },
    mounted() {
      if (this.question.multiple) {
        this.dataValue = []
      }
    },
    methods: {
      /**
       * This method can be overriden in custom components to 
       * change the answer before going through validation.
       */
      fixAnswer(answer) {
        return answer
      },

      getElement() {
        let el = this.$refs.input

        // Sometimes the input is nested so we need to find it
        while (el && el.$el) {
          el = el.$el
        }

        return el
      },

      focus() {
        const el = this.getElement()

        el && el.focus()
      },

      blur() {
        const el = this.getElement()

        el && el.blur()
      },

      onKeyDown($event) {
        this.enterPressed = false
        clearTimeout(this.timeoutId)

        if ($event && this.allowedChars !== null) {
          // Check if the entered character is allowed.
          // We always allow keys from the alwaysAllowedKeys array.
          if (this.alwaysAllowedKeys.indexOf($event.key) === -1 && this.allowedChars.indexOf($event.key) === -1) {
            $event.preventDefault()
          }
        }
      },

      onChange($event) {
        this.dirty = true
        this.dataValue = $event.target.value

        this.onKeyDown()
        this.setAnswer(this.dataValue)
      },

      onEnter() {
        this.enterPressed = true

        if (this.question.type === QuestionType.SectionBreak) {
          this.dirty = true
        }

        this.dataValue = this.fixAnswer(this.dataValue)
        this.setAnswer(this.dataValue)
        this.isValid() ? this.blur() : this.focus()
      },

      setAnswer(answer) {
        this.question.answered = this.isValid()
        this.answer = this.question.answer = answer

        this.$emit('input', this.answer)
      },

      showInvalid() {
        return this.dirty && this.enterPressed && !this.isValid()
      },

      isValid() {
        if (!this.question.required && !this.hasValue && this.dirty) {
          return true
        }

        if (this.question.mask && this.dataValue.length !== this.question.mask.length) {
          return false
        }

        if (this.validate()) {
          return true
        }

        return false
      },
      
      /**
       * This method validates the input and is meant to be overriden
       * in custom question types.
       */
      validate() {
        return !this.question.required || this.hasValue
      }
    },
    computed: {
      placeholder() {
        return this.question.placeholder || this.language.placeholder
      },

      hasValue() {
        if (this.dataValue !== null) {
          let v = this.dataValue

          if (v.trim) {
            v = v.trim()
          }

          return v.length > 0
        }

        return false
      }
    }
  }
</script>

<style></style>