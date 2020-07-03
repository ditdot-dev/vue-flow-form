<template>
  <div class="vertical-form">
    <div class="container">
      <div class="form-wrap">
        <question
          ref="questions"
          v-for="(q, index) in questionList"
          v-bind:question="q"
          v-bind:language="language"
          v-bind:key="q.id || 'q' + index"
          v-bind:active="q.index === activeQuestionIndex"
          v-model="q.answer"
          v-on:answer="questionAnswered"
        />

        <div v-if="activeQuestionIndex === questionListActivePath.length" class="animate fade-in-up field-submittype">
          <slot name="complete">
            <p>
              <span class="fh2">{{ language.thankYouText }}</span>
            </p>
          </slot>

          <slot name="completeButton">
            <a ref="button" href="#" v-on:click="$emit('complete', this.questionList)">
              <div class="o-btn-action">
                <span>{{ language.submitText }}</span>
              </div>

              <span class="f-enter-desc">{{ language.pressEnter }}</span>
            </a>
          </slot>

          <slot name="completeAfter"></slot>
        </div>
      </div>
    </div>

    <div class="f-footer">
      <div class="footer-inner-wrap">
        <div class="f-progress" v-bind:class="{'not-started': percentCompleted === 0, 'completed': percentCompleted === 100}">
          <div class="f-progress-bar">
            <div class="f-progress-bar-inner" v-bind:style="'width: ' + percentCompleted + '%;'"></div>
          </div>
          {{ language.percentCompleted|replace(':percent', percentCompleted) }}
        </div>
        <div class="f-nav">
          <a
            class="f-prev"
            href="#"
            v-bind:class="{'f-disabled': activeQuestionIndex === 0}"
            v-on:click.prevent="goToPreviousQuestion()"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="42.333px"
              height="28.334px"
              viewBox="78.833 5.5 42.333 28.334"
            >
              <path
                d="M82.039,31.971L100,11.442l17.959,20.529L120,30.187L101.02,8.492c-0.258-0.295-0.629-0.463-1.02-0.463c-0.39,0-0.764,0.168-1.02,0.463L80,30.187L82.039,31.971z"
              />
            </svg>
            <span class="f-nav-text">{{ language.prev }}</span>
          </a>
          <a
            class="f-next"
            href="#"
            v-bind:class="{'f-disabled': activeQuestionIndex >= questionList.length - 1}"
            v-on:click.prevent="goToNextQuestion()"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="42.333px"
              height="28.334px"
              viewBox="78.833 5.5 42.333 28.334"
            >
              <path
                d="M117.963,8.031l-17.961,20.529L82.042,8.031l-2.041,1.784l18.98,21.695c0.258,0.295,0.629,0.463,1.02,0.463c0.39,0,0.764-0.168,1.02-0.463l18.98-21.695L117.963,8.031z"
              />
            </svg>
            <span class="f-nav-text">{{ language.next }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Question from './Question'
  import LanguageModel from '../models/LanguageModel'

  export default {
    name: 'Survey',
    props: {
      questions: Array,
      language: {
        type: LanguageModel,
        default: new LanguageModel()
      },
      submitted: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      document.addEventListener('keyup', this.onKeyListener)
      window.addEventListener('beforeunload', this.beforeUnload)
    },
    beforeDestroy() {
      document.removeEventListener('keyup', this.onKeyListener)
      window.removeEventListener('beforeunload', this.beforeUnload)
    },
    data() {
      return {
        completed: false,
        activeQuestionIndex: 0
      }
    },
    computed: {
      questionListActivePath() {
        let
          questions = [],
          index = 0,
          serialIndex = 0,
          nextId

        do {
          let question = this.questions[index]

          question.index = serialIndex
          question.language = this.language

          questions.push(question)

          if (!question.jump) {
            ++index
          } else if (question.answered) {
            nextId = question.getJumpId()

            if (nextId) {
              if (nextId === '_submit') {
                index = this.questions.length
              } else {
                for (let i = 0; i < this.questions.length; i++) {
                  if (this.questions[i].id === nextId) {
                    index = i
                    break
                  }
                }
              }
            } else {
              ++index
            }
          } else {
            index = this.questions.length
          }

          ++serialIndex
        } while (index < this.questions.length)

        return questions
      },
      questionList() {
        let
          questions = [],
          index = 0

        for (index = 0; index < this.questionListActivePath.length; index++) {
          let question = this.questionListActivePath[index]

          questions.push(question)

          if (!question.answered) {
            this.activeQuestionIndex = index
            this.completed = false
            break
          }

          if (question.answered && index === this.questionListActivePath.length - 1) {
            this.completed = true
            this.activeQuestionIndex = index + 1

            this.$nextTick(() => {
              this.$refs.button && this.$refs.button.focus()
            })
          }
        }

        return questions
      },
      numActiveQuestions() {
        return this.questionListActivePath.length
      },
      numCompletedQuestions() {
        let num = 0

        for (let i = 0; i < this.questionListActivePath.length; i++) {
          if (this.questionListActivePath[i].answered) {
            ++num
          }
        }

        return num
      },
      percentCompleted() {
        if (!this.numActiveQuestions) {
          return 0
        }

        return Math.floor((this.numCompletedQuestions / this.numActiveQuestions) * 100)
      },
      onLastStep() {
        return this.activeQuestionIndex === this.questionListActivePath.length
      }
    },
    methods: {
      beforeUnload(event) {
        if (this.activeQuestionIndex > 0 && !this.submitted) {
          event.preventDefault()
          event.returnValue = ''
        }
      },
      activeQuestion() {
        if (this.$refs.questions) {
          return this.$refs.questions[this.activeQuestionIndex]
        }

        return null
      },
      onKeyListener(e) {
        if (e.shiftKey) {
          return
        }

        if (e.key === 'Enter' || e.key === 'Tab') {
          this.emitEnter()
        }
      },
      emitEnter() {
        const q = this.activeQuestion()
        q && q.onEnter()
      },
      questionAnswered(question) {
        if (question.valid()) {
          if (this.activeQuestionIndex < this.questionList.length) {
            ++this.activeQuestionIndex
          }

          this.$nextTick(() => {
            const q = this.activeQuestion()

            if (q) {
              q.focusField()
              this.activeQuestionIndex = q.question.index
            }
          })
        }
      },
      goToPreviousQuestion() {
        if (this.activeQuestionIndex > 0) {
          --this.activeQuestionIndex
        }
      },
      goToNextQuestion() {
        if (this.activeQuestionIndex < this.questionList.length - 1) {
          ++this.activeQuestionIndex
        }
      }
    },
    components: {
      Question
    }
  }
</script>