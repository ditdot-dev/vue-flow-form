import MultipleChoiceType from '../components/QuestionTypes/MultipleChoiceType'
import TextType from '../components/QuestionTypes/TextType'
import PhoneType from '../components/QuestionTypes/PhoneType'
import EmailType from '../components/QuestionTypes/EmailType'
import LongTextType from '../components/QuestionTypes/LongTextType'
import UrlType from '../components/QuestionTypes/UrlType'
import SectionBreakType from '../components/QuestionTypes/SectionBreakType'
import NumberType from '../components/QuestionTypes/NumberType'
import DropdownType from '../components/QuestionTypes/DropdownType'

export const QuestionType = {
  Dropdown: DropdownType.name,
  MultipleChoice: MultipleChoiceType.name,
  Text: TextType.name,
  LongText: LongTextType.name,
  Email: EmailType.name,
  Phone: PhoneType.name,
  Url: UrlType.name,
  Number: NumberType.name,
  SectionBreak: SectionBreakType.name
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
    this.question = ''
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
    this.config = {}
    this.mask = ''
    this.multiple = false
    this.allowOther = false
    this.other = null
    this.language = null
    this.title = null
    this.subtitle = null
    this.content = null
    this.inline = false

    Object.assign(this, options)

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
      nextId = this.jump.call(this, question)
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