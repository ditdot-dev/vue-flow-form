<template>
  <span v-bind:data-placeholder="inputType === 'date' ? placeholder : null">
    <the-mask
      v-if="question.mask"
      ref="input"
      v-bind:mask="question.mask"
      v-bind:masked="false"
      v-bind:type="inputType"
      v-bind:value="value"
      v-bind:required="question.required"
      v-on:keydown.native="onKeyDown"
      v-on:keyup.native="onChange"
      v-on:focus.native="setFocus"
      v-on:blur.native="unsetFocus"
      v-on:keyup.native.enter.prevent="onEnter"
      v-on:keyup.native.tab.prevent="onEnter"
      v-bind:placeholder="placeholder"
      v-bind:min="question.min"
      v-bind:max="question.max"
      v-on:change="onChange"
    />
    <input
      v-else
      ref="input"
      v-bind:type="inputType"
      v-bind:value="value"
      v-bind:required="question.required"
      v-on:keydown="onKeyDown"
      v-on:keyup="onChange"
      v-on:keyup.enter.prevent="onEnter"
      v-on:keyup.tab.prevent="onEnter"
      v-on:focus="setFocus"
      v-on:blur="unsetFocus"
      v-bind:min="question.min"
      v-bind:max="question.max"
      v-on:change="onChange"
      v-bind:placeholder="placeholder"
    />
  </span>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import BaseType from './BaseType.vue'
  import { QuestionType } from '../../models/QuestionModel'
  import TheMask from 'vue-the-mask/src/component'

  export default {
    extends: BaseType,
    name: QuestionType.Text,
    components: {
      TheMask
    },

    data() {
      return {
        inputType: 'text', 
        canReceiveFocus: true
      }
    }, 

    methods: {
      validate() {
        if (this.question.mask && this.hasValue) {
          return this.validateMask()
        }

        return !this.question.required || this.hasValue
      },

      validateMask() {
        if (Array.isArray(this.question.mask)) {
          return this.question.mask.some(mask => mask.length === this.dataValue.length)
        }

        return this.dataValue.length === this.question.mask.length
      }
    }
  }
</script>