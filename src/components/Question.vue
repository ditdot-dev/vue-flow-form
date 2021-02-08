<script>
  export default {
    name: 'Question',
    
    data() {
      return {
        question: null
      }
    },

    render() {
      return null
    },

    watch: {
      'question.answer'(val) {
        this.$emit('input', val)
      }
    }
  }
</script>