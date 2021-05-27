<script>
  import { ComponentInstance } from '../mixins/ComponentInstance'

  export default {
    name: 'Question',

    mixins: [
      ComponentInstance
    ],

    props: {
      id: null,
      modelValue: [String, Array, Boolean, Number, Object]
    },
    
    data() {
      return {
        question: null
      }
    },

    mounted() {
      this.setInstance()
    },

    render() {
      return null
    },

    watch: {
      'question.answer'(val) {
        this.$emit('update:modelValue', val)
      }
    }
  }
</script>