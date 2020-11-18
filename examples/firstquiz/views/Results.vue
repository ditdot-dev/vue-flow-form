/* will need to define css information for positiveNumber, negativeNumber,
assistText, subtitle */ /* will need to write the Profit After Expenses function
*/
<template>
<!-- <div>
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

</div> -->
<div class="containerR">
  <div class="mainR">
    <div class="arrowR">
      <router-link to="/input">
        <svg width="32px" height="20px" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.54169 16L13.5 1.41666L25.4583 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </router-link>
    </div>
    <div class="paraR">
      <h5>Tax Results For ABC Agency</h5>
    </div>
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
              <h4>
                Click here to see how much you can lower taxes with different
                retirement accounts
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4>Tax Breakdown For Year 2020 (In USD)</h4>
      </div>

      <div class="row4 flex">
        <div class="row4Box">
          <div class="row4Col1">
            <div class="line1">
              <p>Total Income: $110,000</p>
            </div>
            <div class="line2">
              <p>- Expenses: $30,000</p>
            </div>
            <div class="line"></div>
            <div class="line3">
              <p>Profit after Expenses: <span>$80,000</span></p>
            </div>
          </div>
          <div class="row4Col2">
            <div class="line1">
              <p>Medicare: $803.45</p>
            </div>
            <div class="line2">
              <p>+ Social Security: $3,435.42</p>
            </div>
            <div class="line"></div>
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
              <p>- Total Tax Balance: $11,339.75</p>
            </div>
            <div class="line"></div>
            <div class="line3">
              <p>Profit after Taxes: <span>$68,661</span></p>
            </div>
          </div>
          <div class="row5Col2">
            <div class="line1">
              <p>Self Employement Tax: $4,238.87</p>
            </div>
            <div class="line2">
              <p>+ CA State Tax: $2,426.40</p>
            </div>
            <div class="line4">
              <p>+ Federal Income Tax: $4,674.48</p>
            </div>
            <div class="line"></div>
            <div class="line3">
              <p>Total Tax Balance: <span>$11,339.75</span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="row6">
        <div class="flex">
          <router-link to="/retirement-options">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="20px" viewBox="78.833 5.5 42.333 28.334" aria-hidden="true">
              <path d="M117.963,8.031l-17.961,20.529L82.042,8.031l-2.041,1.784l18.98,21.695c0.258,0.295,0.629,0.463,1.02,0.463c0.39,0,0.764-0.168,1.02-0.463l18.98-21.695L117.963,8.031z" /></svg></router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {};
</script>

<style scoped>
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

.flex1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}

.flex2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.containerR {
  display: grid;
  grid-template-rows: 13vh minmax(205vh, min-content);
  grid-template-areas:
    "main"
    "content";
}

.mainR {
  grid-area: main;
  background-color: #ffffff;
  display: grid;
  grid-template-rows: 6vh 7vh;
  grid-template-areas:
    "arrow"
    "para";
}

.arrowR {
  grid-area: arrow;
  text-align: center;
  margin: 1rem 0;
  /* background-color: khaki; */
}

.paraR {
  grid-area: para;
  padding-left: 60px;
  margin: 0.5rem 0;
}

.contentR {
  grid-area: content;
  background-color: #fbe6da;
  display: grid;
  grid-template-rows: minmax(205vh, min-content);
  grid-template-columns: 1fr 20fr 1fr;
  grid-template-areas: ". mainContent .";
}

.mainContent {
  grid-area: mainContent;
  background-color: #fbe6da;
  display: grid;
  grid-template-rows:
    minmax(40vh, min-content) minmax(40vh, min-content) 10vh minmax(50vh,
      min-content) minmax(50vh, min-content) minmax(10vh, min-content);
  grid-template-areas:
    "row1"
    "row2"
    "row3"
    "row4"
    "row5"
    "row6";
}

.row1 {
  grid-area: row1;
  /* display: grid;
    grid-template-rows: minmax(30vh, min-content); */
  /* background-color: coral; */
}

.row1Box {
  width: 100%;
  height: 80%;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  border-radius: 28px;
  grid-row-gap: 1rem;
}

.row1Col1 p {
  font-size: 24px;
  margin-bottom: 0;
  padding-top: 0.5rem;
  /* font-family: var(--para-font); */
}

.row1Col1 h2 {
  font-size: 110px;
  color: #00b488;
  /* font-family: var(--heading2-font); */
}

/* .row1Col2 {
    background-color: greenyellow;
  } */
.row1Col2 p {
  font-size: 24px;
  margin-bottom: 0;
  padding-top: 0.5rem;
}

.row1Col2 h2 {
  font-size: 110px;
  color: #00b488;
}

.row2 {
  grid-area: row2;
  /* background-color: blueviolet; */
}

.row2box2 {
  width: 100%;
  height: 80%;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  border-radius: 28px;
  grid-row-gap: 1rem;
}

.row2Col1 {
  /* background-color: hotpink; */
  padding-left: 40px;
}

