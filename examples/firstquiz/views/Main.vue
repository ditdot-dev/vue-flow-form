<template>
<div>
<header class="vff-header">
  <div class="f-container row">
    <span class="col-lg-6" style="display: flex; justify-content: flex-start">
      <a style="font-size: 24px">Gig Retirement Calculator</a>
    </span>
    <span class="col-lg-6" style="display: flex; justify-content: flex-end">
      <a href="https://www.gigfinance.org">
      <img src="../../../src/assets/images/gigfinance_logo_white.svg" width="120px"/>
      </a>
    </span>
  </div>
</header>

<transition name="component-fade" mode="out-in">
  <router-view/></transition>

</div>
</template>

<script>
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.logo-header {
  max-width: 50%;
  height: auto;
  display: inline-block;
  padding-top: .59375rem;
  padding-bottom: .59375rem;
  margin-right: 1.125rem;
  white-space: nowrap
}

</style>
