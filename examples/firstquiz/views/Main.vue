<template>
  <div>
    <header class="vff-header">
      <b-navbar toggleable="md">
        <a href="https://www.gigfinance.org/">
          <img
            href="https://www.gigfinance.org/"
            class="logo"
            src="../../../src/assets/images/gigfinance_logo.svg"
            alt="Gig finance green logo"
          />
        </a>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="https://www.learn.gigfinance.org/about/" right
              >About</b-nav-item
            >
            <b-nav-item-dropdown text="Guides" right>
              <b-dropdown-text>
                For Business of One
              </b-dropdown-text>
              <b-dropdown-item
                href="https://www.learn.gigfinance.org/blog/how-to-get-started-with-an-individual-401-k/"
              >
                <li class="nav-li">Individual 401k</li>
              </b-dropdown-item>
              <b-dropdown-item
                href="https://www.learn.gigfinance.org/blog/how-to-get-started-with-a-sep-ira/"
              >
                <li class="nav-li">SEP-IRA</li>
              </b-dropdown-item>
              <b-dropdown-item
                href="https://www.learn.gigfinance.org/blog/how-to-get-started-with-a-traditional-ira/"
              >
                <li class="nav-li">Traditional IRA</li>
              </b-dropdown-item>
              <b-dropdown-text>
                For Business of Many
              </b-dropdown-text>
              <b-dropdown-item
                href="https://www.learn.gigfinance.org/blog/how-to-get-started-with-a-simple-ira/"
              >
                <li class="nav-li">SIMPLE-IRA</li>
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="https://contact.gigfinance.org/" right
              >Contact</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>

    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script></script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter,
.component-fade-leave-to

/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/*=========================

    02.HEADER AREA START

=========================*/

.navbar-light .navbar-nav .nav-link {
  color: #000000 !important;
  font-size: 22px;
  padding-left: 25px;
}
.nav-li {
  list-style-type: disc;
  margin: 0.3rem 1.8rem;
}
.logo {
  width: 14rem;
}

@media (max-width: 767.98px) {
  .nav-item {
    text-align: center !important;
  }
}
@media (max-width: 500px) {
  .logo {
    width: 12rem;
  }
}
@media (max-width: 300px) {
  .logo {
    width: 10rem;
  }
}
/*=========================

    02.HEADER AREA END

=========================*/
</style>
