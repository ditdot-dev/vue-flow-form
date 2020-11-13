// this is a file that will include functions to transport data objects across different vue files

export function postResults(){
  var profitAfterTaxes = parseInt(taxUpdate.data["1099Income"])+parseInt(taxUpdate.data.w2Income)-parseInt(taxUpdate.data.expenseDeduction)-parseInt(taxUpdate.data.taxBalance);
  
  }
