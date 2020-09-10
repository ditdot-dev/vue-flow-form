/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Language data store

export default class LanguageModel {
  constructor(options) {
    this.ok = 'OK'
    this.continue = 'Continue'
    this.pressEnter = 'Press ENTER'
    this.multipleChoiceHelpText = 'Choose as many as you like'
    this.otherPrompt = 'Other'
    this.placeholder = 'Type your answer here...'
    this.submitText = 'Submit'
    this.longTextHelpText = 'SHIFT + ENTER to make a line break.'
    this.prev = 'Prev'
    this.next = 'Next'
    this.percentCompleted = ':percent% completed'
    this.invalidPrompt = 'Please fill out the field correctly'
    this.thankYouText = 'Thank you!'
    this.ariaOk = 'Press to continue'
    this.ariaRequired = 'This step is required'
    this.ariaPrev = 'Previous step'
    this.ariaNext = 'Next step'
    this.ariaSubmitText = 'Press to submit'
    this.ariaMultipleChoice = 'Press :letter to select'
    this.ariaTypeAnswer = 'Type your answer here'

    Object.assign(this, options || {})
  }
}