<template>
  <span :class="onlyClass || `${classes} d-flex`">
    <slot></slot>
    <b-icon
      icon="info-circle"
      scale="1"
      class="ml-2 mt-1"
      v-tooltip="{
        content: dynamic
          ? DynamicTooltip('' || tooltipType, {
              ...tooltip,
            })
          : tooltip,
        placement: tooltipPlacement || 'bottom',
      }"
    ></b-icon>
  </span>
</template>

<script>
import { DynamicTooltip } from "../../util/dynamic-tooltip";
export default {
  props: [
    "tooltip",
    "tooltipPlacement",
    "classes",
    "onlyClass",
    "dynamic",
    "tooltipType",
  ],
  data() {
    return {
      DynamicTooltip,
    };
  },
};
</script>

<style>
.tooltip {
  /* background: #dadada; */
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.75);
}
.inner-body {
  height: 100%;
  width: 100%;
}
</style>