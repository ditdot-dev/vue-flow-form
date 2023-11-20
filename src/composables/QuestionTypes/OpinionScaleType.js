/*
Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
https://github.com/ditdot-dev/vue-flow-form
https://www.ditdot.hr/en
*/

import BaseType from '../../components/QuestionTypes/BaseType.vue'
import { ChoiceOption, QuestionType } from '../../models/QuestionModel'
import { IsMobile } from '../../mixins/IsMobile'

export default {
  extends: BaseType,
  name: QuestionType.OpinionScale,

  data() {
    return {
      isIconScale: false,
      hoveredIndex: null,
      activeIndex: null
    }
  },

  mixins: [
    IsMobile
  ],

  beforeMount() {
    const 
      size = this.question.max || 5,
      numOptions = Math.min(Math.max(size, 1), 10)
  
    if (!this.question.options.length) {
      for (let i = 1; i <= numOptions; i++) {
        this.question.options.push(new ChoiceOption({value: i.toString()}))
      }
    }
  },

  mounted() {
    this.addKeyListener()
  },

  beforeUnmount() {
    this.removeKeyListener()
  },

  watch: {
    active(value) {
      if (value) {
        this.addKeyListener()
      } else {
        this.removeKeyListener()
      }
    }
  },
  
  methods: {
    addKeyListener() {
      this.removeKeyListener()
      document.addEventListener('keyup', this.onKeyListener)
    },

    removeKeyListener() {
      document.removeEventListener('keyup', this.onKeyListener)
    },

    onMouseover(index) {
      this.hoveredIndex = index
    },

    onMouseleave() {
      this.hoveredIndex = null
    },

    /**
     * Listens for keyboard events (1, 2, 3, ...)
     */
    onKeyListener($event) {
      if (this.active && $event.key && $event.key.length === 1) {
        let keyCode = $event.key.toUpperCase().charCodeAt(0)
    
        if (keyCode >= 48 && keyCode <= 57) {
          let index = keyCode - 49

          if (index > -1) {
            let option = this.question.options[index]

            if (option) {
              this.toggleAnswer(option)
            } 
          }
        }
      }
    },

    getLabel(index) {
      return this.language.ariaMultipleChoice.replace(':letter', this.getToggleKey(index))
    },

    getToggleKey(num) {
      return num
    },

    toggleAnswer(option) {
      for (let i = 0; i < this.question.options.length; i++) {
        let o = this.question.options[i]

        if (o.selected) {
          this._toggleAnswer(o)
        }
      }

      this._toggleAnswer(option)
    },

    _toggleAnswer(option) {
      const optionValue = option.choiceValue() 

      option.toggle()

      this.activeIndex = option.selected ? this.question.options.indexOf(option) : null
      this.dataValue = option.selected ? optionValue : null

      if (this.isValid() && this.question.nextStepOnAnswer  && !this.disabled) {
        this.$emit('next')
      }

      this.setAnswer(this.dataValue)
    },

    _removeAnswer(value) {
      const index = this.dataValue.indexOf(value)

      if (index !== -1) {
        this.dataValue.splice(index, 1)
      }
    },

    iconScaleClasses(index) {
      const classes = {}

      if (this.isIconScale) {
        if (!this.isMobile) {
          classes['f-hovered'] = this.hoveredIndex && index < this.hoveredIndex
        }

        classes['f-previous'] = this.activeIndex && index < this.activeIndex
      }

      return classes
    }
  },

  computed: {
    hasValue() {
      if (this.question.options.filter(o => o.selected).length) {
        return true
      }

      return false
    }
  }
}