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
            Amount You Want<br />
            to Contribute From<br />
            Profit After Taxes
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
          <h2 class="mt-3">Projected <br />Contributions</h2>
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

        <div class="boxes relative">
          <restirement-acc-option
            :bestOptionActive="bestOptionActive.individual401k"
            name="Individual <br />
                  401K"
            :isDisabled="isIndividual401kDisabled"
            description="Individual 401(K) allows for <br />
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
                paperwork."
            tooltipText="There are two forms of contributions available to the self-employed.
                <br/><br/> <strong>Your Contribution</strong> uses money from your total profit or salary (if you've incorporated) to
                reduce your taxable income.<br/><strong>Your Business Contribution</strong>
                is a form of employee benefit that is treated as a business expense. Which will lower your business’s taxable profit.<br/><br/>
                This calculator will always apply your contribution through your business first, because that will maximize tax deduction opportunity for you."
            @emitBusinessSlider="
              (e) => {
                this.sliders.individual401kBusiness = e;
              }
            "
            @emitPersonalSlider="
              (e) => {
                this.sliders.individual401kPersonal = e;
              }
            "
            :sliderPersonal="sliders.individual401kPersonal"
            :sliderBusiness="sliders.individual401kBusiness"
            :handleDrag="handleIndividualDrag"
            :sliderMaxPersonal="sliderMax.individual401kPersonal"
            :sliderMaxBusiness="sliderMax.individual401kBusiness"
            :tooltipMain="tooltip.individual401kBusiness"
            :tooltip="{
              taxAvoided: tooltip.taxAvoided.individual401k,
              taxAdvantageRatio: tooltip.taxAdvantageRatio.individual401k,
            }"
            :taxAvoided="taxAvoided.individual401k"
            :taxAdvantageRatio="taxAdvantageRatio.individual401k"
            :addInFirebase="addInFirebase"
            firebaseName="individual"
            :isHeading="true"
          />
          <restirement-acc-option
            :bestOptionActive="bestOptionActive.sepIra"
            name="SEP-IRA"
            :isDisabled="false"
            heading="<h4>Your Business Contribution</h4>"
            description="A SEP-IRA is an ideal plan if <br />
                you are earning over <br />
                $24,000/yr, and you intend to <br />
                save more than $6,000/yr for <br />
                retirement. You can <br />
                contribute a maximum of <br />
                $56,000/yr <br />
                <br />
                Best for simplicity in setup. <br />
                And if you have 2 jobs, one as <br />
                a freelancer and another as a <br />
                full-time employee."
            @emitBusinessSlider="
              (e) => {
                this.sliders.sepIraBusiness = e;
              }
            "
            :sliderBusiness="sliders.sepIraBusiness"
            :handleDrag="handleSepIraDrag"
            :sliderMaxPersonal="sliderMax.sepIraBusiness"
            :sliderMaxBusiness="sliderMax.sepIraBusiness"
            :tooltipMain="tooltip.sepIraBusiness"
            :tooltip="{
              taxAvoided: tooltip.taxAvoided.sepIra,
              taxAdvantageRatio: tooltip.taxAdvantageRatio.sepIra,
            }"
            :isPersonal="false"
            :taxAvoided="taxAvoided.sepIra"
            :taxAdvantageRatio="taxAdvantageRatio.sepIra"
            :addInFirebase="addInFirebase"
            firebaseName="sepra"
          />
          <restirement-acc-option
            :bestOptionActive="bestOptionActive.simpleIra"
            name="SIMPLE IRA"
            :isDisabled="isSimpleIraDisabled"
            heading="<h4>Your Business Contribution</h4>"
            description="The SIMPLE-IRA allows for <br />
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
                administration & fees"
            @emitBusinessSlider="
              (e) => {
                this.sliders.simpleIraBusiness = e;
              }
            "
            @emitPersonalSlider="
              (e) => {
                this.sliders.simpleIraPersonal = e;
              }
            "
            :sliderPersonal="sliders.simpleIraPersonal"
            :sliderBusiness="sliders.simpleIraBusiness"
            :handleDrag="handleSimpleIra"
            :sliderMaxPersonal="sliderMax.simpleIraPersonal"
            :sliderMaxBusiness="sliderMax.simpleIraBusiness"
            :tooltipMain="tooltip.simpleIraBusiness"
            :tooltip="{
              taxAvoided: tooltip.taxAvoided.simpleIra,
              taxAdvantageRatio: tooltip.taxAdvantageRatio.simpleIra,
            }"
            :taxAvoided="taxAvoided.simpleIra"
            :taxAdvantageRatio="taxAdvantageRatio.simpleIra"
            :addInFirebase="addInFirebase"
            firebaseName="simpleIra"
          />
          <restirement-acc-option
            :bestOptionActive="bestOptionActive.traditionalIra"
            name="Traditional<br />
                  IRA"
            :isDisabled="false"
            description=" This is the most common <br />
                type of retirement account <br />
                opened by individuals. You <br />
                can contribute provided you <br />
                have any type of earned <br />
                income for the year. You may <br />
                contribute up to $6,000/yr <br />
                <br />
                Best for those who have <br />
                outstanding debt, but want <br />
                to start saving for <br />
                retirement."
            @emitPersonalSlider="
              (e) => {
                this.sliders.traditionalIraPersonal = e;
              }
            "
            :sliderPersonal="sliders.traditionalIraPersonal"
            :isBusiness="false"
            :handleDrag="handleTraditionalIra"
            :sliderMaxPersonal="sliderMax.traditionalIraPersonal"
            :tooltip="{
              taxAvoided: tooltip.taxAvoided.traditionalIra,
              taxAdvantageRatio: tooltip.taxAdvantageRatio.traditionalIra,
            }"
            :taxAvoided="taxAvoided.traditionalIra"
            :taxAdvantageRatio="taxAdvantageRatio.traditionalIra"
            :addInFirebase="addInFirebase"
            firebaseName="traditionalIra"
          />
        </div>
      </div>
    </div>
    <restirement-footer :handleSignup="handleSignup" />
    <tingle-modal
      v-model="isModalOpen"
      heading="Get Early Access"
      :content="body"
      buttonText="Yes Signup"
      :submit="onFormSubmit"
    />
    <loading :active.sync="loader" :can-cancel="false" loader="dots" />
  </div>
