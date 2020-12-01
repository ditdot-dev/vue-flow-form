<template>
  <div class="r-container">
    <div class="main">
      <div class="row1 flex" style="cursor: pointer">
        <router-link to="/results" aria-label="return to results">
          <svg
            width="32px"
            height="20px"
            viewBox="0 0 27 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.54169 16L13.5 1.41666L25.4583 16"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </router-link>
      </div>

      <div class="row2 flex">
        <div class="heading">
          <h2>
            Your Contribution <br />
            With Profit After Taxes
          </h2>
        </div>

        <div class="adder-subtractor">
          <div class="box">
            <div
              class="sub flex"
              @click="percent ? percent-- : null"
              style="cursor: pointer"
            >
              <h1>-</h1>
            </div>
            <div class="flex">
              <p class="percent">{{ percent }}%</p>
            </div>
            <div class="add flex" @click="percent++" style="cursor: pointer">
              <h1>+</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row3 flex">
        <div class="heading2">
          <h2 class="mt-3">Projected 2020 <br />Contributions</h2>
        </div>
        <div class="slider">
          <div style="position: relative" class="up-drag">
            <h2></h2>
            <vue-slider
              v-model="projectedValue"
              :interval="100"
              :marks="true"
              :min="0"
              :max="getRoundofValue"
              height="60px"
              :tooltip="'none'"
            >
              <template v-slot:step="{ active, value }">
                <div
                  :class="['vue-slider-mark-label', 'custom-label', { active }]"
                >
                  {{
                    projectedValue === value &&
                    !(roundOff(profitAfterTaxes, 100) === projectedValue)
                      ? `${value}`
                      : "" | currency("$", 0)
                  }}
                </div>
              </template>
              <template v-slot:dot> <span class="custom-dot" /> </template
            ></vue-slider>
            <span
              class="custom-label"
              style="
                font-size: 14px;
                position: absolute;
                right: -40px;
                bottom: -22px;
              "
            >
              ${{ profitAfterTaxes | currency("", 0) }}
            </span>
          </div>
          <div class="max">
            <h2></h2>
          </div>
          <div class="cursor"></div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="wrapper">
        <div class="head ml-5 mb-5">
          <h1>Retirement Account Options</h1>
        </div>

        <div class="boxes">
          <div
            :class="`box1 boxwrapper relative ${
              bestOptionActive.individual401k && 'active-color'
            }`"
          >
            <h2
              class="p-0 bestOptionLabel p-1"
              v-if="bestOptionActive.individual401k"
            >
              BEST OPTION
            </h2>
            <div class="col1 best-option-container relative">
              <h4 class="absolute top-60">Account Types</h4>
              <div class="mt-5 mb-4">
                <h1>
                  Individual <br />
                  401K
                </h1>
                <p>
                  Over 80% of incorporated <br />
                  freelancers use this option. <br />
                  <br />
                  Based on your information, <br />
                  we suggest you open an <br />
                  Individual 401(K)
                </p>
              </div>
            </div>
            <div class="col2 col flex2 justify-content-start mt-3 relative">
              <h4 class="absolute top-75">At a Glance</h4>
              <p>
                Individual 401(K) allows for <br />
                more retirement contribution <br />
                as a employee and employer. <br />
                You can save up to $57,000/yr, <br />
                and wth your spouse, this can <br />
                be even as high as $114,000/yr. <br />
                <br />
                Best for those looking to <br />
                maximize retirement <br />
                contribution and are <br />
                comfortable with some <br />
                paperwork.
              </p>
            </div>
            <div class="col3 col flex2 justify-content-between relative">
              <info-icon
                tooltip="business"
                class="absolute top-60"
                classes="d-flex align-items-end"
              >
                <h4 class="d-flex align-items-end">Contributions</h4>
              </info-icon>
              <h4>Your Contribution</h4>
              <h2>
                {{ sliders.individual401kPersonal | currency("$", 0) }} ({{
                  sliderPercentage(sliders.individual401kPersonal)
                }}%)
              </h2>
              <div class="colBox">
                <vue-custom-slider
                  @handleDrag="handleIndividualDrag"
                  v-model="sliders.individual401kPersonal"
                  ref="sliders.individual401kPersonal"
                  :max="sliderMax.individual401kPersonal"
                />
              </div>
              <h4>Your Business Contribution</h4>
              <info-icon tooltip="business">
                <h2>
                  {{ sliders.individual401kBusiness | currency("$", 0) }} ({{
                    sliderPercentage(sliders.individual401kBusiness)
                  }}%)
                </h2>
              </info-icon>
              <div class="colBox2 colBox">
                <vue-custom-slider
                  @handleDrag="handleIndividualDrag"
                  v-model="sliders.individual401kBusiness"
                  :max="sliderMax.individual401kBusiness"
                />
              </div>
              <p>
                At your age 67, these <br />
                contributions could be <br />
                worth
                {{
                  sliderCompound(
                    sliders.individual401kPersonal +
                      sliders.individual401kBusiness
                  ) | currency("$", 0)
                }}
              </p>
            </div>

            <div class="col4 col flex2 justify-content-between relative">
              <h4 class="absolute top-60">Impact on your taxes</h4>
              <h4>Tax Avoided</h4>
              <info-icon tooltip="business">
                <h2>{{ printTaxBalance.individual401k | currency("$", 0) }}</h2>
              </info-icon>

              <p class="p-0 m-0">
                At your age 67, the amount <br />
                you are losing could be <br />
                worth $49,140
              </p>
              <h4>Tax Advantage Ratio</h4>
              <info-icon tooltip="business">
                <h2>{{ taxAdvantageRatio.individual401k }}%</h2>
              </info-icon>
            </div>
            <div class="col5 col">
              <a
                href="https://www.learn.gigfinance.org/blog/2020-07-how-to-get-started-with-an-individual-401-k/"
              >
                <div class="labelbox flex">
                  <h4>How to Open an <br />Individual 401k <br />Account</h4>
                </div>
              </a>
            </div>
          </div>

          <div
            :class="`box2 boxwrapper relative ${
              bestOptionActive.sepIra && 'active-color'
            }`"
          >
            <h2 class="p-0 bestOptionLabel p-1" v-if="bestOptionActive.sepIra">
              BEST OPTION
            </h2>
            <div class="col1 col flex2">
              <h1>SEP-IRA</h1>
              <p>
                X% of people your age <br />
                has this account
              </p>
            </div>
            <div class="col2 col flex2 justify-content-between mt-3">
              <p>
                A SEP-IRA is an ideal plan if <br />
                you are earning over <br />
                $24,000/yr, and you intend to <br />
                save more than $6,000/yr for <br />
                retirement. You can <br />
                contribute a maximum of <br />
                $56,000/yr <br />
                <br />
                Best for simplicity in setup <br />
                and if you have 2 jobs, one as <br />
                a freelancer and another as a <br />
                full-time employee.
              </p>
            </div>
            <div class="col3 col flex2 mb-5 justify-content-between m-0 py-0">
              <h4>Your Business Contribution</h4>
              <info-icon tooltip="business">
                <h2 class="mb-0 pb-0">
                  {{ sliders.sepIraBusiness | currency("$", 0) }} ({{
                    sliderPercentage(sliders.sepIraBusiness)
                  }}%)
                </h2>
              </info-icon>
              <div class="colBox">
                <vue-custom-slider
                  @handleDrag="handleSepIraDrag"
                  v-model="sliders.sepIraBusiness"
                  :max="sliderMax.sepIraBusiness"
                />
              </div>

              <p>
                At your age 67, these <br />
                contributions could be <br />
                worth
                {{ sliderCompound(sliders.sepIraBusiness) | currency("$", 0) }}
              </p>
            </div>

            <div class="col4 col flex2 justify-content-between">
              <h4>Tax Avoided</h4>
              <info-icon tooltip="business">
                <h2>{{ printTaxBalance.sepIra | currency("$", 0) }}</h2>
              </info-icon>

              <p class="p-0 m-0">
                At your age 67, the amount <br />
                you are losing could be <br />
                worth $49,140
              </p>
              <h4>Tax Advantage Ratio</h4>
              <info-icon tooltip="business">
                <h2>{{ taxAdvantageRatio.sepIra }}%</h2>
              </info-icon>
            </div>
            <div class="col5 col">
              <a
                href="https://www.learn.gigfinance.org/blog/2020-07-how-to-get-started-with-an-individual-401-k/"
              >
                <div class="labelbox flex">
                  <h4>How to Open a <br />SEP-IRA<br />Account</h4>
                </div>
              </a>
            </div>
          </div>

          <div
            :class="`box3 boxwrapper relative ${
              bestOptionActive.simpleIra && 'active-color'
            }`"
          >
            <h2
              class="p-0 bestOptionLabel p-1"
              v-if="bestOptionActive.simpleIra"
            >
              BEST OPTION
            </h2>
            <div class="col1 col flex2">
              <h1>SIMPLE-IRA</h1>
              <p>
                This is suitable for <br />
                those who have <br />
                employees and want to<br />
                offer retirement <br />
                benefits to their<br />
                employees <br />
                <br />
                Over 65% of users have <br />
                this as their first <br />
                retirement account
              </p>
            </div>
            <div class="col2 col flex2 justify-content-start mt-3">
              <p>
                The SIMPLE-IRA allows for <br />
                retirement contribution as a <br />
                employee and employer. <br />
                Employers can contribute up to <br />
                3% of employee’s <br />
                compensation, and employees <br />
                can defer up to $13,500/yr <br />
                from their salary <br />
                <br />
                Best for those looking to offer <br />
                retirement benefits for <br />
                employees with minimal <br />
                administration & fees
              </p>
            </div>
            <div class="col3 col flex2 justify-content-between">
              <h4>Your Contribution</h4>
              <h2>
                {{ sliders.simpleIraPersonal | currency("$", 0) }} ({{
                  sliderPercentage(sliders.simpleIraPersonal)
                }}%)
              </h2>
              <div class="colBox">
                <vue-custom-slider
                  v-model="sliders.simpleIraPersonal"
                  :max="sliderMax.simpleIraPersonal"
                  @handleDrag="handleSimpleIra"
                />
              </div>
              <h4>Your Business Contribution</h4>
              <info-icon tooltip="business">
                <h2>
                  {{ sliders.simpleIraBusiness | currency("$", 0) }} ({{
                    sliderPercentage(sliders.simpleIraBusiness)
                  }}%)
                </h2>
              </info-icon>
              <div class="colBox">
                <vue-custom-slider
                  v-model="sliders.simpleIraBusiness"
                  :max="sliderMax.simpleIraBusiness"
                  @handleDrag="handleSimpleIra"
                />
              </div>
              <p>
                At your age 67, these <br />
                contributions could be <br />
                worth
                {{
                  sliderCompound(
                    sliders.simpleIraPersonal + sliders.simpleIraBusiness
                  ) | currency("$", 0)
                }}
              </p>
            </div>

            <div class="col4 col flex2 justify-content-between">
              <h4>Tax Avoided</h4>
              <info-icon tooltip="business">
                <h2>{{ printTaxBalance.simpleIra | currency("$", 0) }}</h2>
              </info-icon>

              <p class="p-0 m-0">
                At your age 67, the amount <br />
                you are losing could be <br />
                worth $xxxxx
              </p>
              <h4>Tax Advantage Ratio</h4>
              <info-icon tooltip="business">
                <h2>{{ taxAdvantageRatio.simpleIra }}%</h2>
              </info-icon>
            </div>
            <div class="col5 col">
              <a
                href="https://www.learn.gigfinance.org/blog/2020-07-how-to-get-started-with-an-individual-401-k/"
              >
                <div class="labelbox flex">
                  <h4>How to Open a <br />SIMPLE-IRA<br />Account</h4>
                </div>
              </a>
            </div>
          </div>

          <div
            :class="`box4 boxwrapper relative ${
              bestOptionActive.traditionalIra && 'active-color'
            }`"
          >
            <h2
              class="p-0 bestOptionLabel p-1"
              v-if="bestOptionActive.traditionalIra"
            >
              BEST OPTION
            </h2>
            <div class="col1 col flex2">
              <h1>
                Traditional<br />
                IRA
              </h1>
            </div>
            <div class="col2 col flex2 justify-content-between mt-3">
              <p>
                This is the most common <br />
                type of retirement account <br />
                opened by individuals. You <br />
                can contribute provided you <br />
                have any type of earned <br />
                income for the year You may <br />
                contribute up to $6,000/yr <br />
                <br />
                Best for those who have <br />
                outstanding debt, but want <br />
                to start saving for <br />
                retirement.
              </p>
            </div>
            <div class="col3 col flex2 mb-5 justify-content-between">
              <h4>Your Contribution</h4>
              <h2>
                {{ sliders.traditionalIraPersonal | currency("$", 0) }} ({{
                  sliderPercentage(sliders.traditionalIraPersonal)
                }}%)
              </h2>
              <div class="colBox">
                <vue-custom-slider
                  v-model="sliders.traditionalIraPersonal"
                  :max="sliderMax.traditionalIraPersonal"
                  @handleDrag="handleTraditionalIra"
                />
              </div>
              <p>
                At your age 67, these <br />
                contributions could be <br />
                worth
                {{
                  sliderCompound(sliders.traditionalIraPersonal)
                    | currency("$", 0)
                }}
              </p>
            </div>

            <div class="col4 f flex2 justify-content-between">
              <h4>Tax Avoided</h4>
              <info-icon tooltip="business">
                <h2>{{ printTaxBalance.traditionalIra | currency("$", 0) }}</h2>
              </info-icon>

              <p class="p-0 m-0">
                At your age 67, the amount <br />
                you are losing could be <br />
                worth $xxxxx
              </p>
              <h4>Tax Advantage Ratio</h4>
              <info-icon tooltip="business">
                <h2>{{ taxAdvantageRatio.traditionalIra }}%</h2>
              </info-icon>
            </div>
            <div class="col5 col">
              <a
                href="https://learn.gigfinance.org/blog/2020-11-how-to-get-started-with-a-traditional-ira/"
              >
                <div class="labelbox flex">
                  <h4>How to Open an <br />Traditional IRA <br />Account</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footerContent">
        <div class="roww1 flex">
          <div class="premiumBox">
            <div class="column1">
              <div class="premiumHeading">
                <div class="premiumLabel">
                  <p class="m-0 p-0 ribbon-premium p-1">PREMIUM</p>
                </div>
              </div>
              <div class="image flex w-100">
                <div class="img"></div>
              </div>
            </div>

            <div class="column2 flex2">
              <h1>MULTIPLE ACCOUNTS</h1>
              <h2>
                How do I balance my retirement contribution to multiple
                accounts?
              </h2>
              <p>
                We can help you calculate your overall tax avoided amount and
                optimize contributions to different accounts.
              </p>
              <button
                style="align: flex; border-radius: 46px"
                @click="handleSignup"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div class="roww2 flex">
          <div class="irsBox">
            <div class="irsContent flex2">
              <h1>How This Calculator Works</h1>
              <p>
                Based on your inputs, we followed the retirement contribution
                rules for your business type and retirement account to determine
                the total allowable deductions that can be made from your
                business. These deductions have different impact on your taxes.
                The retirement account option recommend is based on your
                information, and the highest potential for tax avoided available
                to you.
              </p>
            </div>
            <div class="irsImage flex">
              <div class="img2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tingle-modal
      v-model="isModalOpen"
      heading="Get Early Access"
      :content="body"
      buttonText="Yes Signup"
      :submit="onFormSubmit"
    />
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
export default {
  name: "RetirementOptions",
  components: {
    vueCustomSlider,
    infoIcon,
    TingleModal,
  },
  data() {
    return {
      roundOff,
      body,
      isModalOpen: false,
      percent: 10,
      printTaxBalance: {
        individual401k: "",
        sepIra: "",
        simpleIra: "",
        traditionalIra: "",
      },
      taxAdvantageRatio: {
        individual401k: "",
        sepIra: "",
        simpleIra: "",
        traditionalIra: "",
      },
      bestOptionActive: {
        individual401k: true,
        sepIra: false,
        simpleIra: false,
        traditionalIra: false,
      },
      sliderMax: {
        individual401kPersonal: 90,
        individual401kBusiness: 10,
        sepIraBusiness: 20,
        simpleIraPersonal: 10,
        simpleIraBusiness: 40,
        traditionalIraPersonal: 60,
      },
      sliders: {
        individual401kPersonal: 90,
        individual401kBusiness: 9,
        sepIraBusiness: 8,
        simpleIraPersonal: 10,
        simpleIraBusiness: 40,
        traditionalIraPersonal: 60,
      },
      projectedValue: 1000,
    };
  },
  mounted() {
    this.projectedValue = roundOff((this.profitAfterTaxes / 100) * 10, 100);
    const {
      personalMax_individual401k = 19500,
      businessMax_individual401k = 37500,
      businessMax_sepIra = 57000,
      personalMax_simpleIra = 13500,
      businessMax_simpleIra = 28500,
      personalMax_traditionalIra = 6000,
    } = setSliderMax();

    this.sliderMax.individual401kPersonal = roundOff(
      personalMax_individual401k
    );
    this.sliderMax.individual401kBusiness = roundOff(
      businessMax_individual401k
    );
    this.sliderMax.sepIraBusiness = roundOff(businessMax_sepIra);
    this.sliderMax.simpleIraPersonal = roundOff(personalMax_simpleIra);
    this.sliderMax.simpleIraBusiness = roundOff(businessMax_simpleIra);
    this.sliderMax.traditionalIraPersonal = roundOff(
      personalMax_traditionalIra
    );
  },
  methods: {
    handleSignup() {
      this.isModalOpen = true;
    },
    onFormSubmit() {
      document.getElementById("mc-embedded-subscribe").click();
    },
    sliderPercentage(amount) {
      const number = (amount / roundOff(this.profitAfterTaxes / 100)).toFixed(
        1
      );
      return number == Infinity ? 0 : number;
    },
    sliderCompound(amount) {
      let ageUntilRetirement = 67 - parseInt(28);
      let interestRate = 1 + parseFloat(0.08);
      let compoundInterest = Math.pow(interestRate, ageUntilRetirement);
      const number = parseInt(amount * compoundInterest);
      return number == Infinity ? 0 : number;
    },
    async handleIndividualDrag() {
      let res;
      res = await repostData(
        this.sliders.individual401kPersonal,
        this.sliders.individual401kBusiness
      );
      const { taxBalance } = res || {};
      this.printTaxBalance.individual401k = (
        this.taxBalance - taxBalance
      ).toFixed(2);
      this.taxAdvantageRatio.individual401k = Math.round(
        (this.printTaxBalance.individual401k /
          (this.sliders.individual401kPersonal +
            this.sliders.individual401kBusiness)) *
          100
      );
    },
    async handleSepIraDrag() {
      let res = await repostData("", this.sliders.sepIraBusiness);
      this.printTaxBalance.sepIra = (this.taxBalance - res?.taxBalance).toFixed(
        2
      );
      this.taxAdvantageRatio.sepIra = Math.round(
        (this.printTaxBalance.sepIra / this.sliders.sepIraBusiness) * 100
      );
    },
    async handleSimpleIra() {
      let res = await repostData(
        this.sliders.simpleIraPersonal,
        this.sliders.simpleIraBusiness
      );
      this.printTaxBalance.simpleIra = (
        this.taxBalance - res?.taxBalance
      ).toFixed(2);
      this.taxAdvantageRatio.simpleIra = Math.round(
        (this.printTaxBalance.simpleIra /
          (this.sliders.simpleIraPersonal + this.sliders.simpleIraBusiness)) *
          100
      );
    },
    async handleTraditionalIra() {
      let res = await repostData(this.sliders.traditionalIraPersonal, "");
      this.printTaxBalance.traditionalIra = (
        this.taxBalance - res?.taxBalance
      ).toFixed(2);
      this.taxAdvantageRatio.traditionalIra = Math.round(
        (this.printTaxBalance.traditionalIra /
          this.sliders.traditionalIraPersonal) *
          100
      );
    },
    largestNumber({ individual401k, sepIra, simpleIra, traditionalIra }) {
      const largest = Math.max(
        Number(individual401k),
        Number(sepIra),
        Number(simpleIra),
        Number(traditionalIra)
      );

      if (individual401k == largest) {
        return "individual401k";
      }
      if (sepIra == largest) {
        return "sepIra";
      }
      if (simpleIra == largest) {
        return "simpleIra";
      }
      if (traditionalIra == largest) {
        return "traditionalIra";
      }
    },
  },
  computed: {
    roundedProjectedValue: {
      get() {
        return this.roundOff(this.projectedValue % 10, 100);
      },
      set(val) {
        this.projectedValue = val;
      },
    },
    ...Vuex.mapState("userInformation", {
      profitAfterTaxes: (state) => state.taxSummary.profitAfterTaxes,
      totalIncome: (state) => state.taxSummary.totalIncome,
      taxBalance: (state) => state.taxUpdate.taxBalance,
      age: (state) => state.userInput.age,
    }),
    getRoundofValue() {
      return roundOff(this.profitAfterTaxes, 100);
    },
  },
  watch: {
    // sliders(val) {
    //   console.log(val);
    // },
    percent(val) {
      this.projectedValue = roundOff((this.profitAfterTaxes / 100) * val, 100);
    },
    projectedValue(val) {
      const formattedValue = val / roundOff(this.profitAfterTaxes / 100);
      this.percent =
        formattedValue == Infinity ? 0 : Math.round(formattedValue);
      const {
        individual401kBusiness,
        simpleIraBusiness,
        traditionalIraPersonal,
        sepIraBusiness,
      } = this.sliderMax;
      if (val > individual401kBusiness) {
        this.sliders.individual401kPersonal = roundOff(
          val - individual401kBusiness
        );
        this.sliders.individual401kBusiness = roundOff(individual401kBusiness);
      } else {
        this.sliders.individual401kBusiness = val;
      }
      if (val > simpleIraBusiness) {
        this.sliders.simpleIraPersonal = roundOff(val - simpleIraBusiness);
        this.sliders.simpleIraBusiness = roundOff(simpleIraBusiness);
      } else {
        this.sliders.simpleIraBusiness = roundOff(val);
      }
      if (val > traditionalIraPersonal) {
        this.sliders.traditionalIraPersonal = traditionalIraPersonal;
      } else {
        this.sliders.traditionalIraPersonal = val;
      }
      if (val > sepIraBusiness) {
        this.sliders.sepIraBusiness = sepIraBusiness;
      } else {
        this.sliders.sepIraBusiness = val;
      }
      this.handleIndividualDrag();
      this.handleSepIraDrag();
      this.handleSimpleIra();
      this.handleTraditionalIra();
    },
    printTaxBalance: {
      handler(val) {
        const find = this.largestNumber({ ...val });
        this.bestOptionActive = {};
        this.bestOptionActive[find] = true;
      },
      deep: true,
    },
  },
};
</script>



<style >
.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.top-60 {
  top: -60px;
}

.top-75 {
  top: -75px;
}

:root {
  --heading-font: "Manrope", sans-serif;
  --heading2-font: "Karla", sans-serif;
  --heading4-font: "Karla", sans-serif;
  --para-font: "Manrope", sans-serif;
  --normal-font: 400;
  --bold-font: 700;
}

.r-container .vue-slider-marks {
  background: #f3fcf7;
  /* border-radius: 10px; */
}

.r-container .vue-slider-mark-step {
  background-color: transparent;
}

.r-container .vue-slider-rail {
  border-radius: 0px;
}

.r-container .vue-slider-process {
  border-radius: 0px;
  background-color: #00d49f;
}

.r-container .vue-slider-mark-label {
  opacity: 0;
}

.custom-dot {
  position: absolute;
  left: 10.02%;
  right: 85.64%;
  top: -30px;
  bottom: 0%;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 16px;
  height: 70px;
  /* left: 60px; */
}

.custom-inner-dot {
  position: absolute;
  left: 50.02%;
  right: 85.64%;
  top: -12px;
  bottom: 0%;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 8px;
  height: 35px;
  /* left: 60px; */
}

.r-container .vue-slider-marks {
  background: #f3fcf7;
  /* border-radius: 10px; */
}

.r-container .vue-slider-mark-step {
  background-color: transparent;
}

.r-container .vue-slider-rail {
  border-radius: 0px;
  background: #f3fcf7;
}

.r-container .vue-slider-process {
  border-radius: 0px;
  background-color: #00d49f;
}

.r-container .vue-slider-mark-label {
  opacity: 0;
}

.custom-label {
  opacity: 1 !important;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 140%;
  /* or 36px */
  display: flex;
  align-items: center;
  color: #000000;
  margin: 0px;
  font-family: var(--heading2-font);
}

.r-container .h1,
.h2,
.h3,
.h4,
.h5,
.h6,
.r-container h1,
.r-container h2,
.r-container h3,
.r-container h4,
.r-container h5,
.r-container h6 {
  font-weight: 700;
}
</style>

<style scoped>
.up-drag {
  width: 230px;
}

* {
  padding: 0;
  margin: 0;
  border: 0;
}

:root {
  --heading-font: "Manrope", sans-serif;
  --heading2-font: "Karla", sans-serif;
  --heading4-font: "Karla", sans-serif;
  --para-font: "Manrope", sans-serif;
  --normal-font: 400;
  --bold-font: 700;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.d-flex-right {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.flex2 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: column;
}

.r-container {
  display: grid;
  background-color: white;
  grid-template-rows: 7vh 50vh minmax(170vh, min-content) minmax(
      70vh,
      min-content
    );
  grid-template-columns: 100vw;
  overflow: hidden;
  grid-template-areas:
    "menu"
    "main"
    "content"
    "footer";
}

.menu {
  grid-area: menu;
  background-color: black;
  display: grid;
  grid-template-columns: 0.2fr 4fr 8fr 2fr 0.5fr;
  grid-template-areas: ". title . logo .";
}

.title {
  grid-area: title;
  /* background-color: wheat; */
}

.title p {
  font-family: var(--para-font);
  font-size: 30px;
  font-weight: var(--semi-bold-font);
  color: white;
  line-height: 20px;
}

.logo {
  grid-area: logo;
  /* background-color: wheat; */
}

.logo p {
  font-family: var(--para-font);
  font-size: 18px;
  color: white;
  font-weight: var(--normal-font);
}

.main {
  grid-area: main;
  /* background-color: burlywood; */
  display: grid;
  grid-template-rows: 10% minmax(45%, min-content) minmax(45%, min-content);
  grid-template-areas:
    "row1"
    "row2"
    "row3";
}

.row1 {
  grid-area: row1;
  /* background-color: lightpink; */
  font-size: 40px;
}

.row2 {
  grid-area: row2;
  display: grid;
  grid-template-columns: 40vw 60vw;
  grid-template-areas: "heading adder";
  /* background-color: lightgreen; */
}

.heading {
  height: 100%;
  grid-area: heading;
  /* background-color: azure; */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-family: var(--heading-font);
  word-spacing: 1px;
  padding-right: 10px;
}

.heading h2 {
  font-family: var(--heading2-font);
  font-size: 26px;
}

.adder-subtractor {
  height: 100%;
  grid-area: adder;
  /* background-color: beige; */
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-left: 20px;
}

.adder-subtractor .box {
  height: 50px;
  width: 210px;
  /* background-color: white; */
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-areas: "sub percent add";
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);

  /* border: 1px solid rgba(211, 211, 211, 0.212); */
}

.adder-subtractor .box h1 {
  font-size: 30px;
}

.sub {
  height: 100%;
  background-color: #00d49f;

  /* border-right: 1px solid black; */
}

p.percent {
  font-size: 20px;

  margin: 0px;
  font-family: var(--para-font);
  font-weight: var(--bold-font);
  /* line-height: 65px; */
}

.add {
  height: 100%;
  background-color: #00d49f;
}

.row3 {
  grid-area: row3;
  /* background-color: antiquewhite; */
  display: grid;
  grid-template-columns: 40vw 60vw;
  grid-template-areas: "heading2 slider";
}

.heading2 {
  grid-area: heading2;
  /* background-color: silver; */
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: var(--heading-font);
  word-spacing: 1px;
  padding-right: 75px;
}

.heading2 h2 {
  font-family: var(--heading2-font);
  font-size: 26px;
}

.slider {
  /* grid-area: slider; */
  /* background-color: hotpink; */
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.slider .box {
  height: 35%;
  width: 40%;
  /* background-color: white; */
  display: grid;
  grid-template-columns: 0% 85%;
}

.box h2 {
  position: relative;
  top: 90%;
  font-size: 20px;
  font-family: var(--heading2-font);
  line-height: 36px;
}

.cursor {
  height: 45%;
  width: 12px;
  /* background-color: white; */
  position: relative;
  left: -34%;
}

.max {
  position: relative;
  top: 33px;
  display: flex;
  justify-content: flex-end;
  /* align-items: flex-end; */
}

.max h2 {
  position: absolute;
  top: 100%;
  right: 50px;
  margin: 0px;
  font-size: 20px;
  font-family: var(--heading2-font);
  line-height: 36px;
}

.content {
  grid-area: content;
  /* background-color: lightpink; */
  display: grid;
  padding-top: 50px;
  grid-template-columns: 2vw 96vw 2vw;
  grid-template-areas: ". wrapper . ";
}

.wrapper {
  grid-area: wrapper;
  /* background-color: aqua; */
  display: grid;
  grid-template-rows: 10vh minmax(5vh, min-content) minmax(170vh, min-content);
  grid-template-areas:
    "head"
    "item"
    "boxes";
}

.head {
  grid-area: head;
  /* background-color: azure; */
}

.head h1 {
  font-family: var(--heading-font);
  font-size: 26px;
  /* padding-left: 5rem; */
}

.item {
  grid-area: item;
  /* background-color: bisque; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr; */
  /* grid-template-areas: "one two three four ."; */
}

.item h4 {
  font-size: 20px;
  font-family: var(--heading4-font);
}

.boxes {
  grid-area: boxes;
  /* background-color: red; */
}

.boxwrapper {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: grid;
  /* grid-template-rows: minmax(50vh, min-content); */
  grid-template-columns: repeat(auto-fit, minmax(15rem, 0.5fr));
  border-radius: 30px;
  margin-bottom: 1%;
  grid-column-gap: 1rem;
  justify-content: center;
  grid-row-gap: 1rem;
  padding: 1rem;
}

.active-color {
  background-color: #f0f0f0 !important;
}

.box1 {
  background-color: white;
}

.box1 .col1 p {
  color: #00b488;
}

.box2 .col1 p {
  color: #bdbdbd;
}

.box3 .col1 p {
  color: #bdbdbd;
}

.best-option-container {
  position: relative;
  float: left;
}

.bestOptionLabel {
  /* padding: 5px; */
  width: 8em;
  display: flex;
  justify-content: center;
  font-size: 26px;
  font-family: var(--heading2-font);
  position: relative;
  font-weight: var(--bold-font);
  top: 15px;
  position: absolute;
  left: -5px;
  background-color: #00d49f;
  box-shadow: -2px 3px 4px rgba(0, 0, 0, 0.3);
}

.bestOptionLabel:before,
.bestOptionLabel:after {
  content: "";
  position: absolute;
}

.bestOptionLabel:before {
  width: 7px;
  height: 100%;
  top: 0;
  /* bottom: 1px; */
  left: -6.5px;
  padding: 0 0 7px;
  background: inherit;
  border-radius: 5px 0 0 5px;
}

/* .bestOptionLabel:after {
  width: 5px;
  height: 5px;
  bottom: 0px;
  left: -4.5px;
  background: #0cf0b791;
  border-radius: 5px 0 0 5px;
} */
/* .bestOptionLabel h2 {
  font-size: 26px;
  font-family: var(--heading2-font);
  position: relative;
  font-weight: var(--bold-font);
  top: 5px;
} */
.boxwrapper .col1 {
  padding-left: 30px;
  /* background-color: orchid; */
}

.boxwrapper .col2 {
  padding-left: 30px;
  /* background-color: lightblue; */
}

.boxwrapper .col3 {
  padding-left: 30px;
  /* background-color: lightgreen; */
}

.boxwrapper .col4 {
  padding-left: 30px;
  /* background-color: lightsalmon; */
}

.boxwrapper .col5 {
  padding-left: 30px;
  /* background-color: lightseagreen; */
}

.boxwrapper .col1 {
  /* grid-area: col1; */
  padding-left: 30px;
}

.box2 .col1 {
  padding-bottom: 30%;
}

.box2 .col3 {
  padding-bottom: 25%;
}

.box2 .col4 {
  padding-bottom: 15%;
}

.box3 .col4 {
  padding-bottom: 15%;
}

.box1 .col4 {
  padding-bottom: 15%;
}

.box4 .col4 {
  padding-bottom: 15%;
}

.box4 .col1 {
  padding-bottom: 35%;
}

.box4 .col4 {
  /* padding-bottom: 25%; */
}

.r-container .boxwrapper h1 {
  padding-bottom: 30px;
  font-size: 29px;
  font-family: var(--heading-font);
  font-weight: var(--bold-font);
  line-height: 39px;
}

.r-container .boxwrapper h2 {
  padding-bottom: 10px;
  font-weight: var(--bold-font);
  font-family: var(--heading2-font);
  font-size: 26px;
  line-height: 26px;
}

.r-container .boxwrapper h4 {
  padding-top: 10px;
  font-family: var(--heading4-font);
  font-weight: var(--bold-font);
  font-size: 20px;
  line-height: 24px;
}

.r-container .boxwrapper p {
  padding-bottom: 30px;
  font-family: var(--para-font);
  font-weight: var(--normal-font);
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.2px;
}

.colBox {
  height: 30px;
  margin-bottom: 15px;
  width: 180px;
  /* margin-bottom: 10px; */
}

.box1 .colBox1 {
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-areas: "greeen whitee";
}

.box1 .colBox2 {
  display: grid;
  grid-template-columns: 95% 5%;
  grid-template-areas: "greeen whitee";
}

.box2 .colBox {
  display: grid;
  grid-template-columns: 85% 15%;
  grid-template-areas: "greeen whitee";
}

.box3 .colBox1 {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "greeen whitee";
}

.box3 .colBox2 {
  display: grid;
  grid-template-columns: 95% 5%;
  grid-template-areas: "greeen whitee";
}

.box4 .colBox {
  display: grid;
  grid-template-columns: 95% 5%;
  grid-template-areas: "greeen whitee";
}

.greeen {
  grid-area: greeen;
  background-color: #00d49f;
}

.whitee {
  grid-area: whitee;
  background-color: #f3fcf7;
}

.line {
  height: 60%;
  width: 1px;
  background-color: black;
  margin-right: 30%;
}

/* .boxwrapper .col5{
  display: flex;
  justify-content: center;
} */

.labelbox {
  width: 90%;
  padding: 0px 7px;
  background: linear-gradient(rgb(0, 212, 159), rgb(0, 156, 116));
  color: white;
  /* height: 26%; */
  margin-top: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 30px;
}

.labelbox h4 {
  padding: 0px;
  margin: 0px;
  text-align: center;
  font-family: var(--heading4-font);
  font-size: 20px;
}

.footer {
  grid-area: footer;
  /* background: purple; */
  display: grid;
  grid-template-rows: minmax(125vh, min-content);
  grid-template-columns: 5vw 90vw 5vw;
  grid-template-areas: ". footerContent . ";
}

.footerContent {
  grid-area: footerContent;
  /* background-color: rosybrown; */
  display: grid;
  grid-template-rows: minmax(50vh, min-content) minmax(50vh, min-content);
  grid-template-areas:
    "roww1"
    "roww2";
}

.roww1 {
  grid-area: roww1;
  /* background-color: salmon; */
}

.roww1 .btn {
  background-color: #f07f62;
  color: white;
  border-radius: 20px;
  padding: 5px;
  position: relative;
  top: -150px;
  left: 20px;
  width: 70px;
  cursor: pointer;
}

.premiumBox {
  background: #f5f5f5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 60%;
  /* height: 80%; */
  display: flex;
  padding: 0px 30px 0px 10px;
  /* display: grid;
  grid-template-columns: 30fr 90fr;
  grid-template-areas: "column1 column2"; */
  border-radius: 46px;
}

.column1 {
  /* background-color: hotpink; */
  display: grid;
  grid-template-rows: 20fr 80fr;
  grid-template-areas:
    "premiumHeading"
    "image";
}

.premiumHeading {
  /* background-color: yellow; */
  display: flex;
  align-items: center;
}

.premiumLabel {
  position: relative;
  float: left;
}

.ribbon-premium {
  /* padding: 5px; */
  width: 7em;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-family: var(--heading2-font);
  position: relative;
  font-weight: var(--bold-font);
  top: -15px;
  position: absolute;
  left: -16px;
  background-color: #00d49f;
  box-shadow: -2px 3px 4px rgba(0, 0, 0, 0.3);
}

.ribbon-premium:before,
.ribbon-premium:after {
  content: "";
  position: absolute;
}

.ribbon-premium:before {
  width: 7px;
  height: 100%;
  top: 0;
  left: -6.5px;
  /* padding: 0 0 7px; */
  background: inherit;
  border-radius: 5px 0 0 5px;
}

/* .ribbon-premium:after {
  width: 5px;
  height: 5px;
  bottom: 3px;
  left: -4.5px;
  background: lightblue;
  border-radius: 5px 0 0 5px;
} */
/* .premiumLabel {
  background-color: #00d49f;
  width: 100%;
  text-align: center;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}
.premiumLabel p {
  padding: 5px;
  font-size: 26px;
  font-family: var(--heading2-font);
} */
/* .image {
  background-color: white;
} */
.img {
  background-image: url(../../../src/assets/images/assest1.png);
  background-size: cover;
  width: 12em;
  height: 12em;
  margin: 20px 0px 10px 0px;
  border-radius: 100%;
}

.column2 {
  /* background-color: indianred; */
  padding-left: 20px;
}

.column2 h1 {
  font-family: var(--heading-font);
  font-size: 29px;
  margin-bottom: 10px;
}

.column2 h2 {
  font-family: var(--heading2-font);
  font-size: 26px;
  margin-bottom: 10px;
}

.column2 p {
  font-family: var(--para-font);
  font-size: 16px;
  margin-bottom: 10px;
}

.column2 button {
  background-color: #f07f62;
  /* padding-top: 7px; */
  letter-spacing: 2px;
  line-height: 18px;
  width: 30%;
  height: 10%;
  color: white;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: var(--bold-font);
  font-family: var(--heading4-font);
}

.roww2 {
  grid-area: roww2;
  /* background-color: burlywood; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.irsBox {
  background: #f5f5f5;
  width: 80%;
  height: 60%;
  display: grid;
  grid-template-columns: 80fr 20fr;
  grid-template-areas: "irsContent irsImage";
  border-radius: 46px;
}

.irsContent {
  /* height: 100%; */
  /* background-color: lightblue; */
  padding-left: 4rem;
}

.irsContent h1 {
  font-size: 29px;
  font-family: var(--heading4-font);
  margin-bottom: 2rem;
}

.irsContent p {
  font-size: 16px;
  margin: 0px;
  font-family: var(--para-font);
}

.irsImage {
  grid-area: irsImage;
  height: 100%;
  /* background-color: lightgoldenrodyellow; */
}

.img2 {
  background-image: url(../../../src/assets/images/assest2.png);
  background-size: cover;
  width: 193.5px;
  height: 78.62px;
}

.boxwrapper .col4 {
  /* padding-bottom: 7rem; */
}

@media only screen and (max-width: 1330px) {
  .boxwrapper p {
    font-size: 14px;
  }

  .boxwrapper .col5 h4 {
    font-size: 16px;
  }

  .boxwrapper .col2 {
    padding-left: 10px;
  }

  .boxwrapper .col4 {
    padding-bottom: 7rem;
  }

  .menu {
    display: grid;
    grid-template-columns: 0.2fr 3fr 3fr 2fr 0.2fr;
  }

  /* .bestOptionLabel h2 {
    font-size: 20px;
  } */
  .column2 h2 {
    font-size: 20px;
  }

  .column2 p {
    font-size: 14px;
  }

  .img {
    width: 12em;
    height: 12em;
  }

  /* .premiumBox {
    width: 70%;
    height: 80%;
  } */

  .irsBox {
    width: 90%;
    /* height: 70%; */
  }

  .head h1 {
    /* padding-left: 5rem; */
  }

  .column2 button {
    width: 30%;
    height: 12%;
    font-size: 14px;
  }
}

@media only screen and (max-width: 1105px) {
  /* .boxwrapper .col5 {
    padding: 20px;
  }
  .boxwrapper .col5 .labelbox {
    margin-top: 10px;
    padding: 5px;
  }
  .boxwrapper .col2 {
    padding-bottom: 0;
  } */
  .wrapper {
    display: grid;
    grid-template-rows: 10vh minmax(170vh, min-content);
    grid-template-areas:
      "head"
      "boxes";
  }

  .item {
    display: none;
  }

  .column2 h1 {
    font-size: 26px;
  }

  .column2 h2 {
    font-size: 18px;
  }

  .column2 p {
    font-size: 13px;
  }
}

@media only screen and (max-width: 1000px) {
  .adder-subtractor .box h1 {
    font-size: 26px;
  }

  .box h2 {
    font-size: 18px;
  }

  .max h2 {
    font-size: 18px;
  }

  .title p {
    font-size: 22px;
  }

  .percent p {
    font-size: 30px;
  }
}

@media only screen and (max-width: 900px) {
  .irsContent p {
    font-size: 14px;
  }

  .premiumBox {
    width: 80%;
  }

  .column2 button {
    width: 40%;
    height: 12%;
    font-size: 14px;
  }
}

@media only screen and (max-width: 765px) {
  .up-drag {
    width: 170px;
  }

  .boxwrapper .col {
    padding-left: 10px;
  }

  .boxwrapper p {
    font-size: 13px;
  }

  .adder-subtractor .box {
    width: 150px;
  }

  /* .slider .box {
    width: 50%;
  } */
  .cursor {
    display: none;
  }

  /* .slider .box {
    display: grid;
    grid-template-columns: 25% 75%;
  } */
  .menu {
    display: grid;
    grid-template-columns: 0.2fr 6fr 5fr 2fr 0.2fr;
  }

  .head {
    display: flex;
    align-items: center;
  }

  .head h1 {
    font-size: 24px;
  }

  /* .bestOptionLabel {
    width: 70%;
  } */
  /* .premiumBox {
    width: 90%;
    height: 70%;
  } */

  .column2 h1 {
    font-size: 22px;
  }

  .column2 h2 {
    font-size: 15px;
  }

  .column2 p {
    font-size: 10px;
  }

  .img {
    width: 9em;
    height: 9em;
  }

  .btn {
    display: none;
  }

  .irsBox {
    width: 95%;
    /* height: 70%; */
  }

  .irsContent {
    padding-left: 2rem;
  }

  .percent p {
    font-size: 25px;
  }
}

@media only screen and (max-width: 670px) {
  /* .adder-subtractor .box {
    width: 45%;
  } */

  .slider .box {
    width: 60%;
  }

  .heading h2 {
    font-size: 16px;
  }

  .heading2 h2 {
    font-size: 16px;
  }

  .menu {
    display: grid;
    grid-template-columns: 0.2fr 6fr 5fr 3fr 0.2fr;
  }

  .title p {
    font-size: 18px;
  }

  .logo p {
    font-size: 15px;
  }

  .img2 {
    height: 75px;
    width: 180px;
  }

  .irsContent p {
    font-size: 12px;
  }
}

@media only screen and (max-width: 550px) {
  .boxwrapper .col {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*
  .adder-subtractor .box {
    width: 50%;
  } */
  .premiumBox {
    width: 100%;
  }

  .menu {
    display: grid;
    grid-template-columns: 0.2fr 7fr 4fr 3fr 0.2fr;
  }

  .box h2 {
    font-size: 16px;
  }

  .max h2 {
    font-size: 16px;
  }

  .heading {
    padding-right: 8px;
  }

  .heading2 {
    padding-right: 60px;
  }

  .heading {
    display: flex;
    align-items: center;
  }

  .adder-subtractor {
    display: flex;
    align-items: center;
  }

  .head h1 {
    font-size: 22px;
  }

  .irsBox {
    width: 98%;
    /* height: 50%; */
  }

  .irsContent p {
    font-size: 10px;
  }

  .irsContent {
    padding-left: 1rem;
  }

  .img2 {
    height: 60px;
    width: 150px;
  }

  .column2 button {
    width: 50%;
    height: 12%;
    font-size: 14px;
  }
}

@media only screen and (max-width: 500px) {
  .img {
    width: 7em;
    height: 7em;
  }

  .column2 h1 {
    font-size: 20px;
  }

  .column2 h2 {
    font-size: 12px;
  }

  .column2 p {
    font-size: 8px;
  }

  .roww1 {
    display: flex;
    justify-content: flex-start;
  }

  .irsBox {
    width: 98%;
    /* height: 70%; */
  }
}

@media only screen and (max-width: 447px) {
  /* .bestOptionLabel {
    right: 130px;
    width: 50%;
  } */
  /* .bestOptionLabel h2 {
    font-size: 18px;
  } */
  .title p {
    font-size: 15px;
  }

  .logo p {
    font-size: 12px;
  }

  .heading {
    padding-left: 5px;
  }

  .heading2 {
    padding-left: 5px;
  }

  /* .adder-subtractor .box {
    width: 55%;
  } */

  .slider .box {
    width: 70%;
  }

  .box h2 {
    font-size: 14px;
  }

  .max h2 {
    font-size: 14px;
  }

  .heading h2 {
    font-size: 14px;
  }

  .heading2 h2 {
    font-size: 14px;
  }

  .box4 .col {
    padding-bottom: 0;
  }

  /* .head {
    display: flex;
    align-items: center;
    justify-content: center;
  } */
  .head h1 {
    font-size: 20px;
  }

  .column2 {
    padding-left: 10px;
  }

  .column2 button {
    width: 60%;
    height: 12%;
    font-size: 12px;
  }

  .irsContent h1 {
    font-size: 20px;
  }

  .irsContent p {
    font-size: 8px;
  }

  .irsBox {
    /* height: 60%; */
  }
}

@media only screen and (max-width: 400px) {
  /* .adder-subtractor .box {
    width: 65%;
  } */

  .slider .box {
    width: 75%;
  }

  .heading {
    padding-right: 2px;
  }

  .heading2 {
    padding-right: 35px;
  }

  .menu {
    display: grid;
    grid-template-columns: 0.2fr 8fr 3fr 3fr 0.2fr;
  }

  /* .bestOptionLabel h2 {
    font-size: 15px;
  } */
  .column2 h1 {
    font-size: 18px;
  }

  .column2 h2 {
    font-size: 10px;
  }

  .column2 p {
    font-size: 10px;
  }

  .irsContent h1 {
    font-size: 18px;
  }

  .img2 {
    height: 50px;
    width: 140px;
  }

  .column2 button {
    width: 65%;
    height: 12%;
    font-size: 12px;
  }
}

@media only screen and (max-width: 350px) {
  .adder-subtractor .box {
    width: 70%;
  }

  /* .bestOptionLabel {
    right: 100px;
  } */

  .title p {
    font-size: 12px;
  }

  .logo p {
    font-size: 1px;
  }

  .slider .box {
    width: 80%;
  }

  .heading {
    padding-right: 0;
  }

  .heading2 {
    padding-right: 20px;
  }

  .irsContent h1 {
    font-size: 14px;
  }

  /* .premiumBox {
    width: 100%;
    height: 70%;
  } */

  .img {
    width: 12em;
    height: 12em;
  }

  .irsBox {
    width: 100%;
    /* height: 80%; */
  }
}
</style>
