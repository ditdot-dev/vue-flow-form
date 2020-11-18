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
      Total Income: <span id="income"></span><br>
      <div class="assistText">(Business + Personal Income)</div>
      - Expenses: <span id="expenses"></span><br>
      <strong> Profit after Expenses: <span class="positiveNumber" id="profitAfterExpenses"></span></strong>
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
    </div>
  </div>

</div>
 <!-- <div class="containerR">
      <div class="mainR">
        <div class="arrowR">
          <h1 align="center">^</h1>
        </div>
        <div class="paraR"><h5>Tax Results For ABC Agency</h5></div>
      </div>
      <div class="contentR">
        <div class="mainContent">
          <div class="row1 flex">
                    <div class="row1Box">
                        <div class="row1Col1 flex1">
                            <p>What`s yours after taxes</p>
                            <h2>$68,661</h2>
                        </div>
                        <div class="row1Col2 flex1">
                            <p>Amount of business deduction you quality for</p>
                            <h2>$5,578</h2>
                        </div>
                    </div>
                </div>
                <div class="row2 flex">
                    <div class="row2box2">
                        <div class="row2Col1 flex1">
                            <p>How much taxes you owe in 2020</p>
                            <h2>$11,339.75</h2>
                        </div>
                        <div class="row2Col2 flex1">
                            <div class="row2Col2Box flex1">
                                <h4>Click here to see how much you can lower taxes with different retirement accounts</h4>
                            </div>
                        </div>
                    </div>
                </div>
          <div class="flex1">
            <h4>Tax Breakdown For Year 2020 (In USD)</h4>
          </div>

          <div class="row4 flex">
            <div class="row4Box ">
              <div class="row4Col1 ">
                <div class="line1">
                  <p>Total Income: $110,000</p>
                </div>
                <div class="line2">
                  <p> - Expenses: $30,000</p>
                </div>
                <div class="line">
                </div>
                <div class="line3">
                  <p>Profit after Expenses: <span>$80,000</span></p>
                </div>
              </div>
              <div class="row4Col2">
                <div class="line1">
                  <p>Medicare: $803.45</p>
                </div>
                <div class="line2">
                  <p> + Social Security: $3,435.42</p>
                </div>
                <div class="line">
                </div>
                <div class="line3">
                  <p>Self Employement Tax: <span>$4,238.87</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="row5 flex">
            <div class="row5Box">
              <div class="row5Col1">
                <div class="line1">
                  <p>Profit After Expenses: $80,000</p>
                </div>
                <div class="line2">
                  <p> - Total Tax Balance: $11,339.75</p>
                </div>
                <div class="line">
                </div>
                <div class="line3">
                  <p>Profit after Taxes: <span>$68,661</span></p>
                </div>
              </div>
              <div class="row5Col2">
                <div class="line1">
                  <p>Self Employement Tax: $4,238.87</p>
                </div>
                <div class="line2">
                  <p> + CA State Tax: $2,426.40 </p>
                </div>
                <div class="line4">
                  <p>+ Faderal Income Tax: $4,674.48</p>
                </div>
                <div class="line">
                </div>
                <div class="line3">
                  <p>Total Tax Balance: <span>$11,339.75</span></p>
                </div>
              </div>
            </div>
          </div>


          <div class="row6">
            <div class="arrowDown flex">
              <h1>v</h1>
            </div>
          </div>
        </div>
      </div>
    </div> -->
</template>

<script>
// import "../../../src/assets/css/results.css";
export default{
  
}
</script>

<style>
</style>
