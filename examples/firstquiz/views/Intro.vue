<template>

<div>
<h4> Welcome to the Gig Retirement Calculator </h4>
<h6> Fill out the 9 step questionnaire to calculate your 2020 profit after taxes. </h6>
<h6> Then, the calculator will identify a personalized retirement account suggestion to maximize your tax savings! </h6>
<h6> Note: Your information is safe with us 😊. We will never sell your data. </h6>

<button type="button" class="btn btn-primary btn-lg" style="background-color: #F07F62">
<router-link to="/input">GET STARTED!</router-link></button>

</div>
</template>

<script>
export default {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
