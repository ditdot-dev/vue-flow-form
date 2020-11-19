
export function taxTable() {
  window.tax_table_2020 = {
    single_deduction: 12400,
    married_deduction: 24800,
    married_filing_separately_deduction: 12400,
    head_of_household_deduction: 18650,
    single_tax_bracket: {
    // taxRate: [lowestAmount, highestAmount, rate (in decimal), taxDue]
      "10%": [0, 9875, 0.1, 0],
      "12%": [9876, 40125, 0.12, 987.50],
      "22%": [40126,85525,0.22, 4617.50],
      "24%": [85526,163300,0.24, 14605.50],
      "32%": [163301,207350,0.32, 33271.50],
      "35%": [207351,518400,0.35, 47367.50],
      "37%": [518401,Infinity,0.37, 156235]
    },
    head_of_household_tax_bracket: {
    },
    married_tax_bracket: {
    },
    married_filing_separately_tax_bracket: {
    },
  }
  return tax_table_2020
}
