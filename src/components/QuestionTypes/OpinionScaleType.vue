<template>
  <div class="f-radios-wrap">
    <ul class="f-radios" role="listbox">
      <li
        v-for="(option, index) in question.options"
        v-on:click.prevent="toggleAnswer(option)"
        v-on:mouseover="isIconScale && onMouseover(index)"
        v-on:mouseleave="isIconScale && onMouseleave()"
        v-bind:class="{'f-selected': option.selected, ...iconScaleClasses(index)}"
        v-bind:key="'m' + index"
        v-bind:aria-label="getLabel(option.value)"
        role="option"
      >
        <div v-if="!isIconScale" class="f-label-wrap">
          <span v-if="option.choiceLabel()" class="f-label">{{ option.choiceLabel() }}</span>
        </div>
        <div v-else class="f-icon-wrap">
          <div class="f-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" stroke-width=".5"/>
            </svg>
          </div>
          <div class="f-key">{{ getToggleKey(option.value) }}</div>
        </div>
      </li> 
    </ul>
    <div v-if="!isIconScale && (question.labelLeft || question.labelRight)" class="f-label-scale-wrap">
      <span v-if="question.labelLeft" class="f-label-scale">
        <span class="f-label-scale-num">1 - </span>
        {{ question.labelLeft }}
      </span>
      <span v-if="question.labelRight" class="f-label-scale">
        <span class="f-label-scale-num">{{ question.options.length }} - </span>
        {{ question.labelRight }}
      </span>
    </div>
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
</script>
