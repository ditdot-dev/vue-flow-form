<template>
  <div class="containerR">
    <div class="mainR">
      <div class="arrowR">
        <router-link to="/" aria-label="restart the input page">
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
      <div class="paraR">
        <p>{{ name }} {{ businessName }} Tax Results</p>
      </div>
    </div>
    <div class="contentR">
      <div class="mainContent">
        <div class="row1 flex">
          <div class="row1Box">
            <div class="row1Col1">
              <p>What's yours after taxes</p>
              <p class="numbers" v-if="profitAfterTaxes">
                {{ profitAfterTaxes | currency("$", 0) }}
              </p>
            </div>
            <div class="row1Col2">
              <p>How much taxes you owe in 2020</p>
              <p style="color: #cc3939" class="numbers" v-if="taxBalance">
                {{ taxBalance | currency("$", 0) }}
              </p>
            </div>
            <div class="row1Col2">
              <p>
                Amount of total deduction you quality for
                <info-icon
                  onlyClass="none"
                  tooltip="This is all your deductions applied from your business to personal taxes. This includes your tax filing status deduction, and quarterly business income deductions. The Tax Cuts and Job Act passed in 2017 allows eligible self-employed and small-business owners to deduct up to 20% of their qualified business income on their taxes.
                Your accountant and/or tax software will calculate this value for you in your annual tax returns"
                >
                </info-icon>
              </p>
              <p class="numbers" v-if="totalDeduction">
                {{ totalDeduction | currency("$", 0) }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h4 class="taxbreakdowntext">Tax Breakdown For Year 2020 (In USD)</h4>
        </div>

        <div class="row4 flex">
          <div class="row4Box">
            <div class="row4Col1">
              <div class="line1">
                <p>
                  Total Income:
                  <span class="dollaramount">
                    {{ totalIncome | currency }}
                  </span>
                </p>
                <p class="subtitleinfo">(Business + Personal Income)</p>
              </div>
              <div class="line2">
                <p>
                  <span class="addminus">-</span> Expenses:
                  <span class="dollaramount"> {{ expenses | currency }} </span>
                </p>
              </div>
              <div class="line"></div>
              <div class="line3">
                <p>
                  Profit after Expenses:
                  <span class="dollaramount">{{
                    profitAfterExpenses | currency
                  }}</span>
                </p>
              </div>
            </div>
            <div class="row4Col2">
              <div class="line1">
                <p>
                  Medicare:
                  <span class="dollaramount">
                    {{ medicareTax | currency }}
                  </span>
                </p>
              </div>
              <div class="line2">
                <p>
                  <span class="addminus">+</span> Social Security:
                  <span class="dollaramount">{{
                    socialSecurityTax | currency
                  }}</span>
                </p>
              </div>
              <div class="line"></div>
              <div class="line3">
                <p>
                  Self Employement Tax:
                  <span class="dollaramount">{{
                    selfEmploymentTax | currency
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row5 flex">
          <div class="row5Box">
            <div class="row5Col1">
              <div class="line1">
                <p>
                  Profit After Expenses:
                  <span class="dollaramount">
                    {{ profitAfterExpenses | currency }}</span
                  >
                </p>
              </div>
              <div class="line2">
                <p>
                  <span class="addminus">-</span> Total Tax Balance:
                  <span class="dollaramount">
                    {{ taxBalance | currency }}
                  </span>
                </p>
              </div>
              <div class="line"></div>
              <div class="line3">
                <p>
                  Profit after Taxes:
                  <span class="dollaramount" v-if="profitAfterTaxes">{{
                    profitAfterTaxes | currency
                  }}</span>
                </p>
              </div>
            </div>
            <div class="row5Col2">
              <div class="line1">
                <p>
                  Self Employement Tax:
                  <span class="dollaramount">{{
                    selfEmploymentTax | currency
                  }}</span>
                </p>
              </div>
              <div class="line2">
                <p>
                  <span class="addminus">+</span>
                  <span style="text-transform: uppercase">{{
                    filing_state
                  }}</span>
                  State Tax:
                  <span class="dollaramount">{{
                    stateIncomeTax | currency
                  }}</span>
                </p>
              </div>
              <div class="line4">
                <p>
                  <span class="addminus">+</span> Federal Income Tax:
                  <span class="dollaramount">
                    {{ federalIncomeTax | currency }}
                  </span>
                </p>
              </div>
              <div class="line"></div>
              <div class="line3">
                <p>
                  Total Tax Balance:
                  <span class="dollaramount" v-if="taxBalance">{{
                    taxBalance | currency
                  }}</span>
                </p>
                <p class="subtitleinfo2">
                  (Effective Tax Rate:
                  {{ (effectiveTaxRate * 100).toFixed(2) }}%)
                </p>
              </div>
            </div>
          </div>
        </div>
        <router-link
          class="routemid"
          to="/retirement-options"
          aria-label="next page to retirement options"
        >
          <button class="common-button">
            Check out retirement account options
          </button>
        </router-link>
      </div>
    </div>
    <loading :active.sync="loader" :can-cancel="false" loader="dots" />
  </div>
</template>

<script>
import Vue from "vue";
import Loading from "vue-loading-overlay";

import Vuex, { mapActions } from "vuex";
import infoIcon from "../components/info-icon";
import Vue2Filters from "vue2-filters";
import store from "../../../src/store";
import { progressiveTax } from "../../../src/taxData/SMETaxCalculations";
import { logging } from "@/utils/logging";
Vue.use(Vue2Filters);

export default {
  name: "Results",
  components: {
    infoIcon,
    Loading
  },
  data() {
    return {
      progressiveTax,
      async function() {
        await logging(this.$store);
      }
    };
  },
  // using computed since the data is reactive and will not change even if refreshed
  computed: {
    ...Vuex.mapState("userInformation", {
      totalIncome: state => state.taxSummary.totalIncome,
      profitAfterExpenses: state => state.taxSummary.profitAfterExpenses,
      taxBalance: state => state.taxUpdate.taxBalance,
      profitAfterTaxes: state => state.taxSummary.profitAfterTaxes,
      totalDeduction: state => state.taxSummary.totalDeduction,
      qbiDeduction: state => state.taxUpdate.qbiDeduction,
      name: state => state.userInput.first_name + "'s",
      businessName: state => state.userInput.business_name,
      expenses: state => state.userInput.expenses,
      filing_state: state => state.userInput.tax_filing_state,
      medicareTax: state => state.taxUpdate.medicareTax,
      socialSecurityTax: state => state.taxUpdate.socialSecurityTax,
      selfEmploymentTax: state => state.taxUpdate.selfEmploymentTax,
      stateIncomeTax: state => state.taxUpdate.stateIncomeTax,
      federalIncomeTax: state => state.taxUpdate.federalIncomeTax,
      effectiveTaxRate: state => state.taxUpdate.smartTaxRate,
      userInput: state => state.userInput,
      totalDeduction: state => state.taxSummary.totalDeduction,
      totalFederalTax: state => state.taxSummary.totalFederalTax,
      getProgressiveTax: state => state.progressiveTax,
      totalTaxBalance: state => state.taxUpdate.totalTaxBalance,
      totalProfitAfterTaxes: state => state.taxSummary.totalProfitAfterTaxes
    }),
    ...Vuex.mapState("loader", {
      loader: state => state.loader
    })
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped src="../css/results.css"></style>
