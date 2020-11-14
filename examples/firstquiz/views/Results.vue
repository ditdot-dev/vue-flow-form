/* will need to define css information for positiveNumber, negativeNumber, assistText, subtitle */
/* will need to write the Profit After Expenses function */
<template>
<div>
  <h4> Your Results </h4>
  <div class="subtitle"> What’s yours after taxes </div>
  <span id="profitAfterTaxes" class="positiveNumber"></span>
  <div class="subtitle"> Amount of business deductions you qualify for </div>
  <span id="qbiDeduction" class="positiveNumber"></span>
  <div class="subtitle"> How much taxes you owe in 2020 </div>
  <span id="taxBalance" class="negativeNumber"></span> <button>
    <router-link to="/retirement-options">Let’s lower this with an retirement account!</router-link>
  </button><br>


  <br>
  <div class="subtitle"> Tax Breakdown for Year 2020 (in USD) </div>

  <div class="row">
    <div class="col-lg-6 pr-5 mb-5 mb-lg-0">
      Total Income: <span id="totalIncome"></span><br>
      <div class="assistText">(Business + Personal Income)</div>
      - Expenses: <span id="expenses"></span><br>
      <strong> Profit after Expenses: <span class="positiveNumber" id="profitAfterExpenses">{{profitAfterExpenses}}</span></strong>
    </div>
    <div class="col-lg-6 pr-5 mb-5 mb-lg-0">
      Medicare: <span id="medicareTax"></span><br>
      + Social Security: <span id="socialSecurityTax"></span><br>
      <strong> Self Employment Tax: <span class="negativeNumber" id="selfEmploymentTax"></span></strong>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-6 pr-5 mb-5 mb-lg-0">
      Profit after Expenses: <span id="profitAfterExpenses"></span><br>
      - Total Tax Balance: <span id="taxBalance"></span><br>
      <strong> Profit After Taxes: <span class="positiveNumber" id="profitAfterTaxes"></span></strong>
    </div>
    <div class="col-lg-6 pr-5 mb-5 mb-lg-0">
      Self Employment Tax: <span class="negativeNumber" id="selfEmploymentTax"></span><br>
      + <span id="filing_state" style="text-transform: uppercase;"></span> State Tax: <span id="stateIncomeTax"></span><br>
      + Federal Income Tax: <span id="federalIncomeTax"></span><br>
      <strong> Total Tax Balance: <span id="taxBalance" class="negativeNumber"></span></strong>
      (Effective Tax Rate: <span class="assistText" id="effectiveTaxRate"></span>%)
    </div>
  </div>

</div>
</template>

<script>
import * as MoveObjects from "../../../src/models/MoveObjects";

export default {
  name: "Results",
  components: {},
  data() {},
  mounted() {},
  computed: {
    profitAfterExpenses() {
      return this.$store.state.taxSummary.profitAfterExpenses
    },

  },
} // using computed since the data is reactive and will not change even if refreshed
</script>

<style>
</style>
