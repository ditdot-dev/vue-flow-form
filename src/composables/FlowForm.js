/*!
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

import FlowFormQuestion from '../components/FlowFormQuestion.vue'
import QuestionModel, { ChoiceOption, LinkOption, QuestionType } from '../models/QuestionModel'
import LanguageModel from '../models/LanguageModel'
import { MaskModel } from '../models/MaskModel'
import { IsMobile } from '../mixins/IsMobile'
import { ComponentInstance } from '../mixins/ComponentInstance'

export default {
  name: 'FlowForm',

  components: {
    FlowFormQuestion
  },

  props: {
    questions: {
      type: Array,
      validator: value => value.every(q => q instanceof QuestionModel)
    },
    language: {
      type: LanguageModel,
      default: () => new LanguageModel()
    },
    extraTokens: {
      type: MaskModel,
      default: () => new MaskModel()
    },
    progressbar: {
      type: Boolean,
      default: true
    },
    standalone: {
      type: Boolean,
      default: true
    },
    navigation: {
      type: Boolean,
      default: true
    },
    timer: {
      type: Boolean,
      default: false
    },
    timerStartStep: [String, Number],
    timerStopStep: [String, Number],
    autofocus: {
      type: Boolean,
      default: true
    }
  },

  mixins: [
    IsMobile,
    ComponentInstance
  ],

  data() {
    return {
      questionRefs: [],
      completed: false,
      submitted: false,
      activeQuestionIndex: 0,
      questionList: [],
      questionListActivePath: [],
      reverse: false,
      timerOn: false,
      timerInterval: null,
      time: 0,
      disabled: false
    }
  },

  mounted() {
    document.addEventListener('keydown', this.onKeyDownListener)
    document.addEventListener('keyup', this.onKeyUpListener, true)
    window.addEventListener('beforeunload', this.onBeforeUnload)

    this.setQuestions()
    this.checkTimer()
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeyDownListener)
    document.removeEventListener('keyup', this.onKeyUpListener, true)
    window.removeEventListener('beforeunload', this.onBeforeUnload)

    this.stopTimer()
  },

  beforeUpdate() {
    this.questionRefs = []
  },

  computed: {
    numActiveQuestions() {
      return this.questionListActivePath.length
    },

    activeQuestion() {
      return this.questionListActivePath[this.activeQuestionIndex]
    },

    activeQuestionId() {
      const question = this.questionModels[this.activeQuestionIndex]

      if (this.isOnLastStep) {
        return '_submit'
      }

      if (question && question.id) {
        return question.id
      }

      return null
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
      return this.numActiveQuestions > 0 && this.activeQuestionIndex === this.questionListActivePath.length
    },

    isOnTimerStartStep() {
      if (this.activeQuestionId === this.timerStartStep) {
        return true
      }

      if (!this.timerOn && !this.timerStartStep && this.activeQuestionIndex === 0) {
        return true
      }

      return false
    },

    isOnTimerStopStep() {
      if (this.submitted) {
        return true
      }

      if (this.activeQuestionId === this.timerStopStep) {
        return true
      }

      return false
    },

    questionModels: {
      cache: false,

      get() {
        if (this.questions && this.questions.length) {
          return this.questions
        }

        const questions = []

        if (!this.questions) {
          const classMap = {
            options: ChoiceOption,
            descriptionLink: LinkOption
          }

          const defaultSlot = this.$slots.default && this.$slots.default()
          let children = null

          if (defaultSlot && defaultSlot.length) {
            children = defaultSlot[0].children
            if (!children) {
              children = defaultSlot
            }
          }

          if (children) {
            children
              .filter(q => q.type && typeof q.type === 'object' && q.type.name.indexOf('Question') !== -1)
              .forEach(q => {
                const props = q.props
                const componentInstance = this.getInstance(props.id)
                let model = new QuestionModel()

                if (componentInstance.question !== null) {
                  model = componentInstance.question
                }

                if (props.modelValue) {
                  model.answer = props.modelValue
                }

                Object.keys(model).forEach(key => {
                  if (props[key] !== undefined) {
                    if (typeof model[key] === 'boolean') {
                      model[key] = props[key] !== false
                    } else if (key in classMap) {
                      const
                        classReference = classMap[key],
                        options = []

                      props[key].forEach(option => {
                        const instance = new classReference()

                        Object.keys(instance).forEach(instanceKey => {
                          if (option[instanceKey] !== undefined) {
                            instance[instanceKey] = option[instanceKey]
                          }
                        })

                        options.push(instance)
                      })

                      model[key] = options
                    } else {
                      switch (key) {
                        case 'type':
                          if (Object.values(QuestionType).indexOf(props[key]) !== -1) {
                            model[key] = props[key]
                          } else {
                            for (const questionTypeKey in QuestionType) {
                              if (questionTypeKey.toLowerCase() === props[key].toLowerCase()) {
                                model[key] = QuestionType[questionTypeKey]
                                break
                              }
                            }
                          }
                          break

                        default:
                          model[key] = props[key]
                          break
                      }
                    }
                  }
                })

                componentInstance.question = model

                model.resetOptions()

                questions.push(model)
              })
          }
        }

        return questions
      }
    }
  },

  methods: {
    setQuestionRef(el) {
      this.questionRefs.push(el)
    },

    /**
     * Returns currently active question component (if any).
     */
    activeQuestionComponent() {
      return this.questionRefs[this.activeQuestionIndex]
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

      if (!this.questionModels.length) {
        return
      }

      let
        index = 0,
        serialIndex = 0,
        nextId,
        activeIndex = this.activeQuestionIndex

      do {
        let question = this.questionModels[index]

        if (questions.some(q => q === question)) {
          break
        }

        question.setIndex(serialIndex)
        question.language = this.language

        questions.push(question)

        if (!question.jump) {
          ++index
        } else if (question.answered) {
          nextId = question.getJumpId()

          if (nextId) {
            if (nextId === '_submit') {
              index = this.questionModels.length
            } else {
              for (let i = 0; i < this.questionModels.length; i++) {
                if (this.questionModels[i].id === nextId) {
                  if (i < index && questions.some(q => q === this.questionModels[i])) {
                    question.answered = false
                    activeIndex = i
                    ++index
                  } else {
                    index = i
                  }
                  break
                }
              }
            }
          } else {
            ++index
          }
        } else {
          index = this.questionModels.length
        }

        ++serialIndex
      } while (index < this.questionModels.length)

      this.questionListActivePath = questions
      this.goToQuestion(activeIndex)
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
     * Global key listeners, listen for Enter or Tab key events.
     */
    onKeyDownListener(e) {
      if (e.key !== 'Tab' || this.submitted) {
        return
      }

      if (e.shiftKey) {
        e.stopPropagation()
        e.preventDefault()

        if (this.navigation) {
          this.goToPreviousQuestion()
        }
      } else {
        const q = this.activeQuestionComponent()

        if (q.shouldFocus()) {
          e.preventDefault()

          q.focusField()
        } else {
          e.stopPropagation()

          this.emitTab()
          this.reverse = false
        }
      }
    },

    onKeyUpListener(e) {
      if (e.shiftKey || ['Tab', 'Enter'].indexOf(e.key) === -1 || this.submitted) {
        return
      }

      const q = this.activeQuestionComponent()

      if (e.key === 'Tab' && q.shouldFocus()) {
        q.focusField()
      } else {
        if (e.key === 'Enter') {

          this.emitEnter()
        }

        e.stopPropagation()
        this.reverse = false
      }
    },

    emitEnter() {
      if (this.disabled) {
        return
      }

      const q = this.activeQuestionComponent()

      if (q) {
        // Send enter event to the current question component
        q.onEnter()
      } else if (this.completed && this.isOnLastStep) {
        // We're finished - submit form
        this.submit()
      }
    },

    emitTab() {
      const q = this.activeQuestionComponent()

      if (q) {
        // Send tab event to the current question component
        q.onTab()
      } else {
        this.emitEnter()
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
      if (this.submitted) {
        return false
      }

      const q = this.activeQuestion
      if (q && !q.required) {
        return true
      }

      if (this.completed && !this.isOnLastStep) {
        return true
      }

      return this.activeQuestionIndex < this.questionList.length - 1
    },

    /**
     * Triggered by the "answer" event in the Question component
     */
    onQuestionAnswered(question) {
      if (question.isValid()) {
        this.$emit('answer', question.question)

        if (this.activeQuestionIndex < this.questionListActivePath.length) {
          ++this.activeQuestionIndex;

        }

        this.$nextTick(() => {
          this.reverse = false

          this.setQuestions()
          this.checkTimer()
          // Nested $nextTick so we're 100% sure that setQuestions
          // actually updated the question array
          this.$nextTick(() => {
            const q = this.activeQuestionComponent()

            if (q) {
              this.autofocus && q.focusField()
              this.activeQuestionIndex = q.question.index
            } else if (this.isOnLastStep) {
              // No more questions left - set "completed" to true
              this.completed = true
              this.activeQuestionIndex = this.questionListActivePath.length
              this.$refs.button && this.$refs.button.focus()
            }
            this.UpdateQuestionFromAnswers(this.activeQuestionIndex);
            this.FireOnShow(this.activeQuestionIndex);
            this.$emit('step', this.activeQuestionId, this.activeQuestion)
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

      if (this.activeQuestionIndex > 0 && !this.submitted) {
        if (this.isOnTimerStopStep) {
          this.startTimer()
        }

        --this.activeQuestionIndex

        this.reverse = true

        this.checkTimer()
      }
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

    /**
     * Jumps to question with specific index.
     */
    goToQuestion(index) {
      if (isNaN(+index)) {
        let questionIndex = this.activeQuestionIndex

        this.questionListActivePath.forEach((question, _index) => {
          if (question.id === index) {
            questionIndex = _index
          }
        })

        index = questionIndex
      }

      if (index !== this.activeQuestionIndex) {
        this.blurFocus()

        if (!this.submitted && index <= this.questionListActivePath.length - 1) {
          // Check if we can actually jump to the wanted question.
          do {
            const previousQuestionsAnswered =
              this
                .questionListActivePath
                .slice(0, index)
                .every(q => q.answered)

            if (previousQuestionsAnswered) {
              break
            }

            --index
          } while (index > 0)

          this.reverse = index < this.activeQuestionIndex
          this.activeQuestionIndex = index

          this.checkTimer()
        }
      }
    },

    /**
     * Removes focus from the currently focused DOM element.
     */
    blurFocus() {
      document.activeElement && document.activeElement.blur && document.activeElement.blur()
    },

    checkTimer() {
      if (this.timer) {
        if (this.isOnTimerStartStep) {
          this.startTimer()
        } else if (this.isOnTimerStopStep) {
          this.stopTimer()
        }
      }
    },

    startTimer() {
      if (this.timer && !this.timerOn) {
        this.timerInterval = setInterval(this.incrementTime, 1000)
        this.timerOn = true
      }
    },

    stopTimer() {
      if (this.timerOn) {
        clearInterval(this.timerInterval)
      }

      this.timerOn = false
    },

    incrementTime() {
      ++this.time

      this.$emit('timer', this.time, this.formatTime(this.time))
    },

    formatTime(seconds) {
      let
        startIndex = 14,
        length = 5

      if (seconds >= 60 * 60) {
        startIndex = 11
        length = 8
      }

      return new Date(1000 * seconds).toISOString().substr(startIndex, length)
    },

    setDisabled(state) {
      this.disabled = state
    },

    reset() {
      this.questionModels.forEach(question => question.resetAnswer())
      this.goToQuestion(0)
    },
    FireOnShow(activeIndex) {
      var questions = this.questionListActivePath
      var question = questions[activeIndex];

      if (question == null) return; //must be done if null
      if (question.onShow)
        question.onShow(questions);
    },
    UpdateQuestionFromAnswers(activeIndex) {
      var questions = this.questionListActivePath
      var question = questions[activeIndex];

      if (question == null) return; //must be done if null

      //handle Title Vars
      if (question.title) {
        if (question.tmpTitle == null) {
          question.tmpTitle = question.title;
        }

        var title = this.UpdateTextFromAnswers(question.tmpTitle, questions)
        question.title = title;
      }

      //handle tagline
      if (question.tagline) {
        if (question.tmpTagline == null) {
          question.tmpTagline = question.tagline;
        }

        var tagline = this.UpdateTextFromAnswers(question.tmpTagline, questions)

        question.tagline = tagline;
      }
    },
    UpdateTextFromAnswers(str, questions) {
      return str.replaceAll(/\${(.*?)}/g, (match, key) => {
        var id = key.trim()

        for (let i = 0; i < questions.length; i++) {
          const q = questions[i];
          if (q.type == QuestionType.SectionBreak) continue;

          if (q.id.trim() === id) {
            return q.answer
          }
        }

        return match
      });
    }
  },

  watch: {
    completed() {
      this.emitComplete()
    },

    submitted() {
      this.stopTimer()
    }
  }
}