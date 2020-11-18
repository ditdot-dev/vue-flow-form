<template>
  <div class="r-container">
    <div class="main">
      <div class="row1 flex" style="cursor: pointer">
        <router-link to="/">
          <p>^</p>
        </router-link>
      </div>
      <div class="row2 flex">
        <div class="heading">
          <h2>
            Your Contribution <br />
            With Profit After Taxes
          </h2>
        </div>

        <div class="adder-subtractor">
          <div class="box">
            <div
              class="sub flex"
              @click="percent ? percent-- : null"
              style="cursor: pointer"
            >
              <h1>-</h1>
            </div>
            <div class="flex">
              <p class="percent">{{ percent }}%</p>
            </div>
            <div class="add flex" @click="percent++" style="cursor: pointer">
              <h1>+</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row3 flex">
        <div class="heading2">
          <h2 class="mt-5">Projected 2020 <br />Contributions</h2>
        </div>
        <div class="slider">
          <div class="box">
            <h2></h2>
            <vue-slider
              v-model="projectedValue"
              :interval="10"
              :marks="true"
              :min="0"
              :max="(ProfitAfterTaxes * 10) / 100"
              height="60px"
              tooltipPlacement="left"
            >
              <template v-slot:step="{ active, value }">
                <div
                  :class="['vue-slider-mark-label', 'custom-label', { active }]"
                >
                  {{ projectedValue === value ? `$${value}` : "" }}
                </div>
              </template>
              <template v-slot:dot> <span class="custom-dot" /> </template
            ></vue-slider>
          </div>
          <div class="max"><h2></h2></div>
          <div class="cursor"></div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="wrapper">
        <div class="head"><h1>Retirement Account Options</h1></div>
        <div class="item flex">
          <div class="one flex"><h4>Account Types</h4></div>
          <div class="two flex d-flex-right" style="padding-left: 15%">
            <h4>At a Glance</h4>
          </div>
          <div class="three flex d-flex-right" style="padding-left: 15%">
            <info-icon tooltip="business">
              <h4>Contributions</h4>
            </info-icon>
          </div>
          <div class="four flex d-flex-right" style="padding-left: 15%">
            <h4>Impact on your taxes</h4>
          </div>
          <div class="five"></div>
        </div>
        <div class="boxes">
          <div class="box1 boxwrapper">
            <div class="col1 col flex2 best-option-container">
              <h2 class="p-0 bestOptionLabel p-1">BEST OPTION</h2>

              <h1>
                Individual <br />
                401K
              </h1>
              <p>
                Over 80% of incorporated <br />
                freelancers use this option. <br />
                <br />
                Based on your information, <br />
                we suggest you open an <br />
                Individual 401(K)
              </p>
            </div>
            <div class="col2 col flex2 justify-content-start mt-3">
              <p>
                Individual 401(K) allows for <br />
                more retirement contribution <br />
                as a employee and employer. <br />
                You can save up to $57,000/yr, <br />
                and wth your spouse, this can <br />
                be even as high as $114,000/yr. <br />
                <br />
                Best for those looking to <br />
                maximize retirement <br />
                contribution and are <br />
                comfortable with some <br />
                paperwork.
              </p>
            </div>
            <div class="col3 col flex2 justify-content-start">
              <h4>Your Contribution</h4>
              <h2>$1,552 (2.1%)</h2>
              <div class="colBox">
                <vue-custom-slider v-model="sliders.one" />
              </div>
              <h4>Your Business Contribution</h4>
              <info-icon tooltip="business">
                <h2>$6,000 (8.9%)</h2>
              </info-icon>
              <div class="colBox2 colBox">
                <vue-custom-slider v-model="sliders.two" />
              </div>
              <p>
                At age 67, your <br />
                contributions could be <br />
                worth $101,516
              </p>
            </div>

            <div class="col4 col flex2 justify-content-start">
              <h4>Tax Avoided</h4>
              <info-icon tooltip="business">
                <h2>$1,325</h2>
              </info-icon>

              <p>
                At age 67, the amount <br />
                you are losing could be <br />
                worth $49,140
              </p>
              <h4>Text Advantage Ratio</h4>
              <info-icon tooltip="business">
                <h2>26%</h2>
              </info-icon>
            </div>
            <div class="col5 col">
              <div class="labelbox flex">
                <h4>How to Open an <br />Individual 401k <br />Account</h4>
              </div>
            </div>
          </div>

          <div class="box2 boxwrapper">
            <div class="col1 col flex2">
              <h1>SEP-IRA</h1>
              <p>
                X% of people your age <br />
                has this account
              </p>
            </div>
            <div class="col2 col flex2 justify-content-start mt-3">
              <p>
                A SEP-IRA is an ideal plan if <br />
                you are earning over <br />
                $24,000/yr, and you intend to <br />
                save more than $6,000/yr for <br />
                retirement. You can <br />
                contribute a maximum of <br />
                $56,000/yr <br />
                <br />
                Best for simplicity in setup <br />
                and if you have 2 jobs, one as <br />
                a freelancer and another as a <br />
                full-time employee.
              </p>
            </div>
            <div class="col3 col flex2 mb-5 justify-content-start">
              <h4>Your Business Contribution</h4>
              <info-icon tooltip="business">
                <h2 class="mb-0 pb-0">$7,500 (10.9%)</h2>
              </info-icon>
              <div class="colBox">
                <vue-custom-slider v-model="sliders.three" />
              </div>

              <p>
                At age 67, your <br />
                contributions could be <br />
                worth $xxxxx
              </p>
            </div>

            <div class="col4 col flex2 justify-content-start">
              <h4>Tax Avoided</h4>
              <info-icon tooltip="business">
                <h2>$1,325</h2>
              </info-icon>

              <p>
                At age 67, the amount <br />
                you are losing could be <br />
                worth $49,140
              </p>
              <h4>Text Advantage Ratio</h4>
              <info-icon tooltip="business">
                <h2>26%</h2>
              </info-icon>
            </div>
            <div class="col5 col">
              <div class="labelbox flex">
                <h4>How to Open a <br />SEP-IRA<br />Account</h4>
              </div>
            </div>
          </div>

          <div class="box3 boxwrapper">
            <div class="col1 col flex2">
              <h1>SIMPLE-IRA</h1>
              <p>
                This is suitable for <br />
                those who have <br />
                employees and want to<br />
                offer retirement <br />
                benefits to their<br />
                employees <br />
                <br />
                Over 65% of users have <br />
                this as their first <br />
                retirement account
              </p>
            </div>
            <div class="col2 col flex2 justify-content-start mt-3">
              <p>
                The SIMPLE-IRA allows for <br />
                retirement contribution as a <br />
                employee and employer. <br />
                Employers can contribute up to <br />
                3% of employee’s <br />
                compensation, and employees <br />
                can defer up to $13,500/yr <br />
                from their salary <br />
                <br />
                Best for those looking to offer <br />
                retirement benefits for <br />
                employees with minimal <br />
                administration & fees
              </p>
            </div>
            <div class="col3 col flex2 justify-content-start">
              <h4>Your Contribution</h4>
              <h2>$7,652 (10.6%)</h2>
              <div class="colBox">
                <vue-custom-slider v-model="sliders.four" />
              </div>
              <h4>Your Business Contribution</h4>
              <info-icon tooltip="business">
                <h2>$900 (1.4%)</h2>
              </info-icon>

              <div class="colBox">
                <vue-custom-slider v-model="sliders.five" />
              </div>
              <p>
                At age 67, your <br />
                contributions could be <br />
                worth $xxxxx
              </p>
            </div>

            <div class="col4 col flex2 justify-content-start">
              <h4>Tax Avoided</h4>
              <info-icon tooltip="business">
                <h2>$1,025</h2>
              </info-icon>

              <p>
                At age 67, the amount <br />
                you are losing could be <br />
                worth $xxxxx
              </p>
              <h4>Text Advantage Ratio</h4>
              <info-icon tooltip="business">
                <h2>19%</h2>
              </info-icon>
            </div>
            <div class="col5 col">
              <div class="labelbox flex">
                <h4>How to Open a <br />SIMPLE-IRA<br />Account</h4>
              </div>
            </div>
          </div>

          <div class="box4 boxwrapper">
            <div class="col1 col flex2">
              <h1>
                Traditional<br />
                IRA
              </h1>
            </div>
            <div class="col2 col flex2 justify-content-start mt-3">
              <p>
                This is the most common <br />
                type of retirement account <br />
                opened by individuals. You <br />
                can contribute provided you <br />
                have any type of earned <br />
                income for the year You may <br />
                contribute up to $6,000/yr <br />
                <br />
                Best for those who have <br />
                outstanding debt, but want <br />
                to start saving for <br />
                retirement.
              </p>
            </div>
            <div class="col3 col flex2 mb-5 justify-content-start">
              <h4>Your Contribution</h4>
              <h2>$6,000 (8%)</h2>
              <div class="colBox">
                <vue-custom-slider v-model="sliders.six" />
              </div>
              <h4>Your Business Contribution</h4>

              <p>
                At age 67, your <br />
                contributions could be <br />
                worth $xxxxx
              </p>
            </div>

            <div class="col4 col flex2 justify-content-start">
              <h4>Tax Avoided</h4>
              <info-icon tooltip="business">
                <h2>$902</h2>
              </info-icon>

              <p>
                At age 67, the amount <br />
                you are losing could be <br />
                worth $xxxxx
              </p>
              <h4>Text Advantage Ratio</h4>
              <info-icon tooltip="business">
                <h2>14%</h2>
              </info-icon>
            </div>
            <div class="col5 col">
              <div class="labelbox flex">
                <h4>How to Open an <br />Traditional IRA <br />Account</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
              <div class="image flex">
                <div class="img"></div>
              </div>
            </div>

            <div class="column2 flex2">
              <h1>MULTIPLE ACCOUNTS</h1>
              <h2>
                How do I balance my retirement contribution to multiple
                accounts?
              </h2>
              <p>
                We can help you calculate your overall tax avoided amount and
                optimize contributions to different accounts.
              </p>
              <button>Learn More</button>
            </div>
          </div>
        </div>

        <div class="roww2 flex">
          <div class="irsBox">
            <div class="irsContent flex2">
              <h4>How This Calculator Works</h4>
              <p>
                Based on your inputs, we followed the retirement contribution
                rules for your business type and retirement account to determine
                the total allowable deductions that can be made from your
                business. These deductions have different impact on your taxes.
                The retirement account option recommneded is based on your
                information, and the highest potential for tax avoided available
                to you.
              </p>
            </div>
            <div class="irsImage flex">
              <div class="img2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueCustomSlider from "../components/vue-slider";
import infoIcon from "../components/info-icon";
export default {
  name: "RetirementOptions",
  components: {
    vueCustomSlider,
    infoIcon,
  },
  data() {
    return {
      ProfitAfterTaxes: 19000,
      percent: 11,
      sliders: {
        one: 90,
        two: 9,
        three: 8,
        four: 10,
        five: 40,
        six: 60,
      },
      projectedValue: 1,
    };
  },
  mounted() {},
  methods: {},
  watch: {
    sliders(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
@import "../../../src/assets/css/retirement-options.css";
</style>
