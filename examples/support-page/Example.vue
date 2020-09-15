// Create and setup your form here
 
<template>
  <div>

    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-on:submit="onSubmit"
      v-bind:questions="questions"
      v-bind:language="language"
    >
    <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <!-- We've overriden the default "complete" slot content -->
     <template v-slot:complete>
        <div class="section-wrap">
          <p>
            <span class="fh2">Thank you for contacting our Customer Support Team.</span>
            <span class="section-text">
              Our support team members will contact you as soon as possible.
            </span>
          </p>
          <!--<p class="description">Note: No data will be saved and/or sent in this demo.</p>-->
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
            v-on:click.prevent="onSendData()">
           {{ language.pressEnter }}</a>
        </div>

        <p class="text-success" v-if="submitted">Your request has been submitted successfully.</p>
      </template>
    </flow-form>
  </div>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
  */

  // Import necessary components and classes
  import FlowForm from '../../src/components/FlowForm.vue'
  import QuestionModel, { QuestionType, ChoiceOption } from '../../src/models/QuestionModel'
  import LanguageModel from '../../src/models/LanguageModel'
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
            id: 'multiple_choice',
            tagline: "Hi 👋, welcome to our support page!",
            title: 'How can we help you today?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'I have a technical issue',
                value: 'technical'
              }),
              new ChoiceOption({
                label: 'I wish to check my ticket status',
                value: 'checkticket'
               }),
            ],
            jump: {
              technical: 'technical', 
              checkticket: 'checkticket'
            }
          }),
          new QuestionModel({
            id: 'technical',
            tagline: "Support page > Technical team",
            title: 'Have you read our technical FAQ?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Yes',
                value: 'yes'
              }),
              new ChoiceOption({
                label: 'No',
                value: 'no'
               }),
            ],
            jump: {
              yes: 'read_yes', 
              no: 'read_no'
            }
          }),
           new QuestionModel({
            id: 'checkticket',
            tagline: "Support page > Ticket status",
            title: 'Please enter your 6 digit ticket code',
            type: QuestionType.Number,
            placeholder: "Type here...",
            required: true,
          }),
           new QuestionModel({
            id: 'read_yes',
            title: 'Have you found the answer to your question?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Yes',
                value: 'yes'
              }),
              new ChoiceOption({
                label: 'No',
                value: 'no'
               }),
            ],
            jump: {
              yes: 'faq_yes', 
              no: 'faq_no'
            }
          }),
          new QuestionModel({
            id: 'read_no',
            title: 'Please visit our FAQ page www.faq.com',
            helpText: 'Was this information helpful?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Yes',
                value: 'yes'
              }),
              new ChoiceOption({
                label: 'No',
                value: 'no'
               }),
            ],
            jump: {
              yes: 'faq_yes', 
              no: 'faq_no'
            }
          }),
           new QuestionModel({
            id: 'faq_yes',
            title: 'We are glad our FAQ page was helpful',
            content: 'Press continue to exit the support form.',
            type: QuestionType.SectionBreak,
            jump: {
              _other: '_submit'
            }
          }),
          new QuestionModel({
            id: 'faq_no',
            title: 'Enter your question to receive a ticket',
            type: QuestionType.LongText,
            required: true,
            placeholder: 'Start typing here...',
          }),
           new QuestionModel({
            id: 'ticket',
            title: 'This is your ticket number: ' + this.getTicket(),
            content: 'Press continue to exit the support form.',
            type: QuestionType.SectionBreak,
            jump: {
              _other: '_submit'
            }
          }),
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
        // Set `submitted` to true so the form knows not to allow back/forward
        // navigation anymore.
        this.$refs.flowform.submitted = true

        this.submitted = true

        /* eslint-disable-next-line no-unused-vars */
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
          if (question.title) {
            let answer = question.answer
            if (typeof answer === 'object') {
              answer = answer.join(', ')
            }

            data.questions.push(question.title)
            data.answers.push(answer)
          }
        })

        return data
      },

      getTicket() {
        const ticket = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
        return ticket
      }
    }
  }
</script>

<style lang="css">
  @import '../../src/assets/css/themes/theme-green.css';
  /* If using the npm package, use the following lines instead of the one above */
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css'; */
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css'; */
</style>