<template>
  <span :class="onlyClass || `${classes} d-flex`">
    <slot></slot>
    <b-icon
      icon="info-circle"
      scale="1"
      class="ml-2 mt-1"
      v-tooltip="{
        content: !dynamic
          ? DynamicTooltip('', {
              description:
                'This is limited to 25% of the salary you pay yourself if you’ve incorporated. If you don’t pay yourself a salary, this is limited to 20% of the total earnings from your business after deducting half of self employment tax.',
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
  props: ["tooltip", "tooltipPlacement", "classes", "onlyClass", "dynamic"],
  data() {
    return {
      DynamicTooltip,
    };
  },
  created() {
    console.log(
      DynamicTooltip({
        description: "",
        netEarning: "",
        taxDeduction: "",
        irsLimit: "",
        contributionMax: "",
      })
    );
  },
  computed: {
    Dynamic() {
      console.log(DynamicTooltip());
      return DynamicTooltip();
    },
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