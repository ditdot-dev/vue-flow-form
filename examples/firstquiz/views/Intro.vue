<template>
    <div class="main">
      <div class="content flex2">
        <p class="heading">
          Welcome to the Gig <br />
          Retirement Calculator
        </p>
        <p class="para">
          Fill out the 9 step questionnaire to calculate <br />
          your 2020 profit after taxes. <br />
          <br />

          Then, the calculator will identify a<br />
          personalized retirement account suggestion <br />
          to maximize your tax savings! <br />
          <br />

          Note: Your information is safe with us 😊. We <br />
          will never sell your data.
        </p>
        <router-link to="/input"
          ><button><p>GET STARTED!</p></button></router-link
        >
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
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style></style>
