// Create and setup your form here
 
<template>
  <div>
    <header>
      <div class="container">
       <!-- Add custom logo here -->
        <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.606 11.211">
          <path d="M.134.837H3.21V8.01h4.203v2.18H.134V.837z"/>
          <path d="M11.875.59c1.48 0 2.668.448 3.567 1.344s1.35 2.052 1.35 3.47c0 1.48-.445 2.7-1.336 3.632S13.38 10.45 11.9 10.45c-1.678 0-2.954-.54-3.827-1.622-.717-.9-1.08-2.022-1.09-3.397-.01-1.36.39-2.484 1.193-3.374C9.06 1.08 10.292.59 11.875.59zm0 2.283c-.563 0-1.003.222-1.323.662-.338.467-.507 1.124-.507 1.972 0 .865.162 1.524.487 1.978a1.58 1.58 0 0 0 1.369.682c.588 0 1.04-.223 1.355-.668s.474-1.07.474-1.875c0-1.834-.62-2.75-1.855-2.75z"/>
          <path d="M21.565 7.078V5.055h4.217v5.163h-1.986l-.13-.908c-.693.76-1.617 1.142-2.777 1.142-1.383 0-2.488-.437-3.313-1.3s-1.243-2.03-1.252-3.464c-.01-1.462.385-2.65 1.18-3.567.875-1.012 2.11-1.518 3.7-1.518 1.21 0 2.207.303 3 .907s1.264 1.457 1.447 2.556h-2.92c-.207-.787-.73-1.182-1.57-1.182-.553 0-.988.236-1.303.707s-.475 1.153-.475 2.043c0 1.695.652 2.542 1.96 2.542.363 0 .695-.103.998-.306a1.29 1.29 0 0 0 .572-.784h-1.35v.002z"/>
          <path d="M30.556.59c1.48 0 2.668.448 3.568 1.344s1.348 2.052 1.348 3.47c0 1.48-.443 2.7-1.336 3.632S32.06 10.45 30.58 10.45c-1.678 0-2.953-.54-3.826-1.622-.72-.892-1.082-2.022-1.1-3.398-.008-1.357.39-2.48 1.193-3.372C27.74 1.08 28.974.59 30.556.59zm0 2.283c-.563 0-1.002.222-1.322.662-.336.467-.506 1.125-.506 1.972 0 .865.162 1.524.486 1.978s.78.682 1.37.682 1.04-.223 1.355-.668.475-1.07.475-1.875c-.002-1.834-.62-2.75-1.857-2.75z"/>
        </svg>
      </div>
    </header>

    <survey
      ref="survey"
      v-on:complete="onComplete"
      v-on:submit="onSubmit"
      v-bind:questions="questions"
      v-bind:language="language"
    >
    <!-- Custom content for the Complete/Submit screen slots in the Survey component -->
      <!-- We've overriden the default "complete" slot content -->
      <template v-slot:complete>
        <p>
          <span class="fh2">Thank you. 🙏</span>
          <span class="section-text">
            Great work, the survey is completed, and our demo is done. You can review your answers or press submit.
          </span>
        </p>
        <p class="description">Note: No data will be saved and/or sent in this demo.</p>
      </template>

      <!-- We've overriden the default "completeButton" slot content -->
      <template v-slot:completeButton>
        <a
          ref="button"
          href="#"
          v-on:click="onSendData()"
          v-if="!submitted"
          role="button"
          aria-label="Press to submit"
        >
          <div class="o-btn-action">
            <span>{{ language.submitText }}</span>
          </div>

          <span class="f-enter-desc">{{ language.pressEnter }}</span>
        </a>

        <p class="text-success" v-if="submitted">Submitted succesfully.</p>
      </template>
    </survey>
  </div>
</template>

