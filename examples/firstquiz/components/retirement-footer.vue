<template>
  <div class="footer">
    <div class="footerContent">
      <div class="roww1 flex">
        <div class="premiumBox">
          <div class="column1">
            <div class="premiumHeading">
              <div class="premiumLabel">
                <p class="m-0 p-0 ribbon-premium p-1">PREMIUM</p>
              </div>
            </div>
            <div class="image flex w-100">
              <div class="img"></div>
            </div>
          </div>

          <div class="column2 flex2">
            <h1>MULTIPLE ACCOUNTS</h1>
            <h2>
              How do I balance my retirement contribution to multiple accounts?
            </h2>
            <p>
              We know it can get complicated quickly between a new account and
              those old accounts from your old employer. Let us take care of
              maximizing your tax avoided amount based on contributions to
              different accounts (new & old).
            </p>
            <button
              style="float: right; border-radius: 46px"
              @click="handleSignup"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div class="roww2 flex">
        <div class="irsBox">
          <div class="irsContent flex2">
            <h1>How This Calculator Works</h1>
            <p>
              The Internal Revenue Service (IRS) offers different tax benefits
              for different retirement accounts. We used your inputs to
              determine the total allowable tax deductions that can be made from
              your business. The "Tax Avoided" value applies these deductions to
              calculate the amount of taxes you can avoid by putting money away
              for retirement. The 'Best Option' tag is applied to the retirement
              account that you qualify for, and the highest tax avoided amount
              according to your contribution selection. The dollar value by your
              age 67 is calculated with a compound interest growth rate of 8%
              with the number of years until you're age 67. You can read more in
              our FAQ section if you have questions!
            </p>
          </div>
          <div class="irsImage flex">
            <div class="img2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["handleSignup"],
};
</script>

<style scoped src="../css/retire-options.css"></style>
