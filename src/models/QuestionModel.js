/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Global data store

export const QuestionType = Object.freeze({
  Date: 'FlowFormDateType',
  Dropdown: 'FlowFormDropdownType',
  Email: 'FlowFormEmailType',
  File: 'FlowFormFileType',
  LongText: 'FlowFormLongTextType',
  MultipleChoice: 'FlowFormMultipleChoiceType',
  MultiplePictureChoice: 'FlowFormMultiplePictureChoiceType',
  Number: 'FlowFormNumberType',
  Password: 'FlowFormPasswordType',
  Phone: 'FlowFormPhoneType',
  SectionBreak: 'FlowFormSectionBreakType',
  Text: 'FlowFormTextType',
  Url: 'FlowFormUrlType',
  Matrix: 'FlowFormMatrixType',
  OpinionScale: 'FlowFormOpinionScaleType',
  IconRate: 'FlowFormIconRateType',
})

export const DropdownOptionBlank = Object.freeze({
  label: '',
  value: '',
  disabled: true
})

export const MaskPresets = Object.freeze({
  Date: '##/##/####',
  DateIso: '####-##-##',
  PhoneUs: '(###) ###-####'
})

export class ChoiceOption {
  constructor(options) {
    this.label = ''
    this.value = null
    this.selected = false
    this.imageSrc = null
    this.imageAlt = null

    Object.assign(this, options)
  }

  choiceLabel() {
    return this.label || this.value
  }

  choiceValue() {
    // Returns the value if it's anything other than the default (null).
    if (this.value !== null) {
      return this.value
    }

    // Returns any other non-empty property if the value has not been set.
    return this.label || this.imageAlt || this.imageSrc
  }

  toggle() {
    this.selected = !this.selected
  }
}

export class LinkOption {
  constructor(options) {
    this.url = ''
    this.text = ''
    this.target = '_blank'

    Object.assign(this, options)
  }
}

export class MatrixColumn {
  constructor(options) {
    this.value = ''
    this.label = ''

    Object.assign(this, options)
  }
}

export class MatrixRow {
  constructor(options) {
    this.id = ''
    this.label = ''

    Object.assign(this, options)
  }
}

export default class QuestionModel {
  constructor(options) {
    // Make sure the options variable is an object
    options = options || {}

    this.id = null
    this.answer = null
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
    this.helpTextShow = true
    this.descriptionLink = []
    this.min = null
    this.max = null
    this.maxLength = null
    this.nextStepOnAnswer = false
    this.accept = null
    this.maxSize = null
    this.rows = []
    this.columns = []
    this.labelLeft = null
    this.labelRight = null

    Object.assign(this, options)

    // Sets default mask and placeholder value on PhoneType question
    if (this.type === QuestionType.Phone) {
      if (!this.mask) {
        this.mask = MaskPresets.Phone
      }
      if (!this.placeholder) {
        this.placeholder = this.mask
      }
    }

    if (this.type === QuestionType.Url) {
      this.mask = null
    }

    if (this.type === QuestionType.Date && !this.placeholder) {
      this.placeholder = 'yyyy-mm-dd'
    }

    if (this.type !== QuestionType.Matrix && this.multiple && !Array.isArray(this.answer)) {
      this.answer = this.answer ? [this.answer] : []
    }

    // Check if we have an answer already (when we have a pre-filled form)
    // and set the answered property accordingly
    if (!this.required && typeof options.answer !== 'undefined') {
      this.answered = true
    } else if (this.answer && (!this.multiple || this.answer.length)) {
      this.answered = true
    }

    this.resetOptions()
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

  setAnswer(answer) {
    if (this.type === QuestionType.Number && answer !== '' && !isNaN(+answer)) {
      answer = +answer
    }

    this.answer = answer
  }

  setIndex(index) {
    if (!this.id) {
      this.id = 'q_' + index
    }

    this.index = index
  }

  resetOptions() {
    if (this.options) {
      const isArray = Array.isArray(this.answer)
      let numSelected = 0

      this.options.forEach(o => {
        const optionValue = o.choiceValue()

        if (this.answer === optionValue || (isArray && this.answer.indexOf(optionValue) !== -1)) {
          o.selected = true
          ++numSelected
        } else {
          o.selected = false
        }
      })

      if (this.allowOther) {
        let otherAnswer = null

        if (isArray) {
          if (this.answer.length && this.answer.length !== numSelected) {
            otherAnswer = this.answer[this.answer.length - 1]
          }
        } else if (this.options.map(o => o.choiceValue()).indexOf(this.answer) === -1) {
          otherAnswer = this.answer
        }

        if (otherAnswer !== null) {
          this.other = otherAnswer
        }
      }
    }
  }

  resetAnswer() {
    this.answered = false
    this.answer = this.multiple ? [] : null
    this.other = null

    this.resetOptions()
  }

  isMultipleChoiceType() {
    return [QuestionType.MultipleChoice, QuestionType.MultiplePictureChoice].includes(this.type)
  }
}
