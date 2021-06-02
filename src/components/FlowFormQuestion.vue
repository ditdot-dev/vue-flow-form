// Single question template and logic

<template>
  <div class="vff-animate q-form" v-bind:class="mainClasses" ref="qanimate">
    <div class="q-inner">
      <div v-bind:class="{'f-section-wrap': question.type === QuestionType.SectionBreak}">
        <div v-bind:class="{'fh2': question.type !== QuestionType.SectionBreak}">
          <span class="f-tagline" v-if="question.tagline">{{ question.tagline }}</span>

          <template v-if="question.title">
            <span class="fh2" v-if="question.type === QuestionType.SectionBreak">{{ question.title }}</span>
            <span class="f-text" v-else>
              {{ question.title }}&nbsp;
              <!-- Required questions are marked by an asterisk (*) -->
              <span class="f-required" v-if="question.required" v-bind:aria-label="language.ariaRequired" role="note"><span aria-hidden="true">*</span></span>

              <span v-if="question.inline" class="f-answer">
                <component
                  ref="questionComponent"
                  v-bind:is="question.type"
                  v-bind:question="question"
                  v-bind:language="language"
                  v-model="dataValue"
                  v-bind:active="active"
                  v-bind:disabled="disabled"
                  v-on:next="onEnter"
                />
              </span>
            </span>
          </template>

          <span class="f-sub" v-if="showHelperText">
            <span v-if="question.subtitle">{{ question.subtitle }}</span>

            <span class="f-help" v-if="question.type === QuestionType.LongText && !isMobile" v-html="question.helpText || language.formatString(language.longTextHelpText)"></span>

            <span class="f-help" v-if="question.type === QuestionType.MultipleChoice && question.multiple">{{ question.helpText || language.multipleChoiceHelpText }}</span>
            <span class="f-help" v-else-if="question.type === QuestionType.MultipleChoice">{{ question.helpText || language.multipleChoiceHelpTextSingle }}</span>
          </span>

          <div v-if="!question.inline" class="f-answer f-full-width">
            <component
              ref="questionComponent"
              v-bind:is="question.type"
              v-bind:question="question"
              v-bind:language="language"
              v-model="dataValue"
              v-bind:active="active"
              v-bind:disabled="disabled"
              v-on:next="onEnter"
            />
          </div>
        </div>
        <p v-if="question.description || question.descriptionLink.length !== 0" class="f-description">
          <span v-if="question.description">{{ question.description }}</span>
          <a
            v-for="(link, index) in question.descriptionLink" 
            class="f-link" 
            v-bind:key="'m' + index"
            v-bind:href="link.url"
            v-bind:target="link.target"
          >{{ link.text || link.url }}</a>
        </p>

      </div>
      <div class="vff-animate f-fade-in f-enter" v-if="showOkButton()">
        <button 
          class="o-btn-action"
          type="button"
          ref="button"
          href="#"
          v-on:click.prevent="onEnter"
          v-bind:aria-label="language.ariaOk"
        >
          <span v-if="question.type === QuestionType.SectionBreak">{{ language.continue }}</span>
          <span v-else-if="showSkip()">{{ language.skip }}</span>
          <span v-else>{{ language.ok }}</span>
        </button>

        <a 
          class="f-enter-desc"
          href="#"
          v-if="question.type !== QuestionType.LongText || !isMobile"
          v-on:click.prevent="onEnter"
          v-html="language.formatString(language.pressEnter)">
        </a>
      </div>

      <div v-if="showInvalid()" class="f-invalid" role="alert" aria-live="assertive">{{ errorMessage }}</div>
    </div>
  </div>
</template>

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
  import FlowFormFileType from './QuestionTypes/FileType.vue'
  import { IsMobile } from '../mixins/IsMobile'
  

  export default {
    name: 'FlowFormQuestion',

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
      FlowFormFileType,
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
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    mixins: [
      IsMobile
    ],

    data() {
      return {
        QuestionType: QuestionType,
        dataValue: null,
        debounced: false
      }
    },

    mounted() {
      this.focusField()

      this.dataValue = this.question.answer

      this.$refs.qanimate.addEventListener('animationend', this.onAnimationEnd)
    },

    beforeUnmount() {
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

        if (q.isValid() && this.question.isMultipleChoiceType() && this.question.nextStepOnAnswer &&  !this.question.multiple) {
          this.$emit('disable', true)

          this.debounce(() => {
            fn(q)
            this.$emit('disable', false)
          }, 350)
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

        if (this.question.isMultipleChoiceType() && !this.question.multiple && this.question.nextStepOnAnswer) {
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

        return false
      },

      errorMessage() {
        const q = this.$refs.questionComponent

        if (q && q.errorMessage) {
          return q.errorMessage
        }

        return this.language.invalidPrompt
      }
    }
  }
</script>
