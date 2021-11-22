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

    methods: {
      setAnswer(answer) {
        this.question.setAnswer(this.$refs.input.files)

        this.answer = answer
        this.question.answered = this.isValid()

        this.$emit('update:modelValue', answer)
      },

      showInvalid() {
        return this.errorMessage !== null
      },

      checkFileAccept(file) {
        const extension = '.' + file.name.split('.').pop()

        if (this.acceptedFileExtensionsRegex && this.acceptedFileExtensionsRegex.test(extension)) {
          return true
        }

        if (this.acceptedFileMimesRegex && this.acceptedFileMimesRegex.test(file.type)) {
          return true
        }

        return false
      },

      validate() {
        if (this.question.required && !this.hasValue) {
          return false
        }

        const 
          files = this.$refs.input.files,
          numFiles = files.length

        if (this.question.accept) {
          if (!Array.from(files).every(file => this.checkFileAccept(file))) {
            this.errorMessage = this.language.formatString(this.language.errorAllowedFileTypes, {
              fileTypes: this.question.accept
            })

            return false
          }
        }

        if (this.question.multiple) {
          if (this.question.min !== null && numFiles < +this.question.min) {
            this.errorMessage = this.language.formatString(this.language.errorMinFiles, {
              min: this.question.min
            })

            return false
          }

          if (this.question.max !== null && numFiles > +this.question.max) {
            this.errorMessage = this.language.formatString(this.language.errorMaxFiles, {
              max: this.question.max
            })

            return false
          }
        }

        if (this.question.maxSize !== null) {
          const fileSize =
            Array.from(files).reduce((current, file) => current + file.size, 0)

          if (fileSize > +this.question.maxSize) {
            this.errorMessage = this.language.formatString(this.language.errorMaxFileSize, {
              size: this.language.formatFileSize(this.question.maxSize)
            })

            return false
          }
        }

        this.errorMessage = null

        return this.$refs.input.checkValidity()
      }
    },

    computed: {
      acceptArray() {
        if (this.question.accept) {
          return this.question.accept.split(',')
        }

        return []
      },

      acceptedFileMimes() {
        return this.acceptArray.filter(accept => accept[0] !== '.')
      },

      acceptedFileMimesRegex() {
        if (this.acceptedFileMimes.length) {
          return new RegExp(this.acceptedFileMimes.join('|').replace(/\*/g, '.\*'))
        }

        return null
      },

      acceptedFileExtensions() {
        return this.acceptArray.filter(accept => accept[0] === '.')
      },

      acceptedFileExtensionsRegex() {
        if (this.acceptedFileExtensions.length) {
          return new RegExp(this.acceptedFileExtensions.join('|'))
        }

        return null
      }
    }
  }
</script>