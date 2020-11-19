<template>
  <span :class="onlyClass || `${classes} d-flex`">
    <slot></slot>
    <b-icon
      icon="info-circle"
      scale="1"
      class="ml-2 mt-1"
      v-tooltip="{
        content: tooltip,
        placement: tooltipPlacement || 'bottom',
      }"
    ></b-icon>
  </span>
</template>

<script>
export default {
  props: ["tooltip", "tooltipPlacement", "classes", "onlyClass"],
};
</script>

<style>
</style>