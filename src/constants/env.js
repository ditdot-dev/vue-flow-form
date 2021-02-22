export const userInput = JSON.parse(localStorage.getItem("vuex"))
  ?.userInformation?.userInput || {};
  
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
