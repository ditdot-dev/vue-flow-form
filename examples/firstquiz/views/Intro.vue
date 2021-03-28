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
    </div>
    <div class="arrow">
      <img
        class="down_arrow_img"
        src="../../../src/assets/images/down_arrow.png"
      />
    </div>
    <div class="first_question">
      <h5>About You</h5>
      <p>
        What is your tax filling state?
        <img class="info" src="../../../src/assets/images/info.png" />
      </p>
      <select
        v-bind:style="selected === 'placeholder' && 'font-weight:unset'"
        class="first_select"
        v-model="selected"
        @change="handleValueChange"
      >
        <option class="select_place_holder" value="placeholder" disabled hidden>
          Select State
        </option>
        <option
          v-for="(option, i) in options"
          v-bind:key="i"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>

      <router-link
        v-if="selected != 'placeholder'"
        class="link"
        to="/input"
        aria-label="start input page"
        ><button type="button" class="next_button">Next</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";

export default {
  data() {
    return {
      selected: "placeholder",
      options: [
        { text: "Alabama", value: "al" },
        { text: "Alaska", value: "ak" },
        { text: "Arizona", value: "az" },
        { text: "Arkansas", value: "ar" },
        { text: "California", value: "ca" },
        { text: "Colorado", value: "co" },
        { text: "Conneticut", value: "ct" },
        { text: "Delaware", value: "de" },
        { text: "District of Columbia", value: "dc" },
        { text: "Florida", value: "fl" },
        { text: "Georgia", value: "ga" },
        { text: "Hawaii", value: "hi" },
        { text: "Idaho", value: "id" },
        { text: "Illinois", value: "il" },
        { text: "Indiana", value: "ct" },
        { text: "Delaware", value: "in" },
        { text: "Iowa", value: "ia" },
        { text: "Kansas", value: "ks" },
        { text: "Kentucky", value: "ky" },
        { text: "Louisiana", value: "la" },
        { text: "Maine", value: "me" },
        { text: "Maryland", value: "md" },
        { text: "Massachusetts", value: "ma" },
        { text: "Michigan", value: "mi" },
        { text: "Minnesota", value: "mn" },
        { text: "Mississippi", value: "ms" },
        { text: "Missouri", value: "mo" },
        { text: "Montana", value: "mt" },
        { text: "Nebraska", value: "ne" },
        { text: "Nevada", value: "nv" },
        { text: "New Hampshire", value: "nh" },
        { text: "New Jersey", value: "nj" },
        { text: "New Mexico", value: "nm" },
        { text: "New York", value: "ny" },
        { text: "North Carolina", value: "nc" },
        { text: "North Dakota", value: "nd" },
        { text: "Ohio", value: "oh" },
        { text: "Oklahoma", value: "ok" },
        { text: "Oregon", value: "or" },
      ],
    };
  },
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username;
    },
    ...Vuex.mapState("userInformation", {
      userInput: (state) => state.userInput,
    }),
  },
  created() {
    if (this.userInput.tax_filing_state) {
      this.selected = this.userInput.tax_filing_state;
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    handleValueChange(e) {
      console.log(e.target.value);
      this.$store.commit("userInformation/addUserInputKey", {
        value: e.target.value,
        key: "tax_filing_state",
      });
    },
  },
};
</script>
<style scoped src="../css/intro.css"></style>
