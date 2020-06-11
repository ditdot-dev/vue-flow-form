export default class LanguageModel {
	constructor(options) {
		this.ok                = 'OK'
		this.continue          = 'Continue'
		this.pressEnter        = 'Press ENTER'
		this.multiplePrompt    = 'Choose as many as you like'
		this.otherPrompt       = 'Other'
		this.placeholder       = 'Type your answer here...'
		this.submitText        = 'Submit'
		this.longTextLineBreak = 'SHIFT + ENTER to make a line break.'
		this.prev              = 'Prev'
		this.next              = 'Next'
		this.percentCompleted  = ':percent% completed'
		this.invalidPrompt     = 'Please fill out the field correctly'
		this.thankYouText      = 'Thank you! 😊'

		Object.assign(this, options || {})
	}
}