</template>

<script>
// import '../css/retire-options.css'
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
import restirementAccOption from "../components/retirement-acc-option";
import restirementFooter from "../components/retirement-footer";

import {
  firestore,
  USER_INPUTS,
  compareTwoObjects,
  TAX_SUMMARY,
  DRAG_CALCULATION,
} from "../util";
import differenceInDays from "date-fns/differenceInDays";
import { logging } from "@/utils/logging";

export default {
  name: "RetirementOptions",

  components: {
    vueCustomSlider,
    infoIcon,
    TingleModal,
    Loading,
    restirementAccOption,
    restirementFooter,
  },
  data() {
    return {
      tooltip: {
        individual401kBusiness: {},
        sepIraBusiness: {},
        simpleIraBusiness: {},
        taxAvoided: {},
        taxAdvantageRatio: {},
      },
      loader: false,
      roundOff,
      body,
      isModalOpen: false,
      disabledContainer: {
        individual401k: false,
        simpleIra: false,
      },
      percent: 10,
      taxAvoided: {
        individual401k: "",
        sepIra: "",
        simpleIra: "",
        traditionalIra: "",
      },
      taxAdvantageRatio: {
        individual401k: 0,
        sepIra: 0,
        simpleIra: 0,
        traditionalIra: 0,
      },
      bestOptionActive: {
        individual401k: true,
        sepIra: false,
        simpleIra: false,
        traditionalIra: false,
      },
      sliderMax: {
        individual401kPersonal: 100,
        individual401kBusiness: 100,
        sepIraBusiness: 100,
        simpleIraPersonal: 100,
        simpleIraBusiness: 100,
        traditionalIraPersonal: 6000,
      },
      sliders: {
        individual401kPersonal: 50,
        individual401kBusiness: 10,
        sepIraBusiness: 8,
        simpleIraPersonal: 10,
        simpleIraBusiness: 10,
        traditionalIraPersonal: 10,
      },
      projectedValue: 1000,
    };
  },
  mounted() {
    this.scrollToTop();
    this.containerDisablingCondition();
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
    this.sepIraBusinessTooltip();
    this.individual401kBusinessTooltip();
    this.simpleIraBusinessTooltip();
    this.handleTaxAdvantageRatioTooltip();
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
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
      let ageUntilRetirement = 67 - parseInt(this.age);
      let interestRate = 1 + parseFloat(0.08);
      let compoundInterest = Math.pow(interestRate, ageUntilRetirement);
      const number = parseInt(amount * compoundInterest);
      return number == Infinity ? 0 : number;
    },
    async handleIndividualDrag() {
      let res = await repostData(
        this.sliders.individual401kPersonal,
        this.sliders.individual401kBusiness
      );
      this.taxAvoided.individual401k = (
        this.taxBalance - res?.taxBalance
      ).toFixed(2);
      this.taxAdvantageRatio.individual401k = Math.round(
        (this.taxAvoided.individual401k /
          (this.sliders.individual401kPersonal +
            this.sliders.individual401kBusiness)) *
          100
      );
      this.handleTaxAvoidedTooltip(res, "individual401k");
      await this.addInFirebase();
      return res;
    },
    async handleSepIraDrag() {
      let res = await repostData("", this.sliders.sepIraBusiness);
      this.taxAvoided.sepIra = (this.taxBalance - res?.taxBalance).toFixed(2);
      this.taxAdvantageRatio.sepIra = Math.round(
        (this.taxAvoided.sepIra / this.sliders.sepIraBusiness) * 100
      );
      this.handleTaxAvoidedTooltip(res, "sepIra");
      await this.addInFirebase();
      return res;
    },
    async handleSimpleIra() {
      let res = await repostData(
        this.sliders.simpleIraPersonal,
        this.sliders.simpleIraBusiness
      );
      this.taxAvoided.simpleIra = (this.taxBalance - res?.taxBalance).toFixed(
        2
      );
      this.taxAdvantageRatio.simpleIra = Math.round(
        (this.taxAvoided.simpleIra /
          (this.sliders.simpleIraPersonal + this.sliders.simpleIraBusiness)) *
          100
      );
      this.handleTaxAvoidedTooltip(res, "simpleIra");
      await this.addInFirebase();
      return res;
    },
    async handleTraditionalIra() {
      let res = await repostData(this.sliders.traditionalIraPersonal, "");
      this.taxAvoided.traditionalIra = (
        this.taxBalance - res?.taxBalance
      ).toFixed(2);
      this.taxAdvantageRatio.traditionalIra = Math.round(
        (this.taxAvoided.traditionalIra / this.sliders.traditionalIraPersonal) *
          100
      );
      this.handleTaxAvoidedTooltip(res, "traditionalIra");
      await this.addInFirebase();
      return res;
    },
    largestNumber(props) {
      const { individual401k, sepIra, simpleIra, traditionalIra } = props;
      let largest;
      if (this.isIndividual401kDisabled) {
        const largest = Math.max(
          Number(sepIra),
          Number(simpleIra),
          Number(traditionalIra)
        );
        return this.returnLargest(props, largest, "individual401k");
      } else {
        const largest = Math.max(
          Number(individual401k),
          Number(sepIra),
          Number(simpleIra),
          Number(traditionalIra)
        );
        return this.returnLargest(props, largest);
      }
    },
    returnLargest(props, largest, disabledValue) {
      const { individual401k, sepIra, simpleIra, traditionalIra } = props;
      if (individual401k == largest && disabledValue !== "individual401k") {
        return "individual401k";
      }
      if (sepIra == largest && disabledValue !== "sepIra") {
        return "sepIra";
      }
      if (simpleIra == largest && disabledValue !== "simpleIra") {
        return "simpleIra";
      }
      if (traditionalIra == largest && disabledValue !== "traditionalIra") {
        return "traditionalIra";
      }
      return null;
    },
    containerDisablingCondition() {
      if (this.isIndividual401kDisabled) {
        this.disabledContainer = {
          individual401k: true,
        };
      }
      if (this.isSimpleIraDisabled) {
        this.disabledContainer = {
          simpleIra: true,
        };
      }
    },
    individual401kBusinessTooltip() {
      let irsLimit;
      let compensation;
      let seTaxDeduction;
      if (this.userInput.salary) {
        compensation = "Your Salary: " + usdFormat(this.userInput.salary, 0);
        seTaxDeduction = "";
        irsLimit = "25%";
      } else {
        compensation =
          "Your Total Profit: " +
          this.profitAfterExpenses.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
        seTaxDeduction = "x  Self Employment Deduction*: 92.5%";
        irsLimit = "20%";
      }
      this.tooltip = {
        ...this.tooltip,
        individual401kBusiness: {
          description:
            "If you pay yourself a salary (receive a W2), then this is limited to 25% of the salary you pay yourself. If you don’t pay yourself a salary, this is limited to 20% of the total profit from your business after deducting half of self employment tax.",
          compensation,
          seTaxDeduction,
          irsLimit,
          contributionMax: this.sliderMax.individual401kBusiness.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }
          ),
        },
      };
    },
    sepIraBusinessTooltip() {
      let irsLimit;
      let compensation;
      let seTaxDeduction;
      if (this.userInput.salary) {
        compensation = "Your Salary: " + usdFormat(this.userInput.salary, 0);
        seTaxDeduction = "";
        irsLimit = "25%";
      } else {
        compensation =
          "Your Total Profit: " +
          this.profitAfterExpenses.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
        seTaxDeduction = "x  Self Employment Deduction*: 92.5%";
        irsLimit = "20%";
      }
      this.tooltip = {
        ...this.tooltip,
        sepIraBusiness: {
          description:
            "If you pay yourself a salary (receive a W2), then this is limited to 25% of the salary you pay yourself. If you don’t pay yourself a salary, this is limited to 20% of the total profit from your business after deducting half of self employment tax.",
          compensation,
          seTaxDeduction,
          irsLimit,
          contributionMax: this.sliderMax.sepIraBusiness.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }
          ),
        },
      };
    },
    simpleIraBusinessTooltip() {
      this.tooltip.simpleIraBusiness = {
        ...this.tooltip,
        description: `You can either do a matching
        contribution for every dollar up to 3% of
        your salary or net earnings, or 2% as an elective deferral. This calculator assumes the 3%
        matching contribution, therefore has a maximum
        business contribution of <span class="">${this.sliderMax.simpleIraBusiness.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }
        )}</span>.`,
      };
    },
    handleTaxAvoidedTooltip(res, name) {
      const taxUpdate = this.taxUpdate;
      const {
        federalIncomeTax,
        stateIncomeTax,
        socialSecurityTax,
        medicareTax,
      } = res || {};
      const span = (value) => {
        return `<span class="">${usdFormat(value)}</span>`;
      };
      this.tooltip.taxAvoided = {
        ...(this.tooltip.taxAvoided || {}),
        [name]: {
          description: [
            `Federal Tax avoided: ${span(
              taxUpdate.federalIncomeTax - federalIncomeTax
            )}`,
            `State Tax avoided: ${span(
              taxUpdate.stateIncomeTax - stateIncomeTax
            )}`,
            `Social Security Tax avoided: ${span(
              taxUpdate.socialSecurityTax - socialSecurityTax
            )}`,
            `Medicare Tax avoided: ${span(
              taxUpdate.medicareTax - medicareTax
            )}`,
          ],
        },
      };
    },
    handleTaxAdvantageRatioTooltip() {
      const span = (value) => `The higher the percentage, the better
      tax advantage the account offers. This metric shows
      tax avoided over contribution amount.  For each $1
      you contribute to retirement, you reduce your tax bill by $<span class="">${value}</span>.`;
      this.tooltip.taxAdvantageRatio = {
        ...this.tooltip.taxAdvantageRatio,
        individual401k: {
          description: span(
            (this.taxAdvantageRatio.individual401k / 100).toFixed(2)
          ),
        },
        sepIra: {
          description: span((this.taxAdvantageRatio.sepIra / 100).toFixed(2)),
        },
        simpleIra: {
          description: span(
            (this.taxAdvantageRatio.simpleIra / 100).toFixed(2)
          ),
        },
        traditionalIra: {
          description: span(
            (this.taxAdvantageRatio.traditionalIra / 100).toFixed(2)
          ),
        },
      };
    },
    async addInFirebase(clickItem) {
      const fildingBestOption = Object.keys(this.bestOptionActive).find(
        (item) => this.bestOptionActive[item]
      );
      const calculationDragId = localStorage.getItem("calculationDragId");
      if (calculationDragId) {
        const calculation = await firestore
          .collection(DRAG_CALCULATION)
          .doc(calculationDragId)
          .get();
        if (calculation.exists) {
          const calculationData = calculation.data();

          if (
            !differenceInDays(new Date(calculationData.createdAt), Date.now())
          ) {
            return await firestore
              .collection(DRAG_CALCULATION)
              .doc(calculationDragId)
              .update({
                taxAvoided: this.taxAvoided,
                taxAdvantageRatio: this.taxAdvantageRatio,
                sliders: this.sliders,
                bestOptionActive: fildingBestOption,
                user_input_id: this.userInput.user_input_id || "",
                ...(clickItem ? { clickedGuide: clickItem } : {}),
                updatedAt: Date.now(),
                updatedAtView: new Date(),
              });
          }
        }
      }

      const calculationDrag = await firestore.collection(DRAG_CALCULATION).add({
        taxAvoided: this.taxAvoided,
        taxAdvantageRatio: this.taxAdvantageRatio,
        sliders: this.sliders,
        bestOptionActive: fildingBestOption,
        user_input_id: this.userInput.user_input_id || "",
        ...(clickItem ? { clickedGuide: clickItem } : {}),
        createdAt: Date.now(),
        createdAtView: new Date(),
      });

      localStorage.setItem("calculationDragId", calculationDrag.id);
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
      profitAfterExpenses: (state) => state.taxSummary.profitAfterExpenses,
      totalIncome: (state) => state.taxSummary.totalIncome,
      taxBalance: (state) => state.taxUpdate.taxBalance,
      age: (state) => state.userInput.age,
      userInput: (state) => state.userInput,
      taxUpdate: (state) => state.taxUpdate,
    }),
    getRoundofValue() {
      return roundOff(this.profitAfterTaxes, 100);
    },
    isIndividual401kDisabled() {
      return (
        this.userInput.employee_count === "lessthan100" ||
        this.userInput.employee_count === "100plus"
      );
    },
    isSimpleIraDisabled() {
      return this.userInput.employee_count === "100plus";
    },
  },
  watch: {
    percent(val) {
      this.projectedValue = roundOff((this.profitAfterTaxes / 100) * val, 100);
    },
    async projectedValue(val) {
      this.loader = true;
      await logging("loader starts");
      const formattedValue = val / roundOff(this.profitAfterTaxes / 100);
      this.percent =
        formattedValue == Infinity ? 0 : Math.round(formattedValue);
      const {
        individual401kPersonal,
        individual401kBusiness,
        simpleIraPersonal,
        simpleIraBusiness,
        traditionalIraPersonal,
        sepIraBusiness,
      } = this.sliderMax;
      this.sliders = {
        individual401kPersonal: 0,
        individual401kBusiness: 0,
        sepIraBusiness: 0,
        simpleIraPersonal: 0,
        simpleIraBusiness: 0,
        traditionalIraPersonal: 0,
      };
      if (!this.isIndividual401kDisabled) {
        if (val > individual401kBusiness) {
          if (val - individual401kBusiness > individual401kPersonal) {
            this.sliders.individual401kPersonal = roundOff(
              individual401kPersonal
            );
            this.sliders.individual401kBusiness = roundOff(
              individual401kBusiness
            );
            await logging(
              "Exceed maximum of Individual 401k contribution limit"
            );
          } else {
            this.sliders.individual401kPersonal = roundOff(
              val - individual401kBusiness
            );
            this.sliders.individual401kBusiness = roundOff(
              individual401kBusiness
            );
          }
        } else {
          this.sliders.individual401kBusiness = val;
        }
      }
      if (!this.isSimpleIraDisabled) {
        if (val > simpleIraBusiness) {
          if (val - simpleIraBusiness > simpleIraPersonal) {
            this.sliders.simpleIraPersonal = roundOff(simpleIraPersonal);
            this.sliders.simpleIraBusiness = roundOff(simpleIraBusiness);
            await logging("Exceed maximum of SIMPLE IRA contribution limit");
          } else {
            this.sliders.simpleIraPersonal = roundOff(val - simpleIraBusiness);
            this.sliders.simpleIraBusiness = roundOff(simpleIraBusiness);
          }
        } else {
          this.sliders.simpleIraBusiness = roundOff(val);
        }
      }
      if (val > traditionalIraPersonal) {
        this.sliders.traditionalIraPersonal = traditionalIraPersonal;
        await logging("Exceed maximum of Traditional IRA contribution limit");
      } else {
        this.sliders.traditionalIraPersonal = val;
      }
      if (val > sepIraBusiness) {
        this.sliders.sepIraBusiness = sepIraBusiness;
        await logging("Exceed maximum of SEP-IRA contribution limit");
      } else {
        this.sliders.sepIraBusiness = val;
      }

      const individual401k = await this.handleIndividualDrag();
      this.handleTaxAvoidedTooltip(individual401k, "individual401k");
      const sepIra = await this.handleSepIraDrag();
      this.handleTaxAvoidedTooltip(sepIra, "sepIra");
      const simpleIra = await this.handleSimpleIra();
      this.handleTaxAvoidedTooltip(simpleIra, "simpleIra");
      const traditionalIra = await this.handleTraditionalIra();
      this.handleTaxAvoidedTooltip(traditionalIra, "traditionalIra");
      this.loader = false;
      await this.addInFirebase();
      await logging("loader ends");
    },
    taxAvoided: {
      async handler(val) {
        const find = this.largestNumber({
          ...val,
        });
        this.bestOptionActive = {};
        this.bestOptionActive[find] = true;
      },
      deep: true,
    },

    taxAdvantageRatio: {
      async handler(val) {
        this.handleTaxAdvantageRatioTooltip();
      },
      deep: true,
    },
  },
};
</script>
<style scoped src="../css/retire-options.css"></style>
