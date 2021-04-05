<template>
  <div
    :class="`box1 boxwrapper relative ${bestOptionActive && 'active-color'}`"
  >
    <h2 class="p-0 bestOptionLabel p-1" v-if="bestOptionActive">BEST OPTION</h2>
    <div class="col1 best-option-container relative">
      <h4 class="absolute top-60" v-if="isHeading">Account Types</h4>
      <div class="col flex2">
        <h1 class="mt-5" v-html="name"></h1>
      </div>
    </div>
    <div class="col2 col flex2 justify-content-start mt-3 relative">
      <h4 class="absolute top-75" v-if="isHeading">At a Glance</h4>
      <p :class="`${isDisabled && 'disabled-color'}`" v-html="description"></p>
    </div>
    <div class="col3 col flex2 justify-content-between relative">
      <info-icon
        :tooltip="{
          description: `${tooltipText}`,
        }"
        class="absolute top-60"
        classes="d-flex align-items-end"
        :dynamic="true"
        tooltipType="description"
        v-if="isHeading"
      >
        <h4 class="d-flex align-items-end">Contributions</h4>
      </info-icon>
      <template v-if="isPersonal">
        <h4 :class="`${isDisabled && 'disabled-color'}`">Your Contribution</h4>
        <h2 :class="`${isDisabled && 'disabled-color'}`">
          {{ sliderPersonal | currency("$", 0) }} ({{
            sliderPercentage(sliderPersonal)
          }}%)
        </h2>
        <div class="colBox">
          <vue-custom-slider
            @handleDrag="handleDrag"
            @CustomHandleChange="handlePersonalSlider"
            :value="sliderPersonal"
            ref="sliderPersonal"
            :max="sliderMaxPersonal"
            :disabled="isDisabled"
          />
        </div>
      </template>
      <template v-if="isBusiness">
        <h4 :class="`${isDisabled && 'disabled-color'}`">
          Your Business Contribution
        </h4>
        <info-icon :tooltip="tooltipMain" :dynamic="true">
          <h2 :class="`${isDisabled && 'disabled-color'}`">
            {{ sliderBusiness | currency("$", 0) }} ({{
              sliderPercentage(sliderBusiness)
            }}%)
          </h2>
        </info-icon>
        <div class="colBox2 colBox">
          <vue-custom-slider
            @handleDrag="handleDrag"
            @CustomHandleChange="handleBusinessSlider"
            :value="sliderBusiness"
            :max="sliderMaxBusiness"
            :disabled="isDisabled"
          />
        </div>
      </template>
      <p :class="`${isDisabled && 'disabled-color'}`">
        By your age 67, these <br />
        contributions could be <br />
        worth
        {{ sliderCompound(sliderPersonal + sliderBusiness) | currency("$", 0) }}
      </p>
    </div>

    <div class="col4 col flex2 justify-content-between relative">
      <h4 class="absolute top-60" v-if="isHeading">Impact on your taxes</h4>
      <h4 :class="`${isDisabled && 'disabled-color'}`">Tax Avoided</h4>
      <info-icon
        :tooltip="tooltip.taxAvoided"
        :dynamic="true"
        tooltipType="points"
      >
        <h2 :class="`${isDisabled && 'disabled-color'}`">
          {{ taxAvoided | currency("$", 0) }}
        </h2>
      </info-icon>

      <p :class="`${isDisabled && 'disabled-color'} p-0 m-0`">
        By your age 67, the amount <br />
        you are missing out on could<br />
        be worth
        {{ sliderCompound(taxAvoided) | currency("$", 0) }}
      </p>
      <h4 :class="`${isDisabled && 'disabled-color'}`">Tax Advantage Ratio</h4>
      <info-icon
        :tooltip="tooltip.taxAdvantageRatio"
        tooltipType="description"
        :dynamic="true"
      >
        <h2 :class="`${isDisabled && 'disabled-color'}`">
          {{ taxAdvantageRatio }}%
        </h2>
      </info-icon>
    </div>
    <div :class="`col5 col `">
      <div v-if="isDisabled">
        <div :class="`labelbox flex ${isDisabled && 'disabled-back-color'}`">
          <h4>Get Started</h4>
        </div>
        <span class="labelbox-down">
          You are not eligible due to too many employees in your business.
        </span>
      </div>
      <a
        href="https://www.learn.gigfinance.org/blog/how-to-get-started-with-an-individual-401-k/"
        target="_blank"
        rel="noopener noreferrer"
        v-else
        @click="addInFirebase(firebaseName)"
      >
        <div :class="`labelbox flex ${isDisabled && 'disabled-color'}`">
          <h4>Get Started</h4>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import Vue2Filters from "vue2-filters";
import vueCustomSlider from "../components/vue-slider";
import infoIcon from "../components/info-icon";
import { body } from "../data/mailchimp";
import TingleModal from "../components/tingle-modal.vue";
import { roundOff } from "../../util";
import { setSliderMax } from "../../../src/taxData/SMETaxCalculations";
import { repostData } from "../../../src/api/TaxApi";
import Loading from "vue-loading-overlay";
import { usdFormat } from "../../util/usd-format";
export default {
  components: {
    vueCustomSlider,
    infoIcon,
    TingleModal,
    Loading,
  },

  props: {
    bestOptionActive: {
      type: Boolean,
    },
    name: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
    },
    description: {
      type: String,
    },
    tooltipText: {
      type: String,
    },
    sliderPersonal: {
      type: Number,
      default: 0,
    },
    sliderBusiness: {
      type: Number,
      default: 0,
    },
    handleDrag: {
      type: Function,
    },
    sliderMaxPersonal: {
      type: Number,
    },
    sliderMaxBusiness: {
      type: Number,
    },
    tooltipMain: {
      type: Object,
    },
    tooltip: {
      type: Object,
    },
    taxAvoided: {
      type: String,
    },
    taxAdvantageRatio: {
      type: Number,
    },
    addInFirebase: {
      type: Function,
    },
    firebaseName: {
      type: String,
    },
    heading: {
      type: String,
    },
    isPersonal: {
      type: Boolean,
      default: true,
    },
    isBusiness: {
      type: Boolean,
      default: true,
    },
    isHeading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    sliderCompound(amount) {
      let ageUntilRetirement = 67 - parseInt(this.age);
      let interestRate = 1 + parseFloat(0.08);
      let compoundInterest = Math.pow(interestRate, ageUntilRetirement);
      const number = parseInt(amount * compoundInterest);
      return number == Infinity ? 0 : number;
    },
    sliderPercentage(amount) {
      const number = (amount / roundOff(this.profitAfterTaxes / 100)).toFixed(
        1
      );
      return number == Infinity ? 0 : number;
    },
    handleBusinessSlider(e) {
      this.$emit("emitBusinessSlider", e);
    },
    handlePersonalSlider(e) {
      this.$emit("emitPersonalSlider", e);
    },
  },
  computed: {
    ...Vuex.mapState("userInformation", {
      profitAfterTaxes: (state) => state.taxSummary.profitAfterTaxes,
      profitAfterExpenses: (state) => state.taxSummary.profitAfterExpenses,
      totalIncome: (state) => state.taxSummary.totalIncome,
      taxBalance: (state) => state.taxUpdate.taxBalance,
      age: (state) => state.userInput.age,
      userInput: (state) => state.userInput,
      taxUpdate: (state) => state.taxUpdate,
    }),
  },
};
</script>

<style scoped src="../css/retire-options.css"></style>
