<template>
<div class="main">
  <div class="content flex2">
    <p class="heading">
      Welcome to the Gig <br />
      Retirement Calculator
    </p>
    <p class="para">
      Fill out the 10 step questionnaire to calculate <br />
      your 2020 profit after taxes. <br />
      <br />

      Then, we will make a personalized<br />
      retirement account suggestion <br />
      to maximize your tax savings💰! <br />
      <br>
      <strong>Note:</strong> Your information is safe with us 😊. We <br />
      will never sell your data.
    </p>
    <br /><br />
    <router-link to="/input"><button>GET STARTED!</button></router-link>
  </div>
  <div class="image">
    <div class="img"></div>
  </div>
</div>
</template>

<script>
import "../../../src/assets/css/intro.css";
export default {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username;
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
};
</script>

<style></style>
