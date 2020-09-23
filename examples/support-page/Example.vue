// Create and setup your form here
 
<template>
  <div>
<<<<<<< HEAD
=======
    <header>
      <div class="f-container">
       <!-- Add custom logo here -->
      </div>
    </header>
>>>>>>> c6b08bed6982840d05acc902798700baab5943f8

    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-on:submit="onSubmit"
      v-bind:questions="questions"
      v-bind:language="language"
      v-bind:progressbar="false"
    >
    <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <!-- We've overriden the default "complete" slot content -->
     <template v-slot:complete>
        <div class="section-wrap">
          <p>
            <span class="fh2">Thank you for contacting our Customer Support Team. 🙏</span>
            <span class="section-text">
              Have a great day!
            </span>
          </p>
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
              <span>Exit</span>
          </button>
          <a class="f-enter-desc"
            href="#"
            v-on:click.prevent="onSendData()"
            v-html="language.formatString(language.pressEnter)">
          </a>
        </div>

       <!-- <p class="text-success" v-if="submitted">Your request has been submitted successfully.</p> -->
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
        submitted: false,
        completed: false,
        language: new LanguageModel(),
        // Create question list with QuestionModel instances
        questions: [
           new QuestionModel({
            id: 'multiple_choice',
<<<<<<< HEAD
            tagline: "Hi 👋, welcome to our support page!",
            title: 'How can we help you today?',
=======
            tagline: "Welcome to our Help Center",
            title: 'Hi 👋, how can we help you today?',
>>>>>>> c6b08bed6982840d05acc902798700baab5943f8
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              new ChoiceOption({
                label: 'I have a technical issue',
<<<<<<< HEAD
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
=======
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
            tagline: 'Submit Request > Step 1/3',
>>>>>>> c6b08bed6982840d05acc902798700baab5943f8
            title: 'Have you read our technical FAQ?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            helpTextShow: false,
            description: "Here you'll find answers to the most",
            descriptionLink: [
              new LinkOption({
                url: '#',
                text: 'frequently asked questions',
                target: '_self'
              })
            ],
<<<<<<< HEAD
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
=======
            options: [
              new ChoiceOption({
                label: 'Yes, my question has been answered 🤗. Get me out of here.',
                value: 'faq_yes'
              }),             
               new ChoiceOption({
                label: 'Yes, but still couldn’t find the answer. Let me ask you a question.',
                value: 'faq_no'
               }),
            ],
            jump: {
              faq_yes: 'faq_yes', 
              faq_no: 'faq_no'
            }
>>>>>>> c6b08bed6982840d05acc902798700baab5943f8
          }),
           new QuestionModel({
            id: 'enter_ticket',
            tagline: 'Ticket Status > Step 1/2',
            title: 'Please enter your 6-digit ticket code',
            subtitle: 'You received this when you reported your problem',
            type: QuestionType.Number,
            multiple: false,
            required: true,
            mask: '#-#-#-#-#-#',
            placeholder: '#-#-#-#-#-#',
            description: 'Only numbers are allowed'
          }),
            new QuestionModel({
            id: 'ticket_status',
            tagline: 'Ticket Status > Step 2/2',
            title: 'Good news - the wheels are turning, your ticket is being processed!😉',
            content: 'Press continue to exit the support form',
            type: QuestionType.SectionBreak,
            jump: {
              _other: '_submit'
            }
          }),
           new QuestionModel({
            id: 'faq_yes',
            title: "We're glad we could help 🤗",
            content: 'Press continue to exit the support form.',
            type: QuestionType.SectionBreak,
            jump: {
              _other: '_submit'
            }
          }),
          new QuestionModel({
            id: 'faq_no',
            tagline: 'Submit Request > Step 2/3',
            title: 'Enter your question to receive a ticket',
            type: QuestionType.LongText,
            required: true,
            placeholder: 'Start typing here...',
          }),
           new QuestionModel({
            id: 'ticket',
            tagline: 'Submit Request > Step 3/3',
            title: 'Your ticket number is: ' + this.getTicket(),
            content: 'Our support team members will contact you as soon as possible.',
            description: 'In the meantime, you can check out the following resources:',
            descriptionLink: [
              new LinkOption({
                url: '#',
                text: 'Latest News',
                target: '_self'
              }),
               new LinkOption({
                url: '#',
                text: 'Tutorials',
                target: '_self'
              })
            ],
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