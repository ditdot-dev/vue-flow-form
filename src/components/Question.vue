<template>
  <div class="animate fade-in-up q-form" v-bind:class="mainClasses">
    <div class="q-inner" ref="qinner">
      <div class="section-wrap">
        <p v-bind:class="{'fh2': question.type !== QuestionType.SectionBreak}">
          <span class="f-title" v-if="question.title">{{ question.title }}</span>

          <span class="f-text" v-if="question.question">
            {{ question.question }}&nbsp;
            <span class="f-required" v-if="question.required">*</span>

            <span v-if="question.inline" class="f-answer">
              <component
                ref="questionComponent"
                v-bind:is="question.type"
                v-bind:question="question"
                v-bind:language="language"
                v-model="dataValue"
                v-bind:active="active"
              />
            </span>
          </span>

          <span class="f-sub" v-if="question.subtitle || question.type === QuestionType.LongText || question.multiple">
            <span v-if="question.subtitle">{{ question.subtitle }}</span>

            <span class="f-help" v-if="question.type === QuestionType.LongText">{{ question.helpText || language.longTextHelpText }}</span>

            <span class="f-help" v-if="question.multiple">{{ question.helpText || language.multipleChoiceHelpText }}</span>
          </span>

          <span v-if="!question.inline" class="f-answer full-width">
            <component
              ref="questionComponent"
              v-bind:is="question.type"
              v-bind:question="question"
              v-bind:language="language"
              v-model="dataValue"
              v-bind:active="active"
            />
          </span>
        </p>

        <p v-if="question.description" class="description">{{ question.description }}</p>
      </div>

      <a
        class="animate fade-in-up f-enter"
        ref="button"
        href="#"
        v-if="showOk()"
        v-on:click="onEnter"
      >
        <div class="o-btn-action">
          <span v-if="question.type === QuestionType.SectionBreak">{{ language.continue }}</span>
          <span v-else>{{ language.ok }}</span>
        </div>

        <span class="f-enter-desc">{{ language.pressEnter }}</span>
      </a>

      <div v-if="showInvalid()" class="f-invalid">{{ language.invalidPrompt }}</div>
    </div>
  </div>
</template>

<script>
  import LanguageModel from '../models/LanguageModel'
  import QuestionModel, { QuestionType } from '../models/QuestionModel'
  import DropdownType from './QuestionTypes/DropdownType'
  import EmailType from './QuestionTypes/EmailType'
  import LongTextType from './QuestionTypes/LongTextType'
  import MultipleChoiceType from './QuestionTypes/MultipleChoiceType'
  import NumberType from './QuestionTypes/NumberType'
  import PhoneType from './QuestionTypes/PhoneType'
  import SectionBreakType from './QuestionTypes/SectionBreakType'
  import TextType from './QuestionTypes/TextType'
  import UrlType from './QuestionTypes/UrlType'

  export default {
    name: 'Question',
    components: {
      DropdownType,
      EmailType,
      LongTextType,
      MultipleChoiceType,
      NumberType,
      PhoneType,
      SectionBreakType,
      TextType,
      UrlType
    },
    props: {
      question: QuestionModel,
      language: LanguageModel,
      value: [String, Array],
      active: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        timeoutId: null,
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
      focusField() {
        let el = this.$refs.questionComponent
        el && el.focus()
      },
      onTransitionEnd() {
        this.enterPressed = false
      },
      onEnter() {
        const q = this.$refs.questionComponent

        if (q) {
          this.$emit('answer', q)
          q.goToNext()
        }
      },
      showOk() {
        const q = this.$refs.questionComponent

        if (this.question.type === QuestionType.SectionBreak) {
          return this.active
        }

        if (!q || !this.dataValue) {
          return false
        }

        return q.hasValue && q.valid()
      },
      showInvalid() {
        const q = this.$refs.questionComponent

        if (!q || !this.dataValue) {
          return false
        }

        return q.showInvalid()
      },
      setAnswered() {
        const q = this.$refs.questionComponent

        if (q) {
          q.dirty = true
        }
        this.onEnter()
      }
    },
    computed: {
      completed() {
        return this.question.answered
      },
      mainClasses() {
        let classes = {
          'q-is-active': this.active,
          'q-is-inactive': !this.active
        }

        classes['field-' + this.question.type.toLowerCase()] = true

        return classes
      }
    },
    watch: {
      dataValue(value) {
        const q = this.$refs.questionComponent
        let sendEnter = false

        this.question.answer = value

        if (this.question.type === QuestionType.Dropdown) {
          sendEnter = true
        }

        if (sendEnter) {
          this.onEnter()
        }
      }
    }
  }
</script>