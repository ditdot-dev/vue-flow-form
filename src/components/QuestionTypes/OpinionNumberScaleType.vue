<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import OpinionScaleType from './OpinionScaleType.vue'
  import { ChoiceOption, QuestionType } from '../../models/QuestionModel'

  export default {
    extends: OpinionScaleType,
    name: QuestionType.OpinionNumberScale,

    data() {
      return {
        isNumberScale: true
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

    methods: {

      /**
       * Listens for keyboard events (1, 2, 3, ...)
       */
      onKeyListener($event) {
        if (this.active && $event.key && $event.key.length === 1) {
          let keyCode = $event.key.toUpperCase().charCodeAt(0)
          console.log(keyCode)
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

      getToggleKey(num) {
        return num
      },
    },
  }
</script>