<template>
<div>
  <header class="vff-header">
    <div class="d-flex justify-content-between align-items-center" style="margin-left: 50px; margin-right: 50px">
      <a style="font-size: 24px; font-weight: 600">Gig Retirement Calculator</a>

      <a href="https://www.gigfinance.org">
        <img src="../../../src/assets/images/gigfinance_logo_white.svg" width="120px" />
      </a>
    </div>
  </header>

  <transition name="component-fade" mode="out-in">
    <router-view />
  </transition>
</div>
</template>

<script>
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter,
.component-fade-leave-to

/* .component-fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

.logo-header {
  max-width: 50%;
  height: auto;
  display: inline-block;
  padding-top: 0.59375rem;
  padding-bottom: 0.59375rem;
  margin-right: 1.125rem;
  white-space: nowrap;
}
</style>
