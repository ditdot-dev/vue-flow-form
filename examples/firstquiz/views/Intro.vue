<template>
  <div>
    <div class="intro_main">
      <div class="intro_content_left">
        <h1 class="intro_header">Welcome to the Gig Retirement Calculator</h1>
        <div class="para">
          <p>
            Fill out the questionnaire to calculate your 2020 profit after
            taxes.
          </p>
          <p>
            We will make a personalized retirement account suggestion to
            maximize your tax savings 💰!
          </p>
          <p>
            You'll need your last year's tax returns, and estimate how much you
            made and spent this tax year.
          </p>
          <h5>Let’s get started~</h5>
        </div>
      </div>
      <div class="intro_content_right">
        <img class="right_img" src="../../../src/assets/images/wallet.svg" />
      </div>
      <!-- <router-link to="/input" aria-label="start input page"
      ><button>GET STARTED</button></router-link
    > -->
    </div>
    <div class="arrow">
      <img class="down_arrow_img" src="../../../src/assets/images/down_arrow.png" />
    </div>
    <div>
      
    </div>
  </div>
</template>

<script>
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
<style scoped src="../css/intro.css"></style>
