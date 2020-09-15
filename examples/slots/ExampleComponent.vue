<template>
  <div class="form-outer">
    <p class="question-title">What is 2+2?</p>
    <input type="number" v-model="num" placeholder="Enter the solution" :class="{ invalid: showError }" @input="validateNumber()" />
    <p v-if="showError" class="error">Invalid answer</p>
  </div>
</template>

<script>
export default {
  name: 'ExampleComponent',
  data () {
    return {
      num: 0,
      showError: false
    }
  },
  methods: {
    isValid () {
      // if something is invalid on your component ->
      // show the user a error message and return false
      return this.validateNumber()
    },
    validateNumber () {
      if (parseInt(this.num) === 4) {
        this.showError = false
        return true
      } else {
        this.showError = true
        return false
      }
    }
  }
}
</script>

<style scoped>
.form-outer, input {
  background: white;
  padding: 1rem;
  border-radius: 0.25rem !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.question-title {
  font-size: 1.5rem;
  margin: 0;
}
input {
  border: 1px solid lightgray !important;
  padding: 0.25rem 0.5rem !important;
}
input.invalid {
  color: rgb(189, 0, 0) !important;
}
.error {
  color: rgb(189, 0, 0) !important;
  font-size: 0.75rem;
  margin: 5px 0 0 0;
}
</style>
