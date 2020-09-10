/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Global data store

export const QuestionType = {
  Dropdown: 'FlowFormDropdownType',
  Email: 'FlowFormEmailType',
  LongText: 'FlowFormLongTextType',
  MultipleChoice: 'FlowFormMultipleChoiceType',
  Number: 'FlowFormNumberType',
  Password: 'FlowFormPasswordType',
  Phone: 'FlowFormPhoneType',
  SectionBreak: 'FlowFormSectionBreakType',
  Text: 'FlowFormTextType',
  Url: 'FlowFormUrlType'
}

export const DropdownOptionBlank = {
  label: '',
  value: '',
  disabled: true
}

export class ChoiceOption {
  constructor(options) {
    this.label = ''
    this.value = ''
    this.selected = false

    Object.assign(this, options)
  }

  choiceLabel() {
    return this.label || this.value
  }

  choiceValue() {
    return this.value || this.label
  }

  toggle() {
    this.selected = !this.selected
  }
}

export default class QuestionModel {
  constructor(options) {
    this.id = null
    this.answer = ''
    this.answered = false
    this.index = 0
    this.options = []
    this.description = ''
    this.className = ''
    this.type = null
    this.html = null
    this.required = false
    this.jump = null
    this.placeholder = null
    this.mask = ''
    this.multiple = false
    this.allowOther = false
    this.other = null
    this.language = null
    this.tagline = null
    this.title = null
    this.subtitle = null
    this.content = null
    this.inline = false
    this.helpText = null

    Object.assign(this, options)

    // Sets default mask and placeholder value on PhoneType question
    if (this.type === QuestionType.Phone) {
      if (!this.mask) {
        this.mask = '(###) ###-####'
      }
      if (!this.placeholder) {
        this.placeholder = this.mask
      }
    }
    if (this.multiple) {
      this.answer = []
    }
  }

  getFormattedAnswer() {
    return this.answer
  }

  getJumpId() {
    let nextId = null

    if (typeof this.jump === 'function') {
      nextId = this.jump.call(this)
    } else if (this.jump[this.answer]) {
      nextId = this.jump[this.answer]
    } else if (this.jump['_other']) {
      nextId = this.jump['_other']
    }

    return nextId
  }

  setIndex(index) {
    if (!this.id) {
      this.id = 'q_' + index
    }

    this.index = index
  }
}