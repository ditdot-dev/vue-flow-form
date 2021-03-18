import * as store from "@/store/index.js";
import { TAX_API_KEY, TAX_API_SECRET } from "@/constants/env";
import { TAX_API_DEV_KEYS } from "@/utils/firebase-queries";

// api keys need to be moved to environment variables serviced by Netlify build....to be done
const sandbox_api_user = "https://sandbox-api.track.tax/v2/users/";

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
const getKeys = async () => {
  let app_key, app_secret;
  if (TAX_API_KEY) {
    app_key = TAX_API_KEY;
  } else {
    app_key = await TAX_API_DEV_KEYS();
    app_key = app_key.APP_KEY;
  }
  if (TAX_API_SECRET) {
    app_secret = TAX_API_SECRET;
  } else {
    app_secret = await TAX_API_DEV_KEYS();
    app_secret = app_secret.APP_SECRET;
  }
  return { app_key, app_secret };
};
// PUT method to Track.tax api to calculate the initial tax balance
export function taxData() {
  const { userInput } = store?.default?.state?.userInformation || {};
  const incomeData = {
    taxes: {
      "1099Income": parseInt(userInput?.income || 0),
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
  const { app_secret, app_key } = await getKeys();
  const { userInput, taxSummary } =
    store?.default?.state?.userInformation || {};
  let baseTax = await fetch(tax_calculation, {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": app_key,
      "X-Api-Secret": app_secret
    },
    method: "PUT",
    body: JSON.stringify(incomeData)
  }).catch(handleError);
  // "base tax calculation complete!";
  return await baseTax.json();
}

// Grab data from the sliders to update API calls and post data to RetirementOptions.vue
export async function repostData(personal, business) {
  const data = await formatContributionData(personal, business);
  const filter = await postTaxData(data);
  return filter.data;
}

async function formatContributionData(personal, business) {
  const { userInput, taxSummary } =
    store?.default?.state?.userInformation || {};
  const entity = userInput?.entity;
  const salary = parseInt(userInput?.salary);
  let data = {};
  if (
    (entity === "sCorporation" && salary > 0) ||
    (entity === "llc" && salary > 0)
  ) {
    return (data = {
      taxes: {
        expenseDeduction: parseInt(userInput?.expenses || 20000) + business,
        "1099Income": parseInt(userInput?.income || 120000),
        w2Income: parseInt(userInput?.salary || 40000) - personal
      }
    });
  } else {
    return (data = {
      taxes: {
        expenseDeduction: parseInt(userInput?.expenses || 20000) + business,
        "1099Income": parseInt(taxSummary?.totalIncome || 120000) - personal
      }
    });
  }
  return data;
}

async function repostApi(data) {
  const { app_secret, app_key } = await getKeys();
  let newTax = await fetch(tax_calculation, {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": app_key,
      "X-Api-Secret": app_secret
    },
    method: "PUT",
    body: JSON.stringify(data)
  }).catch(handleError);
  const response = await newTax.json();
  return response.data;
}
