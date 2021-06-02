<template>
  <input
    ref="input"
    type="file"
    v-bind:accept="question.accept"
    v-bind:multiple="question.multiple"
    v-bind:value="modelValue"
    v-bind:required="question.required"
    v-on:keyup.enter.prevent="onEnter"
    v-on:keyup.tab.prevent="onEnter"
    v-on:focus="setFocus"
    v-on:blur="unsetFocus"
    v-on:change="onChange"
  />
</template>

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

    name: QuestionType.File,
    
    mounted() {
      if (this.question.accept) {
        this.mimeTypeRegex = new RegExp(this.question.accept.replace('*', '[^\\/,]+'))
      }
    },

    methods: {
      setAnswer(answer) {
        this.question.setAnswer(this.files)

        this.answer = answer
        this.question.answered = this.isValid()

        this.$emit('update:modelValue', answer)
      },

      showInvalid() {
        return this.errorMessage !== null
      },

      validate() {
        this.errorMessage = null

        if (this.question.required && !this.hasValue) {
          return false
        }

        if (this.question.accept) {
          if (!Array.from(this.files).every(file => this.mimeTypeRegex.test(file.type))) {
            this.errorMessage = this.language.formatString(this.language.errorAllowedFileTypes, {
              fileTypes: this.question.accept
            })

            return false
          }
        }

        if (this.question.multiple) {
          const fileCount = this.files.length

          if (this.question.min !== null && fileCount < +this.question.min) {
            this.errorMessage = this.language.formatString(this.language.errorMinFiles, {
              min: this.question.min
            })

            return false
          }

          if (this.question.max !== null && fileCount > +this.question.max) {
            this.errorMessage = this.language.formatString(this.language.errorMaxFiles, {
              max: this.question.max
            })

            return false
          }
        }

        if (this.question.maxSize !== null) {
          const fileSize =
            Array.from(this.files).reduce((current, file) => current + file.size, 0)

          if (fileSize > +this.question.maxSize) {
            this.errorMessage = this.language.formatString(this.language.errorMaxFileSize, {
              size: this.language.formatFileSize(this.question.maxSize)
            })

            return false
          }
        }

        return this.$refs.input.checkValidity()
      }
    },

    computed: {
      files() {
        return this.$refs.input.files
      } 
    }
  }
</script>