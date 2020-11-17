<template>
  <div class="r-container">
    <div class="main">
      <div class="row1 flex">
        <p>^</p>
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
            <div class="sub flex"><h1>-</h1></div>
            <div class="flex"><p class="percent">11%</p></div>
            <div class="add flex"><h1>+</h1></div>
          </div>
        </div>
      </div>

      <div class="row3 flex">
        <div class="heading2">
          <h2>Projected 2020 <br />Contributions</h2>
        </div>
        <div class="slider">
          <div class="box">
            <h2>$7,552</h2>
            <vue-slider
              v-model="value"
              :interval="1000"
              :marks="true"
              :min="7552"
              :max="65552"
              width="300px"
              height="50"
            ></vue-slider>
          </div>
          <div class="max"><h2>$68,661</h2></div>
          <div class="cursor"></div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="wrapper">
        <div class="head"><h1>Retirement Account Options</h1></div>
        <div class="item flex">
          <div class="one flex"><h4>Account Types</h4></div>
          <div class="two flex"><h4>At a Glance</h4></div>
          <div class="three flex"><h4>Contributions</h4></div>
          <div class="four flex"><h4>Impact on your taxes</h4></div>
          <div class="five"></div>
        </div>
        <div class="boxes">
          <div class="box1 boxwrapper">
            <div class="col1 col flex2">
              <div class="bestOptionLabel flex">
                <h2>BEST OPTION</h2>
              </div>

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
            <div class="col2 col flex2">
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
            <div class="col3 col flex2">
              <h4>Your Contribution</h4>
              <h2>$1,552 (2.1%)</h2>
              <div class="colBox1 colBox">
                <div class="greeen"></div>
                <div class="whitee"></div>
              </div>
              <h4>Your Business Contribution</h4>
              <h2>$6,000 (8.9%)</h2>
              <div class="colBox2 colBox">
                <div class="greeen"></div>
                <div class="whitee"></div>
              </div>
              <p>
                At age 67, your <br />
                contributions could be <br />
                worth $101,516
              </p>
            </div>

            <div class="col4 col flex2">
              <h4>Tax Avoided</h4>
              <h2>$1,325</h2>
              <p>
                At age 67, the amount <br />
                you are losing could be <br />
                worth $49,140
              </p>
              <h4>Text Advantage Ratio</h4>
              <h2>26%</h2>
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
            <div class="col2 col flex2">
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
            <div class="col3 col flex2">
              <h4>Your Business Contribution</h4>
              <h2>$7,500 (10.9%)</h2>
              <div class="colBox">
                <div class="greeen"></div>
                <div class="whitee"></div>
              </div>

              <p>
                At age 67, your <br />
                contributions could be <br />
                worth $xxxxx
              </p>
            </div>

            <div class="col4 col flex2">
              <h4>Tax Avoided</h4>
              <h2>$1,325</h2>
              <p>
                At age 67, the amount <br />
                you are losing could be <br />
                worth $49,140
              </p>
              <h4>Text Advantage Ratio</h4>
              <h2>26%</h2>
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
            <div class="col2 col flex2">
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
            <div class="col3 col flex2">
              <h4>Your Contribution</h4>
              <h2>$7,652 (10.6%)</h2>
              <div class="colBox colBox1">
                <div class="greeen"></div>
                <div class="whitee"></div>
              </div>
              <h4>Your Business Contribution</h4>
              <h2>$900 (1.4%)</h2>
              <div class="colBox colBox2">
                <div class="greeen"></div>
                <div class="whitee"></div>
              </div>
              <p>
                At age 67, your <br />
                contributions could be <br />
                worth $xxxxx
              </p>
            </div>

            <div class="col4 col flex2">
              <h4>Tax Avoided</h4>
              <h2>$1,025</h2>
              <p>
                At age 67, the amount <br />
                you are losing could be <br />
                worth $xxxxx
              </p>
              <h4>Text Advantage Ratio</h4>
              <h2>19%</h2>
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
            <div class="col2 col flex2">
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
            <div class="col3 col flex2">
              <h4>Your Contribution</h4>
              <h2>$6,000 (8%)</h2>
              <div class="colBox">
                <div class="greeen"></div>
                <div class="whitee"></div>
              </div>
              <h4>Your Business Contribution</h4>

              <p>
                At age 67, your <br />
                contributions could be <br />
                worth $xxxxx
              </p>
            </div>

            <div class="col4 col flex2">
              <h4>Tax Avoided</h4>
              <h2>$902</h2>
              <p>
                At age 67, the amount <br />
                you are losing could be <br />
                worth $xxxxx
              </p>
              <h4>Text Advantage Ratio</h4>
              <h2>14%</h2>
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
                  <p>PREMIUM</p>
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

          <button class="btn">FAQ ?</button>
        </div>

        <div class="roww2 flex">
          <div class="irsBox">
            <div class="irsContent flex2">
              <h4>How This Calculator Works</h4>
              <p>
                Based on your inputs, we followed the retirement contribution
                rules for your business type and retirement account <br />
                to determine the total allowable deductions that can be made
                from your business. These deductions have <br />
                different impact on your taxes. The retirement account option
                recommneded is based on your information, and <br />
                the highest potential for tax avoided available to you.
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
export default {
  name: "RetirementOptions",
  components: {},
  data() {
    return {
      value: 14552,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
@import "../../../src/assets/css/retirement-options.css";
</style>
