<template>
  <div class="f-radios-wrap">
    <ul class="f-radios" v-bind:class="{'f-multiple': question.multiple}" role="listbox">
      <li
        v-for="(option, index) in question.options"
        v-on:click.prevent="toggleAnswer(option)"
        v-bind:class="{'f-selected': option.selected}"
        v-bind:key="'m' + index"
        v-bind:aria-label="getLabel(index)"
        role="option"
      >
        <span class="f-image" v-if="hasImages && option.imageSrc">
          <img v-bind:src="option.imageSrc" v-bind:alt="option.imageAlt">
        </span>
        <div class="f-label-wrap">
          <span class="f-key">{{ getToggleKey(index) }}</span>
          <span v-if="option.choiceLabel()" class="f-label">{{ option.choiceLabel() }}</span>
        </div>
      </li>
      <li
        class="f-other"
        v-if="!hasImages && question.allowOther"
        v-on:click.prevent="startEditOther"
        v-bind:class="{'f-selected': question.other, 'f-focus': editingOther}"
        v-bind:aria-label="language.ariaTypeAnswer"
        role="option"
      >
        <div class="f-label-wrap">
          <span class="f-key" v-if="!editingOther">{{ getToggleKey(question.options.length) }}</span>
          <input
            v-if="editingOther"
            v-model="question.other"
            type="text"
            ref="otherInput"
            v-on:blur="stopEditOther"
            v-on:keyup.enter.prevent="stopEditOther"
            v-on:keyup="onChangeOther"
            v-on:change="onChangeOther"
            maxlength="256"
          />
          <span v-else-if="question.other" class="f-selected">
            <span class="f-label">{{ question.other }}</span>
          </span>
          <span v-else class="f-label">{{ language.otherPrompt }}</span>
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
  import { QuestionType } from '../../models/QuestionModel'

  export default {
    extends: BaseType,
    name: QuestionType.MultipleChoice,

    data() {
      return {
        editingOther: false,
        hasImages: false
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

          if (this.question.multiple && this.question.answered) {
            this.enterPressed = false
          }
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
        if (this.active && !this.editingOther && $event.key && $event.key.length === 1) {
          let keyCode = $event.key.toUpperCase().charCodeAt(0)

          if (keyCode >= 65 && keyCode <= 90) {
            let index = keyCode - 65

            if (index > -1) {
              let option = this.question.options[index]

              if (option) {
                this.toggleAnswer(option)
              } else if (this.question.allowOther && index === this.question.options.length) {
                this.startEditOther()
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
        if (!this.question.multiple) {
          if (this.question.allowOther) {
            this.question.other = this.dataValue = null
            this.setAnswer(this.dataValue)
          }

          for (let i = 0; i < this.question.options.length; i++) {
            let o = this.question.options[i]

            if (o.selected) {
              this._toggleAnswer(o)
            }
          }
        }

        this._toggleAnswer(option)
      },

      _toggleAnswer(option) {
        const optionValue = option.choiceValue()

        option.toggle()

        if (this.question.multiple) {
          this.enterPressed = false

          if (!option.selected) {
            this._removeAnswer(optionValue)
          } else if (this.dataValue.indexOf(optionValue) === -1) {
            this.dataValue.push(optionValue)
          }
        } else {
          this.dataValue = option.selected ? optionValue : null
        }

      
        if (this.isValid() && this.question.nextStepOnAnswer && !this.question.multiple && !this.disabled) {
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

      startEditOther() {
        this.editingOther = true
        this.enterPressed = false

        this.$nextTick(() => {
          this.$refs.otherInput.focus()
        })
      },

      onChangeOther() {
        if (this.editingOther) {
          let
            value = [],
            self = this

          this.question.options.forEach(function(option) {
            if (option.selected) {
              if (self.question.multiple) {
                value.push(option.choiceValue())
              } else {
                option.toggle()
              }
            }
          })

          if (this.question.other && this.question.multiple) {
            value.push(this.question.other)
          } else if (!this.question.multiple) {
            value = this.question.other
          }

          this.dataValue = value
          this.setAnswer(this.dataValue)
        }
      },
      
      stopEditOther() {
        this.editingOther = false
      }
    },

    computed: {
      hasValue() {
        if (this.question.options.filter(o => o.selected).length) {
          return true
        }

        if (this.question.allowOther) {
          return this.question.other && this.question.other.trim().length > 0
        }

        return false
      }
    }
  }
</script>
