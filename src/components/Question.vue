// Single question template and logic

<template>
  <div class="animate q-form" v-bind:class="mainClasses" ref="qanimate">
    <div class="q-inner">
      <div v-bind:class="{'section-wrap': question.type === QuestionType.SectionBreak}">
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

          <div v-if="!question.inline" class="f-answer full-width">
            <component
              ref="questionComponent"
              v-bind:is="question.type"
              v-bind:question="question"
              v-bind:language="language"
              v-model="dataValue"
              v-bind:active="active"
              v-on:next="onEnter"
            />
          </div>
        </div>
        <p v-if="question.description" class="description">{{ question.description }}</p>
      </div>
      <div class="animate fade-in f-enter" v-if="showOkButton()">
        <button 
          class="o-btn-action"
          type="button"
          ref="button"
          href="#"
          v-on:click.prevent="onEnter"
          v-bind:aria-label="language.ariaOk"
        >
            <span v-if="question.type === QuestionType.SectionBreak || question.type === QuestionType.Component">{{ language.continue }}</span>
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

      <div v-if="showInvalid()" class="f-invalid" role="alert" aria-live="assertive">{{ language.invalidPrompt }}</div>
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
  import QuestionModel, { QuestionType } from '../models/QuestionModel'
  import FlowFormDropdownType from './QuestionTypes/DropdownType.vue'
  import FlowFormEmailType from './QuestionTypes/EmailType.vue'
  import FlowFormLongTextType from './QuestionTypes/LongTextType.vue'
  import FlowFormMultipleChoiceType from './QuestionTypes/MultipleChoiceType.vue'
  import FlowFormNumberType from './QuestionTypes/NumberType.vue'
  import FlowFormPasswordType from './QuestionTypes/PasswordType.vue'
  import FlowFormPhoneType from './QuestionTypes/PhoneType.vue'
  import FlowFormSectionBreakType from './QuestionTypes/SectionBreakType.vue'
  import FlowFormTextType from './QuestionTypes/TextType.vue'
  import FlowFormUrlType from './QuestionTypes/UrlType.vue'
  import FlowFormComponentType from './QuestionTypes/ComponentType.vue'
  import { IsMobile } from '../mixins/IsMobile'
  

  export default {
    name: 'FlowFormQuestion',
    components: {
      FlowFormDropdownType,
      FlowFormEmailType,
      FlowFormLongTextType,
      FlowFormMultipleChoiceType,
      FlowFormNumberType,
      FlowFormPasswordType,
      FlowFormPhoneType,
      FlowFormSectionBreakType,
      FlowFormTextType,
      FlowFormUrlType,
      FlowFormComponentType
    },
    props: {
      question: QuestionModel,
      language: LanguageModel,
      value: [String, Array],
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
        QuestionType: QuestionType,
        dataValue: null
      }
    },
    mounted() {
      this.focusField()
      this.dataValue = this.question.answer

      this.$refs.qanimate.addEventListener('animationend', this.onAnimationEnd)
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
        const q = this.$refs.questionComponent

        if (q) {
          if (!q.focused) {
            this.$emit('answer', q)
          }

          q.onEnter()
        }
      },

      onTab($event) {
        const q = this.$refs.questionComponent

        if (q) {
          this.returnFocus()
          this.$emit('answer', q)
          
          q.onEnter()
        }
      },
      
      /**
       * Check if the "OK" button should be shown.
       */
      showOkButton() {
        const q = this.$refs.questionComponent

        if (this.question.type === QuestionType.SectionBreak || this.question.type === QuestionType.Component) {
          return this.active
        }

        if (!q || !this.dataValue) {
          return false
        }

        return q.hasValue && q.isValid()
      },

      /**
       * Determins if the invalid message should be shown.
       */
      showInvalid() {
        const q = this.$refs.questionComponent

        if (!q || !this.dataValue) {
          return false
        }

        return q.showInvalid()
      }
    },
    computed: {
      mainClasses() {
        const classes = {
          'q-is-active': this.active,
          'q-is-inactive': !this.active,
          'fade-in-down': this.reverse,
          'fade-in-up': !this.reverse
        }

        classes['field-' + this.question.type.toLowerCase().substring(8)] = true

        return classes
      },

      showHelperText() {
        if (this.question.subtitle) {
          return true
        }
        if (this.question.type === QuestionType.LongText || this.question.type === QuestionType.MultipleChoice) {
          return this.question.helpTextShow
        }
        return false
      }
    }
  }
</script>
