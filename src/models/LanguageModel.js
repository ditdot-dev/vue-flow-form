/*!
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Language data store

export default class LanguageModel {
  constructor(options) {
    this.enterKey = 'Enter'
    this.shiftKey = 'Shift'
    this.ok = 'OK'
    this.continue = 'Continue'
    this.skip = 'Skip'
    this.pressEnter = 'Press :enterKey'
    this.multipleChoiceHelpText = 'Choose as many as you like'
    this.multipleChoiceHelpTextSingle = 'Choose only one answer'
    this.otherPrompt = 'Other'
    this.placeholder = 'Type your answer here...'
    this.submitText = 'Submit'
    this.longTextHelpText = ':shiftKey + :enterKey to make a line break.'
    this.prev = 'Prev'
    this.next = 'Next'
    this.percentCompleted = ':percent% completed'
    this.invalidPrompt = 'Please fill out the field correctly'
    this.thankYouText = 'Thank you!'
    this.successText = 'Your submission has been sent.'
    this.ariaOk = 'Press to continue'
    this.ariaRequired = 'This step is required'
    this.ariaPrev = 'Previous step'
    this.ariaNext = 'Next step'
    this.ariaSubmitText = 'Press to submit'
    this.ariaMultipleChoice = 'Press :letter to select'
    this.ariaTypeAnswer = 'Type your answer here'
    this.errorAllowedFileTypes = 'Invalid file type. Allowed file types: :fileTypes.'
    this.errorMaxFileSize = 'File(s) too large. Maximum allowed file size: :size.'
    this.errorMinFiles = 'Too few files added. Minimum allowed files: :min.'
    this.errorMaxFiles = 'Too many files added. Maximum allowed files: :max.'

    Object.assign(this, options || {})
  }

  /**
   * Inserts a new CSS class into the language model string to format the :string
   * Use it in a component's v-html directive: v-html="language.formatString(language.languageString)"
   */
  formatString(string, replacements) {
    return string.replace(/:(\w+)/g, (match, word) => {
      if (this[word]) {
        return '<span class="f-string-em">' + this[word] + '</span>'
      } else if (replacements && replacements[word]) {
        return replacements[word]
      }
      
      return match
    })
  }

  formatFileSize(bytes) {
    const
      units = ['B', 'kB', 'MB', 'GB', 'TB'],
      i = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(1024)) : 0
      
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + units[i];
  }
}