.row2Col1 p {
  font-size: 24px;
  margin-bottom: 0;
  padding-top: 0.5rem;
}

.row2Col1 h2 {
  font-size: 110px;
  color: #cc3939;
}

.row1Col2 {
  text-align: center !important;
}

.row2Col2Box {
  height: 112px;
  width: 285px !important;
  background-color: #00d49f;
  color: #fff;
  border-radius: 20px;
  padding: 15px;
}

.row2Col2Box:hover {
  cursor: pointer;
}

.row2Col2Box h4 {
  text-align: center;
  font-size: 20px;
  line-height: 24px;
  /* color: white; */
}

.row3 {
  grid-area: row3;
  /* background-color: firebrick; */
}

.row3 h1 {
  /* font-family: var(--heading-font); */
  /* font-size: 29px; */
  /* line-height: 36px; */
}

.row4 {
  grid-area: row4;
  /* background-color: tan; */
}

.row4Box {
  width: 80%;
  height: 80%;
  /* background-color: #FFFFFF; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-row-gap: 1rem;
  grid-column-gap: 2rem;
}

.row4Col1 {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-flow: column;
  padding-right: 5rem;
  border-radius: 28px;
}

.line1 p {
  font-size: 26px;
  line-height: 36px;
  font-family: var(--para-font);
  font-weight: var(--normal-font);
  padding-bottom: 10px;
}

.line2 p {
  font-size: 26px;
  line-height: 36px;
  font-family: var(--para-font);
  padding-bottom: 10px;
  font-weight: var(--normal-font);
}

.line3 p {
  font-size: 26px;
  line-height: 36px;
  font-family: var(--para-font);
  font-weight: var(--bold-font);
}

.line4 p {
  font-size: 26px;
  line-height: 36px;
  font-family: var(--para-font);
  padding-bottom: 10px;
  font-weight: var(--normal-font);
}

.line {
  height: 4px;
  width: 95%;
  background-color: #8e8a8a;
  margin-bottom: 10px;
}

.row4Col2 {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-flow: column;
  padding-right: 5rem;
  border-radius: 28px;
}

.row4Col1 .line3 span {
  color: #00b488;
}

.row4Col2 .line3 span {
  color: #cc3939;
}

.row5 {
  grid-area: row5;
  /* background-color: khaki; */
}

.row5Box {
  width: 80%;
  height: 80%;
  /* background-color: white; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-row-gap: 1rem;
  grid-column-gap: 1.6rem;
}

.row5Col1 {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-flow: column;
  padding-right: 5rem;
  border-radius: 28px;
}

.row5Col2 {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-flow: column;
  padding-right: 5rem;
  border-radius: 28px;
}

.row5Col1 .line3 span {
  color: #00b488;
}

.row5Col2 .line3 span {
  color: #cc3939;
}

.row6 {
  grid-area: row6;
  /* background-color: rebeccapurple; */
  display: grid;
  overflow-y: hidden;
  grid-template-rows: 10vh;
}

@media only screen and (max-width: 1320px) {
  .row2Col2Box {
    height: 100px;
    width: 240px;
    padding: 5px;
  }

  .row4Col1 {
    padding-right: 2rem;
  }

  .row4Col2 {
    padding-right: 2rem;
  }

  .row5Col1 {
    padding-right: 2rem;
  }

  .row5Col2 {
    padding-right: 2rem;
  }
}

@media only screen and (max-width: 1150px) {
  .line3 p {
    font-size: 24px;
  }
}

@media only screen and (max-width: 1050px) {
  .row1Col1 h2 {
    font-size: 70px;
  }

  .row1Box {
    margin-top: 1rem;
  }

  .row2box2 {
    margin-top: 1rem;
  }

  .row1Col1 p {
    font-size: 24px;
  }

  .row1Col2 p {
    font-size: 24px;
  }

  .row2Col1 p {
    font-size: 24px;
  }

  .row1Col2 h2 {
    font-size: 70px;
  }

  .row2Col1 h2 {
    font-size: 70px;
  }

  .row1Col1 {
    padding-left: 0;
  }

  .row2Col1 {
    padding-left: 0;
  }

  .row4Col1 {
    padding-right: 0.5rem;
  }

  .row4Col2 {
    padding-right: 0.5rem;
  }

  .row5Col1 {
    padding-right: 0.5rem;
  }

  .row5Col2 {
    padding-right: 0.5rem;
  }

  .line3 p {
    font-size: 22px;
  }
}

@media only screen and (max-width: 1250px) {
  .row2Col2 {
    display: flex;
    align-items: center;
  }

  .row4Box {
    width: 92%;
  }

  .row5Box {
    width: 92%;
  }
}

