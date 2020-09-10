// Single question template and logic

<template>
  <div class="animate q-form" v-bind:class="mainClasses">
    <div class="q-inner" ref="qinner">
      <div v-bind:class="{'section-wrap': question.type === QuestionType.SectionBreak}">
        <div v-bind:class="{'fh2': question.type !== QuestionType.SectionBreak}">
          <span class="f-title" v-if="question.tagline">{{ question.tagline }}</span>

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

          <span class="f-sub" v-if="question.subtitle || question.type === QuestionType.LongText || question.multiple">
            <span v-if="question.subtitle">{{ question.subtitle }}</span>

            <span class="f-help" v-if="question.type === QuestionType.LongText">{{ question.helpText || language.longTextHelpText }}</span>

            <span class="f-help" v-if="question.multiple">{{ question.helpText || language.multipleChoiceHelpText }}</span>
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
            <span v-if="question.type === QuestionType.SectionBreak">{{ language.continue }}</span>
            <span v-else>{{ language.ok }}</span>
        </button>
        <a 
          class="f-enter-desc"
          href="#"
          v-on:click.prevent="onEnter">
          {{ language.pressEnter }}</a>
      </div>

      <div v-if="showInvalid()" class="f-invalid" role="alert" aria-live="assertive">{{ language.invalidPrompt }}</div>
    </div>
  </div>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
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
      FlowFormUrlType
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
    data() {
      return {
        QuestionType: QuestionType,
        dataValue: null
      }
    },
    mounted() {
      this.focusField()
      this.dataValue = this.question.answer

      this.$refs.qinner.addEventListener('transitionend', this.onTransitionEnd)
    },
    beforeDestroy() {
      this.$refs.qinner.removeEventListener('transitionend', this.onTransitionEnd)
    },
    methods: {
      /**
       * Autofocus the input box of the current question
       */
      focusField() {
        let el = this.$refs.questionComponent
        
        el && el.focus()
      },

      onTransitionEnd() {
        this.enterPressed = false
      },

      /**
       * Emits "answer" event and calls "onEnter" method on Enter press
       */ 
      onEnter() {
        const q = this.$refs.questionComponent

        if (q) {
          this.$emit('answer', q)
          q.onEnter()
        }
      },

      /**
       * Check if the "OK" button should be shown.
       */
      showOkButton() {
        const q = this.$refs.questionComponent

        if (this.question.type === QuestionType.SectionBreak) {
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
      }
    }
  }
</script>