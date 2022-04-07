<template>
  <span>Insert slider here</span>
</template>

<script>
/*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

import BaseType from "./BaseType.vue";
import { QuestionType } from "../../models/QuestionModel";

export default {
  extends: BaseType,
  name: QuestionType.Slider,
  components: {},

  data() {
    return {
      canReceiveFocus: true,
    };
  },

  methods: {},
};
</script>
