/*
Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
https://github.com/ditdot-dev/vue-flow-form
https://www.ditdot.hr/en
*/

import BaseType from '../../components/QuestionTypes/BaseType.vue'
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
      var mask = null;
      if (Array.isArray(this.question.mask)) 
        mask = this.question.mask;
      else{
        mask = this.question.mask.split("");
      }

      var input = this.dataValue;
      var tokens = this.tokens.Build();

      for (let i = 0; i < mask.length; i++) {
        var token = tokens[mask[i]]

        if(token == undefined)
          continue;

        var optional = token.optional

        if(optional == true)
          continue;

        var inputChar = input[i];

        if(inputChar == undefined)
          inputChar = " "
        
        var pattern = token.pattern;

        if(!pattern.test(inputChar))
          return false;

      }

      return true
    }
  }
}