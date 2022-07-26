<template>
  <div class="f-radios-wrap">
    <ul class="f-radios" v-bind:class="{'f-numbers': question.max}" role="listbox">
      <li
        v-for="(option, index) in question.options"
        v-on:click.prevent="toggleAnswer(option)"
        v-bind:class="{'f-selected': option.selected}"
        v-bind:key="'m' + index"
        v-bind:aria-label="getLabel(index)"
        role="option"
      >
        <div class="f-label-wrap">
          <span class="f-key">{{ getToggleKey(index) }}</span>
          <span v-if="option.choiceLabel()" class="f-label">{{ option.choiceLabel() }}</span>
        </div>
      </li> 
    </ul>
  </div>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import BaseType from './BaseType.vue'
  import { ChoiceOption, QuestionType } from '../../models/QuestionModel'

  export default {
    extends: BaseType,
    name: QuestionType.OpinionScale,

    data() {
      return {
        isNumberScale: false
      }
    },

    beforeMount() {
      if (this.question.max && !this.question.options.length) {
        const 
          min = this.question.min || 1,
          max = this.question.max 
        for (let i = min; i <= max; i++) {
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

      /**
       * Listens for keyboard events (A, B, C, ...)
       */
      onKeyListener($event) {
        if (this.active && $event.key && $event.key.length === 1) {
          let keyCode = $event.key.toUpperCase().charCodeAt(0)

          if (keyCode >= 65 && keyCode <= 90) {
            let index = keyCode - 65

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

      getToggleKey(index) {
        const key = 65 + index

        if (key <= 90) {
          return String.fromCharCode(key)
        }

        return ''
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
           console.log(option, optionValue)

        option.toggle()

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
</script>
