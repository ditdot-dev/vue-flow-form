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
              <div class="col flex2">
                <h1 class="mt-5">
                  Individual <br />
                  401K
                </h1>
              </div>
            </div>
            <div class="col2 col flex2 justify-content-start mt-3 relative">
              <h4 class="absolute top-75">At a Glance</h4>
              <p :class="`${isIndividual401kDisabled && 'disabled-color'}`">
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
                :tooltip="{
                  description: `There are two forms of contributions available to the self-employed.
                <br/><br/> <strong>Your Contribution</strong> uses money from your total profit or salary (if you've incorporated) to
                reduce your taxable income.<br/><strong>Your Business Contribution</strong>
                is a form of employee benefit that is treated as a business expense. Which will lower your business’s taxable profit.<br/><br/>
                This calculator will always apply your contribution through your business first, because that will maximize tax deduction opportunity for you.`,
                }"
                class="absolute top-60"
                classes="d-flex align-items-end"
                :dynamic="true"
                tooltipType="description"
              >
                <h4 class="d-flex align-items-end">Contributions</h4>
              </info-icon>
              <h4 :class="`${isIndividual401kDisabled && 'disabled-color'}`">
                Your Contribution
              </h4>
              <h2 :class="`${isIndividual401kDisabled && 'disabled-color'}`">
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
                  :disabled="isIndividual401kDisabled"
                />
              </div>
              <h4 :class="`${isIndividual401kDisabled && 'disabled-color'}`">
                Your Business Contribution
              </h4>
              <info-icon
                :tooltip="tooltip.individual401kBusiness"
                :dynamic="true"
              >
                <h2 :class="`${isIndividual401kDisabled && 'disabled-color'}`">
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
                  :disabled="isIndividual401kDisabled"
                />
              </div>
              <p :class="`${isIndividual401kDisabled && 'disabled-color'}`">
                By your age 67, these <br />
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
              <h4 :class="`${isIndividual401kDisabled && 'disabled-color'}`">
                Tax Avoided
              </h4>
              <info-icon
                :tooltip="tooltip.taxAvoided.individual401k"
                :dynamic="true"
                tooltipType="points"
              >
                <h2 :class="`${isIndividual401kDisabled && 'disabled-color'}`">
                  {{ taxAvoided.individual401k | currency("$", 0) }}
                </h2>
              </info-icon>

              <p
                :class="`${
                  isIndividual401kDisabled && 'disabled-color'
                } p-0 m-0`"
              >
                By your age 67, the amount <br />
                you are missing out on could<br />
                be worth
                {{
                  sliderCompound(taxAvoided.individual401k) | currency("$", 0)
                }}
              </p>
              <h4 :class="`${isIndividual401kDisabled && 'disabled-color'}`">
                Tax Advantage Ratio
              </h4>
              <info-icon
                :tooltip="tooltip.taxAdvantageRatio.individual401k"
                tooltipType="description"
                :dynamic="true"
              >
                <h2 :class="`${isIndividual401kDisabled && 'disabled-color'}`">
                  {{ taxAdvantageRatio.individual401k }}%
                </h2>
              </info-icon>
            </div>
            <div :class="`col5 col `">
              <div v-if="isIndividual401kDisabled">
                <div
                  :class="`labelbox flex ${
                    isIndividual401kDisabled && 'disabled-back-color'
                  }`"
                >
                  <h4>Get Started</h4>
                </div>
                <span class="labelbox-down">
                  You are not eligible due to too many employees in your
                  business.
                </span>
              </div>
              <a
                href="https://www.learn.gigfinance.org/blog/how-to-get-started-with-an-individual-401-k/"
                target="_blank"
                rel="noopener noreferrer"
                v-else
                @click="addInFirebase('individual')"
              >
                <div
                  :class="`labelbox flex ${
                    isIndividual401kDisabled && 'disabled-color'
                  }`"
                >
                  <h4>Get Started</h4>
                </div>
              </a>
            </div>
          </div>

          <div
            :class="`box1 boxwrapper relative ${
              bestOptionActive.sepIra && 'active-color'
            }`"
          >
            <h2 class="p-0 bestOptionLabel p-1" v-if="bestOptionActive.sepIra">
              BEST OPTION
            </h2>
            <div class="col1 best-option-container relative">
              <div class="col flex2">
                <h1 class="mt-5">SEP-IRA</h1>
              </div>
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
                Best for simplicity in setup. <br />
                And if you have 2 jobs, one as <br />
                a freelancer and another as a <br />
                full-time employee.
              </p>
            </div>
            <div class="col3 col flex2 mb-5 justify-content-between m-0 py-0">
              <h4>Your Business Contribution</h4>
              <info-icon :tooltip="tooltip.sepIraBusiness" :dynamic="true">
                <h2 :class="` mb-0 pb-0`">
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
                By your age 67, these <br />
                contributions could be <br />
                worth
                {{ sliderCompound(sliders.sepIraBusiness) | currency("$", 0) }}
              </p>
            </div>

            <div class="col4 col flex2 justify-content-between">
              <h4>Tax Avoided</h4>
              <info-icon
                :tooltip="tooltip.taxAvoided.sepIra"
                :dynamic="true"
                tooltipType="points"
              >
                <h2>
                  {{ taxAvoided.sepIra | currency("$", 0) }}
                </h2>
              </info-icon>

              <p :class="`p-0 m-0`">
                By your age 67, the amount<br />
                you are missing out on could<br />
                be worth
                {{ sliderCompound(taxAvoided.sepIra) | currency("$", 0) }}
              </p>
              <h4>Tax Advantage Ratio</h4>
              <info-icon
                :tooltip="tooltip.taxAdvantageRatio.sepIra"
                tooltipType="description"
                :dynamic="true"
              >
                <h2>{{ taxAdvantageRatio.sepIra }}%</h2>
              </info-icon>
            </div>

            <div class="col5 col">
              <a
                href="https://www.learn.gigfinance.org/blog/how-to-get-started-with-a-sep-ira/"
                target="_blank"
                rel="noopener noreferrer"
                @click="addInFirebase('sepra')"
              >
                <div class="labelbox flex">
                  <h4>Get Started</h4>
                </div>
              </a>
            </div>
          </div>

          <div
            :class="`box1 boxwrapper relative ${
              bestOptionActive.simpleIra && 'active-color'
            }`"
          >
            <h2
              class="p-0 bestOptionLabel p-1"
              v-if="bestOptionActive.simpleIra"
            >
              BEST OPTION
            </h2>
            <div class="col1 best-option-container relative">
              <div class="col flex2">
                <h1 class="mt-5">SIMPLE IRA</h1>
              </div>
            </div>

            <div class="col2 col flex2 justify-content-start mt-3">
              <p :class="`${isSimpleIraDisabled && 'disabled-color'}`">
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
              <h4 :class="`${isSimpleIraDisabled && 'disabled-color'}`">
                Your Contribution
              </h4>
              <h2 :class="`${isSimpleIraDisabled && 'disabled-color'}`">
                {{ sliders.simpleIraPersonal | currency("$", 0) }} ({{
                  sliderPercentage(sliders.simpleIraPersonal)
                }}%)
              </h2>
              <div class="colBox">
                <vue-custom-slider
                  v-model="sliders.simpleIraPersonal"
                  :max="sliderMax.simpleIraPersonal"
                  @handleDrag="handleSimpleIra"
                  :disabled="isSimpleIraDisabled"
                />
              </div>
              <h4 :class="`${isSimpleIraDisabled && 'disabled-color'}`">
                Your Business Contribution
              </h4>
              <info-icon
                :tooltip="tooltip.simpleIraBusiness"
                :dynamic="true"
                tooltipType="description"
              >
                <h2 :class="`${isSimpleIraDisabled && 'disabled-color'}`">
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
                  :disabled="isSimpleIraDisabled"
                />
              </div>
              <p :class="`${isSimpleIraDisabled && 'disabled-color'}`">
                By your age 67, these <br />
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
              <h4 :class="`${isSimpleIraDisabled && 'disabled-color'}`">
                Tax Avoided
              </h4>
              <info-icon
                :tooltip="tooltip.taxAvoided.simpleIra"
                :dynamic="true"
                tooltipType="points"
              >
                <h2 :class="`${isSimpleIraDisabled && 'disabled-color'}`">
                  {{ taxAvoided.simpleIra | currency("$", 0) }}
                </h2>
              </info-icon>

              <p :class="`${isSimpleIraDisabled && 'disabled-color'} p-0 m-0`">
                By your age 67, the amount<br />
                you are missing out on could<br />
                be worth
                {{ sliderCompound(taxAvoided.simpleIra) | currency("$", 0) }}
              </p>
              <h4 :class="`${isSimpleIraDisabled && 'disabled-color'}`">
                Tax Advantage Ratio
              </h4>
              <info-icon
                :tooltip="tooltip.taxAdvantageRatio.simpleIra"
                tooltipType="description"
                :dynamic="true"
              >
                <h2 :class="`${isSimpleIraDisabled && 'disabled-color'}`">
                  {{ taxAdvantageRatio.simpleIra }}%
                </h2>
              </info-icon>
            </div>
            <div :class="`col5 col `">
              <div v-if="isSimpleIraDisabled">
                <div
                  :class="`labelbox flex ${
                    isSimpleIraDisabled && 'disabled-back-color'
                  }`"
                  v-if="isSimpleIraDisabled"
                >
                  <h4>Get Started</h4>
                </div>
                <span class="labelbox-down">
                  You are not eligible due to too many employees in your
                  business.
                </span>
              </div>
              <a
                href="https://www.learn.gigfinance.org/blog/how-to-get-started-with-a-simple-ira/"
                target="_blank"
                rel="noopener noreferrer"
                v-else
                @click="addInFirebase('simpleIra')"
              >
                <div
                  :class="`labelbox flex ${
                    isSimpleIraDisabled && 'disabled-color'
                  }`"
                >
                  <h4>Get Started</h4>
                </div>
              </a>
            </div>
          </div>

          <div
            :class="`box1 boxwrapper relative ${
              bestOptionActive.traditionalIra && 'active-color'
            }`"
          >
            <h2
              class="p-0 bestOptionLabel p-1"
              v-if="bestOptionActive.traditionalIra"
            >
              BEST OPTION
            </h2>
            <div class="col1 best-option-container relative">
              <div class="col flex2">
                <h1 class="mt-5">
                  Traditional<br />
                  IRA
                </h1>
              </div>
            </div>

            <div class="col2 col flex2 justify-content-between mt-3">
              <p>
                This is the most common <br />
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
                By your age 67, these <br />
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
              <info-icon
                :tooltip="tooltip.taxAvoided.traditionalIra"
                :dynamic="true"
                tooltipType="points"
              >
                <h2>
                  {{ taxAvoided.traditionalIra | currency("$", 0) }}
                </h2>
              </info-icon>

              <p :class="`p-0 m-0`">
                By your age 67, the amount<br />
                you are missing out on could<br />
                be worth
                {{
                  sliderCompound(taxAvoided.traditionalIra) | currency("$", 0)
                }}
              </p>
              <h4>Tax Advantage Ratio</h4>
              <info-icon
                :tooltip="tooltip.taxAdvantageRatio.traditionalIra"
                tooltipType="description"
                :dynamic="true"
              >
                <h2>{{ taxAdvantageRatio.traditionalIra }}%</h2>
              </info-icon>
            </div>
            <div class="col5 col">
              <a
                href="https://www.learn.gigfinance.org/blog/how-to-get-started-with-a-traditional-ira/"
                target="_blank"
                rel="noopener noreferrer"
                @click="addInFirebase('traditionalIra')"
              >
                <div class="labelbox flex">
                  <h4>Get Started</h4>
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
                We know it can get complicated quickly between a new account and
                those old accounts from your old employer. Let us take care of
                maximizing your tax avoided amount based on contributions to
                different accounts (new & old).
              </p>
              <button
                style="float: right; border-radius: 46px"
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
                The Internal Revenue Service (IRS) offers different tax benefits
                for different retirement accounts. We used your inputs to
                determine the total allowable tax deductions that can be made
                from your business. The "Tax Avoided" value applies these
                deductions to calculate the amount of taxes you can avoid by
                putting money away for retirement. The 'Best Option' tag is
                applied to the retirement account that you qualify for, and the
                highest tax avoided amount according to your contribution
                selection. The dollar value by your age 67 is calculated with a
                compound interest growth rate of 8% with the number of years
                until you're age 67. You can read more in our FAQ section if you
                have questions!
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
<style scoped src="@/assets/css/retire-options.css"></style>