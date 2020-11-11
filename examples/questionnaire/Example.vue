// Create and setup your form here

<template>
  <div>
    <header class="vff-header">
      <div class="f-container">
       <!-- Add custom logo here -->
        <h3> Retirement Calculator</h3>
      </div>
    </header>

    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-on:submit="onSubmit"
      v-bind:questions="questions"
      v-bind:language="language"
      v-bind:standalone="true"
    >
    <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <!-- We've overriden the default "complete" slot content -->
     <template v-slot:complete>
        <div class="f-section-wrap">
          <p>
            <span class="fh2">Thank you. 🙏</span>
            <span class="f-section-text">
              Great work, the survey is completed, and our demo is done. You can review your answers or press submit.
            </span>
          </p>
          <p class="f-description">Note: No data will be saved and/or sent in this demo.</p>
        </div>
      </template>

      <!-- We've overriden the default "completeButton" slot content -->
      <template v-slot:completeButton>
        <div class="f-submit" v-if="!submitted">
          <button
            class="o-btn-action"
            ref="button"
            type="submit"
            href="#"
            v-on:click.prevent="onSendData()"
            aria-label="Press to submit"
          >
            <span>{{ language.submitText }}</span>
          </button>
          <a class="f-enter-desc"
            href="#"
            v-on:click.prevent="onSendData()"
            v-html="language.formatString(language.pressEnter)">
          </a>
        </div>

        <p class="text-success" v-if="submitted">Submitted succesfully.</p>
      </template>
    </flow-form>
  </div>
</template>

<script>

  // Import necessary components and classes
  import FlowForm from '../../src/components/FlowForm.vue'
  import QuestionModel, { QuestionType, ChoiceOption, LinkOption } from '../../src/models/QuestionModel'
  import LanguageModel from '../../src/models/LanguageModel'
  import SMETaxCalculations from "../../src/models/SMETaxCalculations";
  import TaxApi, { setTaxInput } from "../../src/models/TaxApi";
  // If using the npm package, use the following line instead of the ones above.
  // import FlowForm, { QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'

  export default {
    name: 'example',
    components: {
      FlowForm
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
            tagline: 'Hi! Welcome to our demo survey 😊',
            title: 'What is your age?',
            type: QuestionType.Text,
            required: true,
            placeholder: 'Start typing here...',
            tooltip: 'test'
          }),
          new QuestionModel({
            id: 'multiple_choice',
            tagline: 'FYI, You can always go back 👈, use the up arrow on the bottom.',
            title: 'Multiple choice question:',
            helpTextShow: false,
            type: QuestionType.MultipleChoice,
            multiple: false,
            allowOther: true,
            required: true,
            tooltip: 'test',
            options: [
              new ChoiceOption({
                label: '10',
                value: '10'
              }),
              new ChoiceOption({
                label: '20',
                value: '20'
               })
            ]
          }),
          new QuestionModel({
            id: 'path_b',
            tagline: 'Path B',
            title: 'Hmm, are you sure?',
            helpText: 'Path A sounds like a winner! 😉',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            tooltip: 'test',
            options: [
              new ChoiceOption({
                label: 'Ok, let\'s go with A',
                value: 'path_a'
              }),
              new ChoiceOption({
                label: 'Yes, finish the survey'
              })
            ],
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
          this.onSendData()
        }
      },

      /* eslint-disable-next-line no-unused-vars */
      onComplete(completed, questionList) {
        // This method is called whenever the "completed" status is changed.
        this.completed = completed
      },

      /* eslint-disable-next-line no-unused-vars */
      onSubmit(questionList) {
        // This method will only be called if you don't override the
        // completeButton slot.
        this.onSendData()
      },

      onSendData() {
        this.$refs.flowform.submitted = true
        this.submitted = true

        /* Set the data inputs for an object for Track tax api */
        const data = this.getData()
        console.log(data)

        async function postData() {
          await setTaxInput();
          await postTaxData(incomeData);
        }
        /* Put the data outputs into an object */

        /* Translate the object with outputs into Results.vue */


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
          answers: [],
          id: []
        }

        this.questions.forEach(question => {
          if (question.title) {
            let answer = question.answer
            if (typeof answer === 'object') {
              answer = answer.join(', ')
            }

            data.questions.push(question.title)
            data.answers.push(answer)
            data.id.push(question.id)
          }
        })

        return data
      }
    },
  }
</script>

<style lang="css">
  @import '../../src/assets/css/themes/theme-green.css';
  /* If using the npm package, use the following lines instead of the one above */
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css'; */
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
</style>
