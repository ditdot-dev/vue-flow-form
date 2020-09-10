// Form template and logic

<template>
  <div class="v-form">
    <div class="f-container">
      <div class="form-wrap">
        <flow-form-question
          ref="questions"
          v-for="(q, index) in questionList"
          v-bind:question="q"
          v-bind:language="language"
          v-bind:key="'q' + index"
          v-bind:active="q.index === activeQuestionIndex"
          v-model="q.answer"
          v-on:answer="onQuestionAnswered"
          v-bind:reverse="reverse"
        />

        <!-- Complete/Submit screen slots -->   
        <div v-if="isOnLastStep" class="animate fade-in-up field-submittype">
          <slot name="complete">
            <!-- Default content for the "complete" slot -->
            <div class="section-wrap">
              <p>
                <span class="fh2">{{ language.thankYouText }}</span>
              </p>
            </div>
          </slot>

          <slot name="completeButton">
            <!-- Default content for the "completeButton" slot -->
            <button 
            class="o-btn-action"
            ref="button" 
            type="button" 
            href="#" 
            v-on:click.prevent="submit()" 
            v-if="!submitted"
            v-bind:aria-label="language.ariaSubmitText">
                <span>{{ language.submitText }}</span>
            </button>
             <a 
              class="f-enter-desc"
              href="#"
              v-on:click.prevent="submit()"
              v-if="!submitted">
             {{ language.pressEnter }}</a>
          </slot>
        </div>
      </div>
    </div>

    <div class="f-footer">
      <div class="footer-inner-wrap">
        <div class="f-progress" v-bind:class="{'not-started': percentCompleted === 0, 'completed': percentCompleted === 100}">
          <div class="f-progress-bar">
            <div class="f-progress-bar-inner" v-bind:style="'width: ' + percentCompleted + '%;'"></div>
          </div>
          {{ language.percentCompleted.replace(':percent', percentCompleted) }}
        </div>
        <div class="f-nav">
          <a
            class="f-prev"
            href="#"
            v-bind:class="{'f-disabled': activeQuestionIndex === 0 || submitted}"
            v-on:click.prevent="goToPreviousQuestion()"
            role="button"
            v-bind:aria-label="language.ariaPrev"
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
              aria-hidden="true"
            >
              <path
                d="M82.039,31.971L100,11.442l17.959,20.529L120,30.187L101.02,8.492c-0.258-0.295-0.629-0.463-1.02-0.463c-0.39,0-0.764,0.168-1.02,0.463L80,30.187L82.039,31.971z"
              />
            </svg>
            <span class="f-nav-text" aria-hidden="true">{{ language.prev }}</span>
          </a>
          <a
            class="f-next"
            href="#"
            v-bind:class="{'f-disabled': !isNextQuestionAvailable()}"
            v-on:click.prevent="goToNextQuestion()"
            role="button"
            v-bind:aria-label="language.ariaNext"
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
              aria-hidden="true"
            >
              <path
                d="M117.963,8.031l-17.961,20.529L82.042,8.031l-2.041,1.784l18.98,21.695c0.258,0.295,0.629,0.463,1.02,0.463c0.39,0,0.764-0.168,1.02-0.463l18.98-21.695L117.963,8.031z"
              />
            </svg>
            <span class="f-nav-text" aria-hidden="true">{{ language.next }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /*!
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
  */

  import FlowFormQuestion from './Question.vue'
  import LanguageModel from '../models/LanguageModel'

  export default {
    name: 'FlowForm',
    components: {
      FlowFormQuestion
    },
    props: {
      questions: Array,
      language: {
        type: LanguageModel,
        default: () => new LanguageModel()
      }
    },
    data() {
      return {
        completed: false,
        submitted: false,
        activeQuestionIndex: 0,
        questionList: [],
        questionListActivePath: [],
        reverse: false
      }
    },
    watch: {
      completed() {
        this.emitComplete()
      }
    },
    mounted() {
      document.addEventListener('keyup', this.onKeyListener, true)
      document.addEventListener('keydown', this.onBackKeyListener)
      window.addEventListener('beforeunload', this.onBeforeUnload)

      this.setQuestions()
      this.focusActiveQuestion()
    },
    beforeDestroy() {
      document.removeEventListener('keyup', this.onKeyListener, true)
      document.removeEventListener('keydown', this.onBackKeyListener)
      window.removeEventListener('beforeunload', this.onBeforeUnload)
    },
    computed: {
      numActiveQuestions() {
        return this.questionListActivePath.length
      },

      activeQuestion() {
        return this.questionListActivePath[this.activeQuestionIndex]
      },

      numCompletedQuestions() {
        let num = 0

        this.questionListActivePath.forEach(question => {
          if (question.answered) {
            ++num
          }
        })

        return num
      },

      percentCompleted() {
        if (!this.numActiveQuestions) {
          return 0
        }

        return Math.floor((this.numCompletedQuestions / this.numActiveQuestions) * 100)
      },

      isOnLastStep() {
        return this.activeQuestionIndex === this.questionListActivePath.length
      }
    },
    methods: {
      /**
       * Returns currently active question component (if any).
       */
      activeQuestionComponent() {
        if (this.$refs.questions) {
          return this.$refs.questions[this.activeQuestionIndex]
        }

        return null
      },

      setQuestions() {
        this.setQuestionListActivePath()
        this.setQuestionList()
      },

      /**
       * This method goes through all questions and sets the ones
       * that are in the current path (taking note of logic jumps)
       */
      setQuestionListActivePath() {
        const questions = []
        let
          index = 0,
          serialIndex = 0,
          nextId

        do {
          let question = this.questions[index]

          question.setIndex(serialIndex)
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

        this.questionListActivePath = questions
      },

      /**
       * Sets the question list array
       * (all questions up to, and including, the current one)
       */
      setQuestionList() {
        const questions = []

        for (let index = 0; index < this.questionListActivePath.length; index++) {
          const question = this.questionListActivePath[index]

          questions.push(question)

          if (!question.answered) {
            if (this.completed) {
              // The "completed" status changed - user probably changed an
              // already entered answer.
              this.completed = false
            }
            break
          }
        }

        this.questionList = questions
      },

      /**
       * If we have any answered questions, notify user before leaving
       * the page.
       */
      onBeforeUnload(event) {
        if (this.activeQuestionIndex > 0 && !this.submitted) {
          event.preventDefault()
          event.returnValue = ''
        }
      },

      /**
       * Global key listener, listens for Enter or Tab key events.
       */
      onKeyListener(e) {
        if (e.shiftKey) {
          return
        }

        if (e.key === 'Enter' || e.key === 'Tab') {
          e.stopPropagation()

          this.emitEnter()
          this.reverse = false
        }
      },

      onBackKeyListener(e) {
        if (e.shiftKey && e.key === 'Tab' ) {
          e.stopPropagation()
          e.preventDefault()
          this.goToPreviousQuestion()
        }
      }, 

      emitEnter() {
        const q = this.activeQuestionComponent()

        if (q) {
          // Send enter event to the current question component
          q.onEnter()
        } else if (this.completed && this.isOnLastStep) {
          // We're finished - submit form
          this.submit()
        }
      },

      submit() {
        this.emitSubmit()
        this.submitted = true
      },

      emitComplete() {
        this.$emit('complete', this.completed, this.questionList)
      },

      emitSubmit() {
        this.$emit('submit', this.questionList)
      },

      /**
       * Checks if we have another question and if we
       * can jump to it.
       */
      isNextQuestionAvailable() {
        const q = this.activeQuestion
  
        if (q && !q.required) {
          return true
        }

        return this.activeQuestionIndex < this.questionList.length - 1
      },

      /**
       * Triggered by the "answer" event in the Question component
       */
      onQuestionAnswered(question) {
        if (question.isValid()) {
          if (this.activeQuestionIndex < this.questionListActivePath.length) {
            ++this.activeQuestionIndex
          }

          this.$nextTick(() => {
            this.setQuestions()

            // Nested $nextTick so we're 100% sure that setQuestions
            // actually updated the question array
            this.$nextTick(() => {
              const q = this.activeQuestionComponent()

              if (q) {
                q.focusField()
                this.activeQuestionIndex = q.question.index
              } else if (this.isOnLastStep) {
                // No more questions left - set "completed" to true
                this.completed = true
                this.activeQuestionIndex = this.questionListActivePath.length
                
                this.$refs.button && this.$refs.button.focus()
              }
            })
          })
        } else if (this.completed) {
          this.completed = false
        }
      },

      /**
       * Jumps to previous question.
       */
      goToPreviousQuestion() {
        this.blurFocus()

        if (this.activeQuestionIndex > 0) {
          --this.activeQuestionIndex

          this.focusActiveQuestion()
        }

        this.reverse = true
      },

      /**
       * Jumps to next question.
       */
      goToNextQuestion() {
        this.blurFocus()

        if (this.isNextQuestionAvailable()) {
          this.emitEnter()
        }

        this.reverse = false
      },

      focusActiveQuestion() {
        this.$nextTick(() => {
          const q = this.activeQuestionComponent()

          if (q) {
            q.focusField()
          }
        })
      },

      /**
       * Removes focus from the currently focused DOM element.
       */
      blurFocus() {
        document.activeElement && document.activeElement.blur && document.activeElement.blur()
      }
    }
  }
</script>

<style lang="css">
  @import '../assets/css/normalize.css';
  @import '../assets/css/common.css';
  @import '../assets/css/animations.css';
</style>