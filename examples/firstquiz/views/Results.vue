/* will need to define css information for positiveNumber, negativeNumber, assistText, subtitle */
/* next step is to define all the mapState, then do all the mapGetters for the simple calc such as totalIncome */
<template>
<div>
  <h4> Your Results </h4>
  <div class="subtitle"> What’s yours after taxes </div>
  <span id="profitAfterTaxes" class="positiveNumber"></span> // mapGetters
  <div class="subtitle"> Amount of business deductions you qualify for </div>
  <span id="qbiDeduction" class="positiveNumber">{{ qbiDeduction }}</span>
  <span class="info-icon-1">i</span>
  <div class="subtitle"> How much taxes you owe in 2020 </div>
  <span id="taxBalance" class="negativeNumber"> </span> <button> //mapGetters
    <router-link to="/retirement-options">Let’s lower this with an retirement account!</router-link>
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
      Profit after Expenses: <span id="profitAfterExpenses"></span><br> // mapGetters
      - Total Tax Balance: <span id="taxBalance"></span><br> // mapGetters
      <strong> Profit After Taxes: <span class="positiveNumber" id="profitAfterTaxes"></span></strong> // mapGetters
    </div>
    <div class="col-lg-6 pr-5 mb-5 mb-lg-0">
      Self Employment Tax: {{ selfEmploymentTax }} <br>
      + <span id="filing_state" style="text-transform: uppercase;"></span> State Tax: {{ stateIncomeTax }} <span id="stateIncomeTax"></span><br> //mapGetters
      + Federal Income Tax: <span id="federalIncomeTax">{{ federalIncomeTax }} </span><br>
      <strong> Total Tax Balance: <span id="taxBalance" class="negativeNumber"></span></strong>
      (Effective Tax Rate: <span class="assistText" id="effectiveTaxRate"> {{ effectiveTaxRate }} </span>%)
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
      qbiDeduction: state => state.taxUpdate.qbiDeduction,
      expenses: state => state.userInput.expenses,
      income: state => state.userInput.income,
      medicareTax: state => state.taxUpdate.medicareTax,
      socialSecurityTax: state => state.taxUpdate.socialSecurityTax,
      selfEmploymentTax: state => state.taxUpdate.selfEmploymentTax,
      stateIncomeTax: state => state.taxUpdate.stateIncomeTax,
      federalIncomeTax: state => state.taxUpdate.federalIncomeTax,
      effectiveTaxRate: state => state.taxUpdate.effectiveTaxRate,
    }),
    ...Vuex.mapGetters('userInformation', [
      'totalIncome', 'profitAfterExpenses'
    ]),


  }
} // using computed since the data is reactive and will not change even if refreshed
</script>

<style>
</style>
