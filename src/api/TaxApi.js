import * as store from "../store/index.js";

// api keys need to be moved to environment variables serviced by Netlify build....to be done
const sandbox_api_user = "https://sandbox-api.track.tax/v2/users/";
const app_key = "appId_d34638260c364a652c4673eb590af0fd";
const app_secret = "appSecret_f24d118ff90fa3252a6749dba1276e44";
const visitor =
  sandbox_api_user + "userId_15eaa4f418b381d9f3ddafd6d479cd746183f5ed";
const tax_calculation = visitor + "/taxes/2020";
var taxUpdate = [];
var taxUpdate0 = [];
var taxBalance;
var ira_taxBalance;
var sepIra_taxBalance;
var simpleIra_taxBalance;
var individual401k_taxBalance;
var baseCalculate = false;
var handleError = function(err) {
  console.warn(err);
  return err;
};
const { userInput } = store?.state?.userInformation || {};
const { taxSummary } = store?.state?.userInformation || {};
// PUT method to Track.tax api to calculate tax balance
export function taxData() {
  window.incomeData = {
    taxes: {
      "1099Income": parseInt(userInput.income),
      expenseDeduction: parseInt(userInput.expenses),
      w2Income: parseInt(userInput.salary),
      filingState: userInput.tax_filing_state,
      filingStatus: userInput.tax_filing_status,
      dependents: parseInt(userInput.dependents)
    }
  };
  return incomeData;
}

export async function postTaxData(incomeData) {
  let baseTax = await fetch(tax_calculation, {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": app_key,
      "X-Api-Secret": app_secret
    },
    method: "PUT",
    body: JSON.stringify(incomeData)
  }).catch(handleError);
  window.taxUpdate = await baseTax.json();
  console.log("base tax calculation complete!");
}

export async function repostData(personal, business) {
  return await postApi(personal, business);
}

async function postApi(personal, business) {
  console.log("new value for taxes calculated");
  const data = {
    taxes: {
      expenseDeduction: parseInt(userInput?.expenses || 90000) + business,
      "1099Income": parseInt(taxSummary?.totalIncome || 120000) - personal
    }
  };
  try {
    let response = await fetch(tax_calculation, {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": app_key,
        "X-Api-Secret": app_secret
      },
      method: "PUT",
      body: JSON.stringify(data)
    });
    response = await response.json();
    console.log(taxSummary?.totalIncome, response.data.taxBalance)
    return response.data;
  } catch (e) {
    handleError(e);
  }
}
/*
async function postIraTaxData(iraContribution){
  let iraTax = await (fetch (tax_calculation, {
    headers: {
        "Content-Type": "application/json",
        "X-Api-Key": app_key,
        "X-Api-Secret": app_secret,},
    method: "PUT",
    body: JSON.stringify(iraContribution)
  }).catch(handleError));
  window.taxUpdate0 = await iraTax.json();
  console.log("Ira calculation sucess!");
  // due to Track.tax only calculating taxes on the 1099 income portion, we are missing the w2 income taxes in the balance. This is a temporary work around until they release totalTaxBalance in Q1 2021.
  window.ira_taxBalance = parseInt(taxUpdate0.data.taxBalance) + parseInt(taxUpdate0.data.smartTaxRate * taxUpdate0.data.w2Income);
  window.ira_socialSecurityTax = parseInt(taxUpdate0.data.socialSecurityTax);
  window.ira_medicareTax = parseInt(taxUpdate0.data.medicareTax);
  };

async function postSepIraTaxData(sepIraContribution){
  let sepIraTax = await (fetch (tax_calculation, {
    headers: {
        "Content-Type": "application/json",
        "X-Api-Key": app_key,
        "X-Api-Secret": app_secret,},
    method: "PUT",
    body: JSON.stringify(sepIraContribution)
  }).catch(handleError));
  window.taxUpdate1 = await sepIraTax.json();
  console.log("SEP Ira calculation sucess!");
  // due to Track.tax only calculating taxes on the 1099 income portion, we are missing the w2 income taxes in the balance. This is a temporary work around until they release totalTaxBalance in Q1 2021.
  window.sepIra_taxBalance = parseInt(taxUpdate1.data.taxBalance) + parseInt(taxUpdate1.data.smartTaxRate * taxUpdate1.data.w2Income);
  window.sepIra_socialSecurityTax = parseInt(taxUpdate1.data.socialSecurityTax);
  window.sepIra_medicareTax = parseInt(taxUpdate1.data.medicareTax);
  };

async function postSimpleIraTaxData(simpleIraContribution){
  let simpleIraTax = await (fetch (tax_calculation, {
    headers: {
        "Content-Type": "application/json",
        "X-Api-Key": app_key,
        "X-Api-Secret": app_secret,},
    method: "PUT",
    body: JSON.stringify(simpleIraContribution)
  }).catch(handleError));
  window.taxUpdate2 = await simpleIraTax.json();
  console.log("Simple Ira calculation sucess!");
  // due to Track.tax only calculating taxes on the 1099 income portion, we are missing the w2 income taxes in the balance. This is a temporary work around until they release totalTaxBalance in Q1 2021.
  window.simpleIra_taxBalance = parseInt(taxUpdate2.data.taxBalance) + parseInt(taxUpdate2.data.smartTaxRate * taxUpdate2.data.w2Income);
  window.simpleIra_socialSecurityTax = parseInt(taxUpdate2.data.socialSecurityTax);
  window.simpleIra_medicareTax = parseInt(taxUpdate2.data.medicareTax);
  };

async function postIndividual401kTaxData(individual401kContribution){
  let individual401kTax = await (fetch (tax_calculation, {
    headers: {
        "Content-Type": "application/json",
        "X-Api-Key": app_key,
        "X-Api-Secret": app_secret,},
    method: "PUT",
    body: JSON.stringify(individual401kContribution)
  }).catch(handleError));
  window.taxUpdate3 = await individual401kTax.json();
  console.log("Individual 401k calculation sucess!");
  // due to Track.tax only calculating taxes on the 1099 income portion, we are missing the w2 income taxes in the balance. This is a temporary work around until they release totalTaxBalance in Q1 2021.
  window.individual401k_taxBalance = parseInt(taxUpdate3.data.taxBalance) + parseInt(taxUpdate3.data.smartTaxRate * taxUpdate3.data.w2Income);
  window.individual401k_socialSecurityTax = parseInt(taxUpdate3.data.socialSecurityTax);
  window.individual401k_medicareTax = parseInt(taxUpdate3.data.medicareTax);
  }
*/
