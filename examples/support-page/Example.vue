// Create and setup your form here
 
<template>
  <div>

    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-bind:questions="questions"
      v-bind:language="language"
      v-bind:progressbar="false"
      v-bind:standalone="true"
    >
      <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <!-- We've overriden the default "complete" slot content -->
      <template v-slot:complete>
        <div class="f-section-wrap">
          <div v-if="questions[0].answer === 'technical_issue'">
            <span class="f-tagline">Submit issue &gt; Step 3/3</span>
            <div v-if="loading">
              <span class="fh2">Please wait, submitting...</span>
            </div>
            <div v-else>
              <span class="fh2">Your ticket number is: {{ getTicket() }}</span>
              <p class="f-description"><span>Thank You 😊. Our support team will contact you as soon as possible.</span></p>
            </div>
          </div>
          <div v-else>
            <span class="f-tagline">Support page &gt; Ticket status</span>
            <span class="fh2">Good news - the wheels are turning, your ticket is being processed!😉</span>
            <p class="f-description"><span>Have a great day!</span></p>
          </div>
        </div>  
      </template>

      <!-- We've overriden the default "completeButton" slot content -->
      <template v-slot:completeButton>
        <div class="f-submit">
          <!-- Leave empty to hide default submit button -->
        </div>
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
  import QuestionModel, { QuestionType, ChoiceOption, LinkOption } from '../../src/models/QuestionModel'
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
        loading: false,
        completed: false,
        language: new LanguageModel(),
        // Create question list with QuestionModel instances
        questions: [
          new QuestionModel({
            id: 'multiple_choice',
            tagline: "Welcome to our demo support page!",
            title: 'Hi 👋, how can we help you today?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              new ChoiceOption({
                label: 'I have a technical issue',
                value: 'technical_issue'
              }),
              new ChoiceOption({
                label: 'I wish to check my ticket status',
                value: 'enter_ticket'
              }),
            ],
            jump: {
              technical_issue: 'technical_issue', 
              enter_ticket: 'enter_ticket'
            }
          }),
          new QuestionModel({
            id: 'technical_issue',
            tagline: 'Submit issue > Step 1/3',
            title: 'Have you read our technical FAQ?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            helpTextShow: false,
            description: "Here you'll find answers to",
            descriptionLink: [
              new LinkOption({
                url: '#',
                text: 'FAQs',
                target: '_self'
              })
            ],
            options: [          
              new ChoiceOption({
                label: 'Yes, but I couldn’t find the answer',
                value: 'faq_no'
              }),
            ],
            jump: {
              faq_no: 'faq_no'
            }
          }),
          new QuestionModel({
            id: 'enter_ticket',
            tagline: 'Support page > Ticket status',
            title: 'Please enter your 6-digit code.',
            subtitle: 'You received this when you reported your problem.',
            type: QuestionType.Number,
            multiple: false,
            required: true,
            mask: '#-#-#-#-#-#',
            placeholder: '#-#-#-#-#-#',
            jump: {
              _other: '_submit'
            }
          }),
          new QuestionModel({
            id: 'faq_no',
            tagline: 'Submit issue > Step 2/3',
            title: 'Please describe your problem.',
            type: QuestionType.LongText,
            required: true,
            placeholder: 'Start typing here...',
          })
        ]
      }
    },
    methods: {
      /* eslint-disable-next-line no-unused-vars */
      onComplete(completed, questionList) {
        // This method is called whenever the "completed" status is changed.
        this.completed = completed

        // Set `submitted` to true so the form knows not to allow back/forward
        // navigation anymore.
        this.$refs.flowform.submitted = true

        this.onSendData()
      },
      
      onSendData() {
        const self = this
        const data = this.getData()

        this.loading = true

        /* eslint-disable-next-line no-unused-vars */
        
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

        setTimeout(() => {
          self.loading = false
        }, 1500)
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
        return Math.floor(Math.random() * (999999 - 100000) + 100000).toString()
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