@media only screen and (max-width: 1050px) {
  .row1Box {
    width: 60%;
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .row2box2 {
    width: 60%;
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .row1Col2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .paraR {
    display: flex;
    justify-content: center;
  }

  .row3 {
    display: flex;
    align-items: center;
  }

  .row4Box {
    width: 100%;
    height: 70%;
  }

  .row5Box {
    width: 100%;
    height: 70%;
  }
}

@media only screen and (max-width: 901px) {
  .paraR {
    display: flex;
    justify-content: flex-start;
  }

  .row3 {
    display: flex;
    align-items: flex-start;
  }

  .row1Box {
    width: 80%;
    height: 85%;
  }

  .row2box2 {
    width: 80%;
    height: 85%;
  }

  .row4Col1 {
    width: 500px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .row4Col2 {
    width: 500px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .row4Box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding-bottom: 5rem;
    grid-row-gap: 5rem;
  }

  .row5Col1 {
    width: 500px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .row5Col2 {
    width: 500px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .row5Box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    grid-row-gap: 5rem;
  }
}

@media only screen and (max-width: 765px) {
  .row1Col1 h2 {
    font-size: 70px;
  }

  .row1Col1 p {
    font-size: 20px;
  }

  .row1Col2 p {
    font-size: 20px;
  }

  .row2Col1 p {
    font-size: 20px;
  }

  .row1Col2 h2 {
    font-size: 70px;
  }

  .row2Col1 h2 {
    font-size: 70px;
  }

  .paraR h1 {
    font-size: 24px;
  }

  .row3 h1 {
    font-size: 22px;
  }

  .row6 {
    padding-bottom: 0;
  }

  .row1Box {
    width: 95%;
  }

  .row2box2 {
    width: 95%;
  }
}

@media only screen and (max-width: 550px) {
  .row4Col1 {
    width: 350px;
    height: 200px;
    display: flex;
    align-items: flex-end;
  }

  .row4Col2 {
    width: 350px;
    height: 200px;
    display: flex;
    align-items: flex-end;
  }

  .row5Col1 {
    width: 350px;
    height: 200px;
    display: flex;
    align-items: flex-end;
  }

  .row5Col2 {
    width: 350px;
    height: 200px;
    display: flex;
    align-items: flex-end;
  }

  .line1 p {
    font-size: 18px;
    padding-bottom: 5px;
  }

  .line2 p {
    font-size: 18px;
    padding-bottom: 5px;
  }

  .line4 p {
    font-size: 18px;
    padding-bottom: 5px;
  }

  .line3 p {
    font-size: 20px;
  }

  .row3 h1 {
    font-size: 20px;
  }
}

@media only screen and (max-width: 450px) {
  .row1Box {
    width: 97%;
    height: 85%;
  }

  .row2box2 {
    width: 97%;
    height: 85%;
  }

  .row1Col1 h2 {
    font-size: 60px;
  }

  .row1Col1 p {
    font-size: 18px;
  }

  .row1Col2 p {
    font-size: 18px;
  }

  .row2Col1 p {
    font-size: 18px;
  }

  .row1Col2 h2 {
    font-size: 60px;
  }

  .row2Col1 h2 {
    font-size: 60px;
  }

  .paraR {
    padding-left: 20px;
    font-size: 20px;
  }

  .paraR h1 {
    font-size: 22px;
  }

  .row3 h1 {
    font-size: 18px;
  }
}

@media only screen and (max-width: 380px) {
  .row4Col1 {
    width: 300px;
    height: 200px;
  }

  .row4Col2 {
    width: 300px;
    height: 200px;
  }

  .row5Col1 {
    width: 300px;
    height: 200px;
  }

  .row5Col2 {
    width: 300px;
    height: 200px;
  }

  .row2Col2Box {
    height: 80px;
    width: 200px;
    padding: 2px;
  }

  .row2Col2Box h4 {
    font-size: 15px;
  }

  .row4Col2 .line3 p {
    font-size: 18px;
  }

  .row1Col1 h2 {
    font-size: 50px;
  }

  .row1Col1 p {
    font-size: 18px;
  }

  .row1Col2 p {
    font-size: 15px;
  }

  .row2Col1 p {
    font-size: 18px;
  }

  .row1Col2 h2 {
    font-size: 50px;
  }

  .row2Col1 h2 {
    font-size: 50px;
  }

  .paraR h1 {
    font-size: 20px;
  }

  .row3 h1 {
    font-size: 17px;
  }
}

@media only screen and (max-width: 350px) {
  .row4Col1 {
    width: 280px;
    height: 200px;
  }

  .row4Col2 {
    width: 280px;
    height: 200px;
  }

  .row5Col1 {
    width: 280px;
    height: 200px;
  }

  .row1Col1 h2 {
    font-size: 55px;
  }

  .row2Col1 h2 {
    font-size: 50px;
  }

  .row1Col2 h2 {
    font-size: 55px;
  }

  .row5Col2 {
    width: 280px;
    height: 200px;
  }

  .row4Col2 .line3 p {
    font-size: 16px;
  }

  .line3 p {
    font-size: 18px;
  }

  .row3 h1 {
    font-size: 15px;
  }
}

@media only screen and (max-width: 320px) {
  .row1 {
    margin-top: 1rem;
  }
}
</style>
