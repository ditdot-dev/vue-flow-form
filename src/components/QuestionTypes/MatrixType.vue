<template>
  <div class="f-matrix-wrap">
    <fieldset>
      <table 
        class="f-table"
        v-bind:class="{ 'f-multiple': question.multiple }"
      >
        <thead>
          <tr>
            <td></td>
            <th 
              v-for="(column, index) in question.columns"
              v-bind:key="'c' + index"
              class="f-table-cell f-table-cell--header"
            >
              <span>
                <span class="f-table-string">{{ column.label }}</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, index) in question.rows"
            v-bind:key="'r' + index"
            class="f-table-row"
          >
            <td class="f-table-cell f-matrix-cell">
              <span>
                <span class="f-table-string">{{ row.label }}</span></span>
            </td>
            <td
              v-for="(column, index) in question.columns"
              v-bind:key="'l' + index"
              :title="row.label"
              class="f-table-cell f-matrix-cell"
            >
              <label 
                class="f-matrix-field f-matrix-radio f-matrix-label">
                <input
                  type="radio"
                  :name="row.value"
                  :id="index + '-' + row.value"
                  :aria-label="row.label"
                  class="f-visuallyhidden f-matrix-control f-radio-control"
                  :value="column.value"
                />
                <span class="f-matrix-decorator f-radio-decorator">
                  <svg
                    viewBox="-12 -12 24 24"
                    class="f-matrix-svg f-radio-svg"
                  >
                    <circle r="6" cx="0" cy="0"></circle>
                  </svg>
                </span>
                <span class="circle"></span> 
                <span class="check"></span>
                <span>Please indicate if you agree or disagree with the following statements</span></label>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  </div>
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
  name: QuestionType.Matrix,

  data() {
    return {};
  },

}  
</script>
