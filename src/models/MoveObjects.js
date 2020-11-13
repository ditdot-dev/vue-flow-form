// this is a file that will include functions to transport data objects across different vue files

export function storeResults(){
  window.profitAfterTaxes = parseInt(taxUpdate.data["1099Income"])+parseInt(taxUpdate.data.w2Income)-parseInt(taxUpdate.data.expenseDeduction)-parseInt(taxUpdate.data.taxBalance);
  window.income = parseInt(taxUpdate.data["1099Income"])+parseInt(taxUpdate.data.w2Income);
  window.preContributionTaxBalance = parseInt(taxUpdate.data.taxBalance) + parseInt(taxUpdate.data.smartTaxRate * taxUpdate.data.w2Income);
  var qbiDeduction = taxUpdate.data.qbiDeduction.toLocaleString('en-US');
  var taxBalance = preContributionTaxBalance.toLocaleString('en-US');
  var totalIncome = income.toLocaleString('en-US');
  var expenses = taxUpdate.data.expenseDeduction.toLocaleString('en-US');
  var profitAfterExpenses = parseInt(taxUpdate.data["1099Income"])+parseInt(taxUpdate.data.w2Income)-parseInt(taxUpdate.data.expenseDeduction);
  var medicareTax = taxUpdate.data.medicareTax.toLocaleString('en-US');
  var socialSecurityTax = taxUpdate.data.socialSecurityTax.toLocaleString('en-US');
  var selfEmploymentTax = taxUpdate.data.selfEmploymentTax.toLocaleString('en-US');
  var filing_state = "(" + taxUpdate.data.filingState + ")";
  var stateIncomeTax = taxUpdate.data.stateIncomeTax.toLocaleString('en-US')
  var federalIncomeTax = taxUpdate.data.federalIncomeTax.toLocaleString('en-US');
  var year = taxUpdate.data.year.toLocaleString('en-US')
  var effectiveTaxRate = (parseFloat(taxUpdate.data.smartTaxRate) * 100).toFixed(2)
  }


  export function postResults(){
  }
