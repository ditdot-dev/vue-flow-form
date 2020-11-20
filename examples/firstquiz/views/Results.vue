<template>
<div class="containerR">
  <div class="mainR">
    <div class="arrowR">
      <router-link to="/input" aria-label="restart the input page">
        <svg width="32px" height="20px" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.54169 16L13.5 1.41666L25.4583 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
            <h2>{{ profitAfterTaxes }}</h2>
          </div>
          <div class="row1Col2 flex1">
            <p>Amount of business deduction you quality for
              <info-icon
                tooltip="The Tax Cuts and Job Act passed in 2017 allows eligible self-employed and small-business owners to deduct up to 20% of their qualified business income on their taxes. Your accountant and/or tax software will calculate this for you in your annual tax returns">
              </info-icon>
            </p>
            <h2>{{ totalDeduction }}</h2>
          </div>
        </div>
      </div>
      <div class="row2 flex">
        <div class="row2box2">
          <div class="row2Col1 ">
            <p>How much taxes you owe in 2020</p>
            <h2>{{ taxBalance }}</h2>
          </div>
          <div class="row2Col2">
            <div class="row2Col2Box flex1" v-on:click="getTaxSummary">
              <router-link to="/retirement-options" aria-label="next page to retirement options">
                <p>
                  Click here to see how much you can lower taxes with different
                  retirement accounts
                </p>
              </router-link>
            </div>
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
              <p>Total Income: {{ totalIncome }}</p>
              <p class="subtitleinfo">(Business + Personal Income)</p>
            </div>
            <div class="line2">
              <p>- Expenses: {{ expenses }}</p>
            </div>
            <div class="line"></div>
            <div class="line3">
              <p>Profit after Expenses: <span>{{ profitAfterExpenses }}</span></p>
            </div>
          </div>
          <div class="row4Col2">
            <div class="line1">
              <p>Medicare: {{ medicareTax }}</p>
            </div>
            <div class="line2">
              <p>+ Social Security: {{ socialSecurityTax }}</p>
            </div>
            <div class="line"></div>
            <div class="line3">
              <p>Self Employement Tax: <span>{{ selfEmploymentTax }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="row5 flex">
        <div class="row5Box">
          <div class="row5Col1">
            <div class="line1">
              <p>Profit After Expenses: {{ profitAfterExpenses }}</p>
            </div>
            <div class="line2">
              <p>- Total Tax Balance: {{ taxBalance }}</p>
            </div>
            <div class="line"></div>
            <div class="line3">
              <p>Profit after Taxes: <span>{{ profitAfterTaxes }}</span></p>
            </div>
          </div>
          <div class="row5Col2">
            <div class="line1">
              <p>Self Employement Tax: {{ selfEmploymentTax }}</p>
            </div>
            <div class="line2">
              <p>+ <span style="text-transform: uppercase;">{{ filing_state }}</span> State Tax: {{ stateIncomeTax }}</p>
            </div>
            <div class="line4">
              <p>+ Federal Income Tax: {{ federalIncomeTax }}</p>
            </div>
            <div class="line"></div>
            <div class="line3">
              <p>Total Tax Balance: <span>{{ taxBalance }}</span></p>
              <p class="subtitleinfo2">(Effective Tax Rate: {{ effectiveTaxRate }}%)</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row6">
        <div class="flex">
          <router-link to="/retirement-options" aria-label="next page to retirement options">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="20px" viewBox="78.833 5.5 42.333 28.334" aria-hidden="true">
              <path d="M117.963,8.031l-17.961,20.529L82.042,8.031l-2.041,1.784l18.98,21.695c0.258,0.295,0.629,0.463,1.02,0.463c0.39,0,0.764-0.168,1.02-0.463l18.98-21.695L117.963,8.031z" /></svg></router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import infoIcon from "../components/info-icon";

export default {
  name: "Results",
  components: {
    infoIcon,
  },
  data() {
    return {
      function() {
        console.log(this.$store)
      }
    }
  },
  // using computed since the data is reactive and will not change even if refreshed
  computed: {
    ...Vuex.mapState('userInformation', {
      name: state => state.userInput.first_name + "'s",
      businessName: state => state.userInput.business_name,
      qbiDeduction: state => "$" + state.taxUpdate.qbiDeduction, //.toLocaleString('en-US'),
      expenses: state => "$" + state.userInput.expenses,
      income: state => "$" + state.userInput.income,
      filing_state: state => state.userInput.tax_filing_state,
      medicareTax: state => "$" + state.taxUpdate.medicareTax,
      socialSecurityTax: state => "$" + state.taxUpdate.socialSecurityTax,
      selfEmploymentTax: state => "$" + state.taxUpdate.selfEmploymentTax,
      stateIncomeTax: state => "$" + state.taxUpdate.stateIncomeTax,
      federalIncomeTax: state => "$" + state.taxUpdate.federalIncomeTax,
      effectiveTaxRate: state => (state.taxUpdate.smartTaxRate * 100).toFixed(2),
    }),
    ...Vuex.mapGetters('userInformation', [
      'totalDeduction', 'totalIncome', 'profitAfterExpenses',
    ]), //, 'w2Tax', 'taxBalance', 'profitAfterTaxes' <- not working at this time.

  },
  methods: {
    ...Vuex.mapActions('calculatorDrag', [
      'getTaxSummary',
    ])
  },
};
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
  margin: 0.4rem 0;
  /* background-color: khaki; */
}

