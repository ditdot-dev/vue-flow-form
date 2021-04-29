export const userInputs =
  JSON.parse(localStorage.getItem("vuex"))?.userInformation?.userInput || {};
export const BASE_URL = process.env.VUE_APP_BASE_URL || "http://localhost:9000";
export const localUserInputs = () => {
  return (
    JSON.parse(localStorage.getItem("vuex"))?.userInformation?.userInput || {}
  );
};

export const FIREBASE_API_KEY = process.env.VUE_APP_FIREBASE_API_KEY;
export const FIREBASE_APP_ID = process.env.VUE_APP_FIREBASE_APP_ID;
export const TAX_API_KEY = process.env.VUE_APP_TAX_APP_KEY;
export const TAX_API_SECRET = process.env.VUE_APP_TAX_APP_SECRET;
export const NODE_ENV = process.env.VUE_APP_NODE_ENV;
// example User Input
// age: "45"
// business_name: "soft"
// dependents: "2"
// employee_count: "lessthan100"
// entity: "sCorporation"
// expenses: "423234"
// first_name: "sarmed"
// income: "5423553"
// salary: ""
// tax_filing_state: "co"
// tax_filing_status: "marriedFilingSeparately"
