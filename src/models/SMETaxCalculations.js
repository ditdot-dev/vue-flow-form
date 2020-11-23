// Set the deductions from retirement contribution from W2 Income and/or Business Expenses

// Adjust deductions based on retirement account contribution modified
async function iraDrag(){
   var employeeContribution = chart0.data[0].options.dataPoints[0].y;
   var a = document.getElementById("userTaxInput")
   var b = {
     taxes: {
       expenseDeduction: parseInt(a.business_expense.value),
       w2Income: parseInt(a.w2Income.value) + parseInt(employeeContribution*1000),}
   };
   await postIraTaxData(b);
   await defineTax();

   var totalTaxAvoided0 = parseInt(iraTaxBalanceAvoid+ira_SSAvoid+ira_medicareAvoid);
   iraTaxRatio = (totalTaxAvoided0/(employeeContribution*-1000)*100).toFixed(2);
};

async function sepIraDrag(){
  var employerContribution = chart1.data[0].options.dataPoints[0].y;
  var a = document.getElementById("userTaxInput")
  var b = {
    taxes: {
      expenseDeduction: parseInt(a.business_expense.value) - parseInt(employerContribution*1000),
      w2Income: parseInt(a.w2Income.value),}
  };
  await postSepIraTaxData(b);
  await defineTax();

  var totalTaxAvoided1 = parseInt(sepIraTaxBalanceAvoid+sepIra_SSAvoid+sepIra_medicareAvoid);
  sepIraTaxRatio = (totalTaxAvoided1/(employerContribution*-1000)*100).toFixed(2);
};

async function simpleIraDrag(){
  var employerContribution = chart2.data[0].options.dataPoints[0].y;
  var employeeContribution = chart2.data[1].options.dataPoints[0].y;
  var a = document.getElementById("userTaxInput")
  var b = {
    taxes: {
      expenseDeduction: parseInt(a.business_expense.value) - parseInt(employerContribution),
      w2Income: parseInt(a.w2Income.value) + parseInt(employeeContribution),}
  };
  await postSimpleIraTaxData(b);
  await defineTax();

  var totalTaxAvoided2 = parseInt(simpleIraTaxBalanceAvoid+simpleIra_SSAvoid+simpleIra_medicareAvoid);
  simpleIraTaxRatio = (totalTaxAvoided2/((employeeContribution+employerContribution)*-1000)*100).toFixed(2);
};

async function individual401kDrag(){
  var employerContribution = chart3.data[0].options.dataPoints[0].y;
  var employeeContribution = chart3.data[1].options.dataPoints[0].y;
  var a = document.getElementById("userTaxInput")
  var b = {
    taxes: {
      expenseDeduction: parseInt(a.business_expense.value) - parseInt(employerContribution*1000),
      w2Income: parseInt(a.w2Income.value) + parseInt(employeeContribution*1000),}
  };
  await postIndividual401kTaxData(b);
  await defineTax();

  var totalTaxAvoided3 = parseInt(individual401kTaxBalanceAvoid+individual401k_SSAvoid+individual401k_medicareAvoid);
  individual401kTaxRatio = (totalTaxAvoided3/((employeeContribution+employerContribution)*-1000)*100).toFixed(2);
};

// Total tax avoided broken down into balance, social security, and medicare tax
function defineTax(){
// IRA
window.iraTaxBalanceAvoid = parseInt(preContributionTaxBalance - ira_taxBalance)
window.ira_SSAvoid = parseInt(socialSecurityTax - ira_socialSecurityTax)
window.ira_medicareAvoid = parseInt(medicareTax - ira_medicareTax)
// SEP-IRA
window.sepIraTaxBalanceAvoid = parseInt(preContributionTaxBalance - sepIra_taxBalance)
window.sepIra_SSAvoid = parseInt(socialSecurityTax - sepIra_socialSecurityTax)
window.sepIra_medicareAvoid = parseInt(medicareTax - sepIra_medicareTax)
// SIMPLE-IRA
window.simpleIraTaxBalanceAvoid = parseInt(preContributionTaxBalance - simpleIra_taxBalance)
window.simpleIra_SSAvoid = parseInt(socialSecurityTax - simpleIra_socialSecurityTax)
window.simpleIra_medicareAvoid = parseInt(medicareTax - simpleIra_medicareTax)
// Individual-401K
window.individual401kTaxBalanceAvoid = parseInt(preContributionTaxBalance - individual401k_taxBalance)
window.individual401k_SSAvoid = parseInt(socialSecurityTax - individual401k_socialSecurityTax)
window.individual401k_medicareAvoid = parseInt(medicareTax - individual401k_medicareTax)
};

// Modify the retirement contribution maximum based on age > 50
function catchupAgeContribution(){
  var a = document.getElementById("userTaxInput")
  var age = parseInt(a.age.value)
  if (age >= 50) {
    chart0.options.axisY2.minimum += -1;
    chart0.data[0].options.dataPoints[0].label = "Your Contribution up to $7,000"
// sep-ira has no catch up contribution since its employer only.
    chart2.options.axisY2.minimum += -3;
    chart2.data[0].options.dataPoints[0].label = "Your Contribution up to $16,500"
    chart3.options.axisY2.minimum += -6.5;
    chart3.data[0].options.dataPoints[0].label = "Your Contribution up to $26,000"
  } else { null;}
}

// Tax Advantaged Ratio: for every dollar in retirement, how much taxes avoided
// Equation = Tax Avoided / Total retirement contribution (employer + employee)
function taxCalc() {
  var totalTaxAvoided0 = parseInt(iraTaxBalanceAvoid+ira_SSAvoid+ira_medicareAvoid);
  var totalTaxAvoided1 = parseInt(sepIraTaxBalanceAvoid+sepIra_SSAvoid+sepIra_medicareAvoid);
  var totalTaxAvoided2 = parseInt(simpleIraTaxBalanceAvoid+simpleIra_SSAvoid+simpleIra_medicareAvoid);
  var totalTaxAvoided3 = parseInt(individual401kTaxBalanceAvoid+individual401k_SSAvoid+individual401k_medicareAvoid);
// calculate the ratio for IRA
  var iraTaxRatio;
  return iraTaxRatio = (totalTaxAvoided0/contribution*100).toFixed(2);

  // calculate the ratio for SEP IRA
  var sepIraTaxRatio;
  return sepIraTaxRatio = (totalTaxAvoided1/contribution*100).toFixed(2);

  // calculate the ratio for SIMPLE IRA
  var simpleIraTaxRatio;
  return simpleIraTaxRatio = (totalTaxAvoided2/contribution*100).toFixed(2);
    // calculate the ratio for Individual 401k
  var individual401kTaxRatio;
  return individual401kTaxRatio = (totalTaxAvoided3/contribution*100).toFixed(2);
};

// Out of pocket money: how much would've been added to your pocket without retirement contribution
// (Income - Tax balance before contribution) - (Income - Tax balance after contribution - contribution)


// Potential retirement Balance
// Principal (total contribution amount)* 1 + (8% interest rate)^(65 - Age)