.paraR {
  grid-area: para;
  padding-left: 60px;
  /* margin: 0.5rem 0; */
}

.paraR p {
  font-size: 29px;
  font-weight: bold;
  font-family: Karla;
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
}

.row1Box {
  width: 100%;
  height: 80%;
  background-color: #ffffff;
  display: grid;
  padding-left: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  border-radius: 28px;
  grid-row-gap: 1rem;
}

.row1Col1 p {
  font-size: 26px;
  margin-bottom: 0;
  padding-top: 0.5rem;
  padding-left: 0.8rem;
  font-family: Manrope;
}

.row1Col1 h2 {
  font-size: 110px;
  color: #00b488;
  /* font-family: var(--heading2-font); */
}

.row1Col2 p {
  font-size: 26px;
  font-family: Manrope;
  margin-bottom: 0;
  padding-top: 0.5rem;
  margin-left: -2.2rem;
}

.row1Col2 h2 {
  font-size: 110px;
  font-family: Karla;
  margin-left: -17rem;
  font-weight: bold;
  color: #00b488;
}

.subtitleinfo {
  font-size: 12px !important;
  font-family: Manrope !important;
  padding: 0 !important;
  margin: -0.5rem 0;
}

.subtitleinfo2 {
  font-size: 12px !important;
  font-family: Manrope !important;
  padding: 0 !important;
  margin: -0.5rem 0;
  text-align: center;
  font-weight: unset !important;
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
  padding-left: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  border-radius: 28px;
  grid-row-gap: 1rem;
}

.row2Col1 p {
  font-size: 26px;
  font-family: Manrope;
  margin-bottom: 0;
  padding-left: 0.8rem;
  padding-top: 0.5rem;
}

.row2Col1 h2 {
  font-size: 110px;
  font-weight: bold;
  font-family: Karla;
  color: #cc3939;
}

.row2Col2 {
  justify-content: center;
}

.row2Col2Box {
  height: 112px;
  width: 285px !important;
  background: linear-gradient(180deg, #00d49f 0%, #009c74 100%);
  color: white;
  border-radius: 20px;
  padding: 15px;
}

.row2Col2Box:hover {
  cursor: pointer;
}

.row2Col2Box p {
  text-align: center;
  font-size: 20px;
  font-family: Karla;
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

.taxbreakdowntext {
  font-size: 29px;
  font-family: Karla;
  font-weight: bold;
  margin: 1rem 0;
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
  align-items: flex-start;
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
    font-size: 110px;
    font-family: Karla;
    font-weight: bold;
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
    margin-left: 0rem;
  }

  .row2Col1 p {
    font-size: 24px;
  }

  .row1Col2 h2 {
    font-size: 70px;
    margin-left: 1rem;
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

  .row1Col1 h2 {
    font-size: 70px;
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

  .taxbreakdowntext {
    font-size: 24px;
    margin: 0;
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

  .taxbreakdowntext {
    font-size: 24px;
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
