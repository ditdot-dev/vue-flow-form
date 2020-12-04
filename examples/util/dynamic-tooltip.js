export const DynamicTooltip = (
  type,
  {
    description = "",
    netEarning = "",
    taxDeduction = "",
    irsLimit = "",
    contributionMax = ""
  }
) => {
  if (!type) {
    return ` <div class="d-flex flex-column inner-body">
      <span class='text-left'>${description}</span>
      <div class="d-flex flex-column mt-3 justify-content-center align-items-center">
        <div class="d-flex">
          <span>Net Earning:</span>
          <span>${netEarning}</span>
        </div>
        <div class="d-flex">
          <span>SE Tax Deduction:</span>
          <span>${taxDeduction}</span>
        </div>
        <div class="d-flex">
          <span>IRS Limit:</span>
          <span>${irsLimit}</span>
        </div>
        <hr style="border-top: 0.1px solid grey;width:75%"/>
      </div>
      <div class="d-flex justify-content-center">
        <span>Contribution Maximum*:</span>
        <span>${contributionMax}</span>
      </div>
    </div>`;
  } else return "";
};