<script>
  // Import necessary components and classes
  import Survey from './components/Survey'
  import QuestionModel, { QuestionType, ChoiceOption } from './models/QuestionModel'
  import LanguageModel from './models/LanguageModel'

  export default {
    name: 'example',
    components: {
      Survey
    },
    data() {
      return {
        submitted: false,
        completed: false,
        language: new LanguageModel(),
        // Create question list with QuestionModel instances
        questions: [
          new QuestionModel({
            id: 'first_name',
            title: "Hi! Welcome to our demo survey 😊",
            question: 'What is your first name?',
            type: QuestionType.Text,
            required: true,
            placeholder: 'Start typing here...'
          }),
          new QuestionModel({
            id: 'email',
            title: "Nice to meet you 👀, let's continue",
            question: "Provide an example email.",
            type: QuestionType.Email,
            required: true,
            placeholder: 'Start typing here...'
          }),
          new QuestionModel({
            id: 'phone',
            question: 'Doing great! 👍 Go ahead and try with a phone number.',
            type: QuestionType.Phone,
            required: true,
            mask: '(###) ###-####'
          }),
          new QuestionModel({
            id: 'movies',
            question: 'List your favorite movies. 🍿',
            type: QuestionType.LongText,
            required: true,
            placeholder: 'Start typing here...'
          }),
          new QuestionModel({
            id: 'multiple_choice',
            title: "FYI, You can always go back 👈, use the up arrow on the bottom.",
            question: 'Multiple choice question:',
            type: QuestionType.MultipleChoice,
            multiple: false,
            allowOther: true,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Answer 1'
              }),
              new ChoiceOption({
                label: 'Answer 2'
               }),
              new ChoiceOption({
                label: 'Answer 3'
              })
            ]
          }),
          new QuestionModel({
            id: 'multiple_choices',
            question: 'Multiple choices question:',
            type: QuestionType.MultipleChoice,
            multiple: true,
            helpText: 'Select all that apply. 👇',
            required: true,
            options: [
              new ChoiceOption({
                label: 'Answer 1'
              }),
              new ChoiceOption({
                label: 'Answer 2'
              }),
              new ChoiceOption({
                label: 'Answer 3'
              }),
              new ChoiceOption({
                label: 'Answer 4'
              })
            ]
          }),
          new QuestionModel({
            id: 'break_1',
            content(h) {
              return <span>
                <span class="fh2">Awesome, thank you. 🙏</span>
                <span class="section-text">You arrived at the section break of our little demo survey. To continue exploring, just press enter or use the continue button.</span>
              </span>
            },
            description: 'Note: We will take a look at our multiple path feature next.',
            type: QuestionType.SectionBreak
          }),
          new QuestionModel({
            id: 'choose_path',
            title: "Where would you like to go? 🤔",
            question: 'Choose your path:',
            type: QuestionType.Dropdown,
            multiple: false,
            placeholder: 'Select',
            inline: true,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Path A'
              }),
              new ChoiceOption({
                label: 'Path B',
                value: 'path_b'
              })
            ],
            jump: {
              path_b: 'path_b'
            }
          }),
           new QuestionModel({
            id: 'path_a',
            content(h) {
              return <span>
                <span class="fh2">Excellent choice! 🥳</span>
                <span class="section-text">Press enter or use the continue button for the final submit screen.</span>
              </span>
            },
            type: QuestionType.SectionBreak,
            jump: {
              _other: '_submit'
            }
          }),
          new QuestionModel({
            id: 'path_b',
            title: "Path B",
            question: 'Hmm, are you sure?',
            subtitle: 'Path A sounds like a winner! 😉',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Ok, let\'s go with A',
                value: 'path_a'
              }),
              new ChoiceOption({
                label: 'Yes, finish the survey'
              })
            ],
            jump: {
              path_a: 'path_a'
            }
          })
        ]
      }
    },
    mounted() {
      document.addEventListener('keyup', this.onKeyListener)
    },
    beforeDestroy() {
      document.removeEventListener('keyup', this.onKeyListener)
    },
    methods: {
      onKeyListener($event) {
        // We've overriden the default "complete" slot so
        // we need to implement the "keyup" listener manually.

        if ($event.key === 'Enter' && this.completed && !this.submitted) {
          // Set `submitted` to true so the form knows not to allow back/forward
          // navigation anymore.
          this.$refs.survey.submitted = true
          this.onSendData()
        }
      },

      onComplete(completed, questionList) {
        // This method is called whenever the "completed" status is changed.
        this.completed = completed
      },

      onSubmit(questionList) {
        // This method will only be called if you don't override the
        // completeButton slot.
        this.onSendData()
      },
      
      onSendData() {
        this.submitted = true

        const data = this.getData()
        /*
          You can use Fetch API to send the data to your server, eg.:

          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        */
      },

      getData() {
        const data = {
          questions: [],
          answers: []
        }

        this.questions.forEach(question => {
          if (question.question) {
            let answer = question.answer
            if (typeof answer === 'object') {
              answer = answer.join(', ')
            }

            data.questions.push(question.question)
            data.answers.push(answer)
          }
        })

        return data
      }
    }
  }
</script>