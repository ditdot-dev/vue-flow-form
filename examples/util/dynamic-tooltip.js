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
      <div class="d-flex flex-column mt-3 justify-content-center align-items-end mr-5">
        <div class="d-flex">
          <span>Net Earning:</span>
          <span class="ml-2 ">${netEarning}</span>
        </div>
		<div class="d-flex">
		<span class="mx-2">x</span>
          <span>SE Tax Deduction:</span>
          <span class="ml-2">${taxDeduction}</span>
        </div>
		<div class="d-flex">
		<span class="mx-2">x</span>
          <span>IRS Limit:</span>
          <span class="ml-2 ">${irsLimit}</span>
        </div>
        </div>
        <hr style="border-top: 0.1px solid grey;width:70%" class="justify-self-start"/>
      <div class="d-flex justify-content-end mr-5">
        <span>Contribution Maximum*:</span>
        <span class="ml-2 ">${contributionMax}</span>
      </div>
    </div>`;
  }
  if (type === "description") {
    return ` <div class="d-flex flex-column inner-body">
      <span class='text-left'>${description}</span>
    </div>`;
  }
  if (type === "points") {
    return ` <div class="d-flex flex-column inner-body">
	  <ul class="d-flex flex-column align-items-start">
	 	${(description || []).map(des => `<li>${des}</li>`)}
	  </ul>
    </div>`
      .split(",")
      .join("");
  }
  return "";
};
