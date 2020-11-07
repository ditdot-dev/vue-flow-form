<template>
<div>
<header class="vff-header">
  <div class="f-container">
   <!-- Add custom logo here -->
    <h3> Gig Retirement Calculator</h3>
  </div>

</header>
<transition name="component-fade" mode="out-in">
<router-view/>
</transition>
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
</style>
