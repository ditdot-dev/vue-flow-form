<template>
  <survey
    ref="survey"
    v-bind:questions="questions"
    v-bind:language="language"
    v-bind:submitted="sent"
  >
    <template v-slot:complete>
      <p>
        <span class="fh2">Thank you. 🙏</span>
        <br />
        <br />
        <span class="section-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
        </span>
      </p>
    </template>
    <template v-slot:completeButton>
      <a
        ref="button"
        href="#"
        v-on:click="submitData"
        v-bind:class="{'f-disabled': sending}"
        v-if="!sent"
      >
        <div class="o-btn-action">
          <span>{{ language.submitText }}</span>
        </div>

        <span class="f-enter-desc">{{ language.pressEnter }}</span>
      </a>
      <p v-if="error">Error submitting data, please try again.</p>
      <p v-if="sent">Data submitted succesfully.</p>
    </template>
  </survey>
</template>

<script>
  import Survey from './components/Survey'
  import QuestionModel, { QuestionType, ChoiceOption, DropdownOptionBlank, DropdownOptions } from './models/QuestionModel'
  import LanguageModel from './models/LanguageModel'

  export default {
    name: 'app',
    components: {
      Survey
    },
    data() {
      return {
        sending: false,
        sent: false,
        error: false,
        language: new LanguageModel(),
        questions: [
          new QuestionModel({
            id: 'first_name',
            title: "Let's start by getting some basic info 😊",
            question: 'What is your first name?',
            type: QuestionType.Text,
            required: true
          }),
          new QuestionModel({
            id: 'email',
            question: "What's your email?",
            type: QuestionType.Email,
            required: true,
            placeholder: 'Type your email here...'
          }),
          new QuestionModel({
            id: 'phone',
            question: 'What is the best phone number to reach you?',
            type: QuestionType.Phone,
            required: true,
            placeholder: '(###) ###-####'
          }),
          new QuestionModel({
            id: 'practice',
            question: 'What practice do you work at?',
            subtitle: 'If multiple, please list them.',
            type: QuestionType.LongText,
            required: true
          }),
          new QuestionModel({
            id: 'url',
            question: "What's your practice website?",
            type: QuestionType.Url,
            required: true,
            placeholder: 'https://'
          }),
          new QuestionModel({
            id: 'role',
            question: 'What is your role?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            allowOther: true,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Dentist and owner'
              }),
              new ChoiceOption({
                label: 'Dental Hygienist'
              }),
              new ChoiceOption({
                label: 'Dental Assistant'
              }),
              new ChoiceOption({
                label: 'Office Manager'
              }),
              new ChoiceOption({
                label: 'Dentist but not Owner'
              }),
              new ChoiceOption({
                label: 'Non-Dentist Practice Owner'
              })
            ]
          }),
          new QuestionModel({
            id: 'type',
            question: 'What type of dentists are at your practice?',
            type: QuestionType.MultipleChoice,
            multiple: true,
            multiplePrompt: 'Select all that apply',
            allowOther: true,
            required: true,
            options: [
              new ChoiceOption({
                label: 'General Practitioner (GP)'
              }),
              new ChoiceOption({
                label: 'Periodontist'
              }),
              new ChoiceOption({
                label: 'Oral Surgeon'
              }),
              new ChoiceOption({
                label: 'Endodontist'
              }),
              new ChoiceOption({
                label: 'Prosthodontist'
              }),
              new ChoiceOption({
                label: 'Orthodontist'
              }),
              new ChoiceOption({
                label: 'None of the above'
              })
            ]
          }),
          new QuestionModel({
            id: 'break',
            content:
              '<span class="fh2">Awesome, thank you. 🙏</span>' +
              '<br><br>' +
              '<span class="section-text">Dandy Labs provides the highest quality and best fit possible. ' +
              'Our partners eliminate up to 92% of chair-site adjustments after switching.' +
              '<br><br>' +
              "Now, let's dive into how your practice is operated...</span>",
            description:
              'Note: we are currently accepting practices on a limited basis, and are prioritizing those who take the time to answer the remaining questions.',
            type: QuestionType.SectionBreak
          }),
          new QuestionModel({
            id: 'num_doctors',
            question: 'How many doctors work actively in your practice?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: '1 (Just me)'
              }),
              new ChoiceOption({
                label: '2'
              }),
              new ChoiceOption({
                label: '3'
              }),
              new ChoiceOption({
                label: '4'
              }),
              new ChoiceOption({
                label: '5'
              }),
              new ChoiceOption({
                label: '6'
              }),
              new ChoiceOption({
                label: '7'
              }),
              new ChoiceOption({
                label: '8'
              }),
              new ChoiceOption({
                label: '9'
              }),
              new ChoiceOption({
                label: '10+'
              })
            ]
          }),
          new QuestionModel({
            id: 'num_assistants',
            question: 'How many assistants work at your practice?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: '1'
              }),
              new ChoiceOption({
                label: '2'
              }),
              new ChoiceOption({
                label: '3'
              }),
              new ChoiceOption({
                label: '4'
              }),
              new ChoiceOption({
                label: '5'
              }),
              new ChoiceOption({
                label: '6'
              }),
              new ChoiceOption({
                label: '7'
              }),
              new ChoiceOption({
                label: '8'
              }),
              new ChoiceOption({
                label: '9'
              }),
              new ChoiceOption({
                label: '10+'
              })
            ]
          }),
          new QuestionModel({
            id: 'num_operatories',
            question: 'How many operatories does your practice have?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: '2'
              }),
              new ChoiceOption({
                label: '3-4'
              }),
              new ChoiceOption({
                label: '5-6'
              }),
              new ChoiceOption({
                label: '7-10'
              }),
              new ChoiceOption({
                label: '10+'
              })
            ]
          }),
          new QuestionModel({
            id: 'num_crowns_bridges_veneers',
            question: 'How many crowns / bridges / veneers does your practice order monthly?',
            subtitle: 'An estimate is fine',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            allowOther: true,
            options: [
              new ChoiceOption({
                label: '<10'
              }),
              new ChoiceOption({
                label: '10-15'
              }),
              new ChoiceOption({
                label: '15-20'
              }),
              new ChoiceOption({
                label: '20-30'
              }),
              new ChoiceOption({
                label: '30-40'
              }),
              new ChoiceOption({
                label: '40-50'
              }),
              new ChoiceOption({
                label: '50+'
              })
            ]
          }),
          new QuestionModel({
            id: 'materials_crowns',
            question: 'What materials do you primarily use for crowns / inlays / onlays / veneers?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            allowOther: true,
            options: [
              new ChoiceOption({
                label: 'Zirconia (Solid, High Translucency/Esthetic, Layered)'
              }),
              new ChoiceOption({
                label: 'E.Max (Lithium Disilicate)'
              }),
              new ChoiceOption({
                label: 'PFM'
              }),
              new ChoiceOption({
                label: 'Full Cast (Any metal types)'
              })
            ]
          }),
          new QuestionModel({
            id: 'materials_bridges',
            question: 'What materials do you primarily use for bridges?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            allowOther: true,
            options: [
              new ChoiceOption({
                label: 'Zirconia (Solid, High Translucency/Esthetic, Layered)'
              }),
              new ChoiceOption({
                label: 'E.Max (Lithium Disilicate)'
              }),
              new ChoiceOption({
                label: 'PFM'
              }),
              new ChoiceOption({
                label: 'Full Cast (Any metal types)'
              })
            ]
          }),
          new QuestionModel({
            id: 'num_implants',
            question: 'How many implants or dentures does your practice order a month?',
            subtitle: 'An estimate is fine',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            allowOther: true,
            options: [
              new ChoiceOption({
                label: '0-5'
              }),
              new ChoiceOption({
                label: '5-10'
              }),
              new ChoiceOption({
                label: '10-15'
              }),
              new ChoiceOption({
                label: '15-20'
              }),
              new ChoiceOption({
                label: '20-30'
              }),
              new ChoiceOption({
                label: '30-40'
              }),
              new ChoiceOption({
                label: '40-50'
              }),
              new ChoiceOption({
                label: '50+'
              })
            ]
          }),
          new QuestionModel({
            id: 'models',
            question: 'Do you normally receive models with your orders?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Yes'
              }),
              new ChoiceOption({
                label: 'No'
              })
            ]
          }),
          new QuestionModel({
            id: 'milling_machine',
            question: 'Does your practice have an in-office milling machine?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Yes'
              }),
              new ChoiceOption({
                label: 'No'
              })
            ]
          }),
          new QuestionModel({
            id: 'dental_labs',
            question: 'Please list all dental labs you work with and what you use each lab for:',
            subtitle: 'Ex. ABC Dental Lab = lab for implants, DEF Dental Lab = lab for crowns.',
            type: QuestionType.LongText,
            required: true
          }),
          new QuestionModel({
            id: 'turnaround_time',
            question: 'What is the average turnaround time for your main lab?',
            subtitle: 'ie. number of days from when the patient leaves your chair until you get the crown back',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: '1-2 days'
              }),
              new ChoiceOption({
                label: '3-4 days'
              }),
              new ChoiceOption({
                label: '5-6 days'
              }),
              new ChoiceOption({
                label: '1 week'
              }),
              new ChoiceOption({
                label: '1-2 weeks'
              }),
              new ChoiceOption({
                label: '2-3 weeks'
              }),
              new ChoiceOption({
                label: '3-4 weeks'
              }),
              new ChoiceOption({
                label: '1+ months'
              })
            ]
          }),
          new QuestionModel({
            id: 'dental_lab_most_important_trait',
            question: 'Which trait below matters most to you when working with a dental lab?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            allowOther: true,
            options: [
              new ChoiceOption({
                label: 'Price'
              }),
              new ChoiceOption({
                label: 'Fit (amount of adjustments required)'
              }),
              new ChoiceOption({
                label: 'Turnaround Time'
              }),
              new ChoiceOption({
                label:
                  'Customer Support (how quickly you can get in touch with a tech)'
              }),
              new ChoiceOption({
                label: 'Aesthetics/Accurate Shading'
              })
            ]
          }),
          new QuestionModel({
            id: 'dental_lab_least_important_trait',
            question: 'Which trait below matters most to you when working with a dental lab?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            allowOther: true,
            options: [
              new ChoiceOption({
                label: 'Price'
              }),
              new ChoiceOption({
                label: 'Fit (amount of adjustments required)'
              }),
              new ChoiceOption({
                label: 'Turnaround Time'
              }),
              new ChoiceOption({
                label:
                  'Customer Support (how quickly you can get in touch with a tech)'
              }),
              new ChoiceOption({
                label: 'Aesthetics/Accurate Shading'
              })
            ]
          }),
          new QuestionModel({
            id: 'dental_lab_satisfaction',
            question: 'How happy are you with your dental lab(s)?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            allowOther: true,
            options: [
              new ChoiceOption({
                label: 'Very Happy'
              }),
              new ChoiceOption({
                label: 'Satisfied'
              }),
              new ChoiceOption({
                label: 'Neutral'
              }),
              new ChoiceOption({
                label: 'Dissatisfied'
              }),
              new ChoiceOption({
                label: 'Very Disappointed'
              })
            ]
          }),
          new QuestionModel({
            id: 'lab_change',
            question:
              'Is there anything you would change when working with your labs?',
            type: QuestionType.LongText,
            required: false
          }),
          new QuestionModel({
            id: 'practice_management_software',
            question: 'Which practice management software do you use?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            allowOther: true,
            options: [
              new ChoiceOption({
                label: 'Dentrix'
              }),
              new ChoiceOption({
                label: 'Denticon'
              }),
              new ChoiceOption({
                label: 'Eaglesoft'
              }),
              new ChoiceOption({
                label: 'OpenDental'
              })
            ]
          }),
          new QuestionModel({
            id: 'aligners',
            question: 'Do you offer clear aligners to your patients?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Yes'
              }),
              new ChoiceOption({
                label: 'No'
              })
            ],
            jump: {
              No: 'scanner'
            }
          }),
          new QuestionModel({
            id: 'aligner_brands',
            question: 'What brands do you offer?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            allowOther: true,
            options: [
              new ChoiceOption({
                label: 'Invisalign'
              }),
              new ChoiceOption({
                label: 'ClearCorrect'
              })
            ]
          }),
          new QuestionModel({
            id: 'num_aligners',
            question: 'How many clear aligner cases does your practice sell per year?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: '0-10'
              }),
              new ChoiceOption({
                label: '10-25'
              }),
              new ChoiceOption({
                label: '25+'
              })
            ]
          }),
          new QuestionModel({
            id: 'scanner',
            question: 'Do you have an intra-oral scanner?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Yes'
              }),
              new ChoiceOption({
                label: 'No'
              })
            ],
            jump: {
              No: '_submit'
            }
          }),
          new QuestionModel({
            id: 'scanner_type',
            question: 'What kind of scanner do you have?',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            allowOther: true,
            options: [
              new ChoiceOption({
                label: 'Carestream'
              }),
              new ChoiceOption({
                label: 'Cerec Primescan'
              }),
              new ChoiceOption({
                label: 'Dental Wings'
              }),
              new ChoiceOption({
                label: 'iTero'
              }),
              new ChoiceOption({
                label: 'Medit'
              }),
              new ChoiceOption({
                label: 'Trios'
              })
            ]
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
      onKeyListener: function(e) {
        if (!this.$refs.survey.onLastStep) {
          return
        }

        if (e.key === 'Enter' || e.key === 'Tab') {
          this.submitData()
        }
      },
      getData() {
        let data = {
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
      },
      submitData() {
        this.sent = true
      }
    }
  }
</script>

<style lang="css">
  @import './assets/css/normalize.css';
  @import './assets/css/font.css';
  @import './assets/css/common.css';
  @import './assets/css/branding.css';
  @import './assets/css/animations.css';
</style>