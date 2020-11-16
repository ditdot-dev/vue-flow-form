/* will need to define css information for positiveNumber, negativeNumber, assistText, subtitle */
/* next step is to define all the mapState, then do all the mapGetters for the simple calc such as totalIncome */
<template>
<div>
  <h4> {{ name }} {{ businessName }} Tax Results </h4>
  <div class="subtitle"> What’s yours after taxes </div>
  <span class="positiveNumber"> {{ profitAfterTaxes }}</span> // mapGetters
  <div class="subtitle"> Amount of business deductions you qualify for </div>
  <span class="positiveNumber">{{ qbiDeduction }}</span>
  <span class="info-icon-1">i</span>
  <div class="subtitle"> How much est. taxes you owe in 2020 </div>
  <span class="negativeNumber">{{ taxBalance }}</span> <button>
    <router-link to="/retirement-options">Click here to see how much you can lower taxes with different retirement accounts</router-link>
  </button><br>


  <br>
  <div class="subtitle"> Tax Breakdown for Year 2020 (in USD) </div>

  <div class="row" id="app">
    <div class="col-lg-6 pr-5 mb-5 mb-lg-0">
      Total Income: {{ totalIncome }} <br>
      <div class="assistText">(Business + Personal Income)</div>
      - Expenses: {{ expenses }}<br>
      <strong> Profit after Expenses: <span class="positiveNumber">{{ profitAfterExpenses }}</span></strong>
    </div>
    <div class="col-lg-6 pr-5 mb-5 mb-lg-0">
      Medicare: {{ medicareTax }}<br>
      + Social Security: {{ socialSecurityTax }}<br>
      <strong> Self Employment Tax: <span class="negativeNumber"> {{ selfEmploymentTax }}</span></strong>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-6 pr-5 mb-5 mb-lg-0">
      Profit after Expenses: {{ profitAfterExpenses }} <br>
      - Total Tax Balance: {{ taxBalance }} <br>
      <strong> Profit After Taxes: <span class="positiveNumber">{{ profitAfterTaxes }}</span></strong>
    </div>
    <div class="col-lg-6 pr-5 mb-5 mb-lg-0">
      Self Employment Tax: {{ selfEmploymentTax }} <br>
      + Business <span style="text-transform: uppercase;">{{ filing_state }}</span> Income Tax: {{ stateIncomeTax }} <br>
      + Business Federal Income Tax: {{ federalIncomeTax }}<br>
      + Personal Federal Income Tax: {{ w2Tax }} <br>
      <strong> Total Tax Balance: <span class="negativeNumber">{{ taxBalance }}</span></strong><br>
      (Effective Tax Rate: <span class="assistText" id="effectiveTaxRate"> {{ effectiveTaxRate }}</span>%)
    </div>
  </div>

</div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import * as MoveObjects from "../../../src/models/MoveObjects";

export default {
  name: "Results",
  computed: {
    ...Vuex.mapState('userInformation', {
      businessName: state => state.userInput.business_name,
      name: state => state.userInput.first_name + "'s",
      qbiDeduction: state => state.taxUpdate.qbiDeduction,
      expenses: state => state.userInput.expenses,
      income: state => state.userInput.income,
      filing_state: state => state.userInput.tax_filing_state,
      medicareTax: state => state.taxUpdate.medicareTax,
      socialSecurityTax: state => state.taxUpdate.socialSecurityTax,
      selfEmploymentTax: state => state.taxUpdate.selfEmploymentTax,
      stateIncomeTax: state => state.taxUpdate.stateIncomeTax,
      federalIncomeTax: state => state.taxUpdate.federalIncomeTax,
      effectiveTaxRate: state => state.taxUpdate.effectiveTaxRate * 100,
    }),
    ...Vuex.mapGetters('userInformation', [
      'totalIncome', 'profitAfterExpenses', 'w2Tax', 'taxBalance', 'profitAfterTaxes',
    ]),
  }
} // using computed since the data is reactive and will not change even if refreshed
</script>

<style>
</style>
