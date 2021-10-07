<template>
  <div class="f-matrix-wrap">
    <fieldset class="f-matrix-fieldset">
      <table 
        class="f-matrix-table"
        v-bind:class="{ 'f-multiple': question.multiple }"
      >
        <thead>
          <tr>
            <td></td>
            <th 
              v-for="(column, index) in question.columns"
              v-bind:key="'c' + index"
              class="f-table-cell f-column-cell"
            >
              <span class="f-table-string">{{ column.label }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, index) in question.rows"
            v-bind:key="'r' + index"
            class="f-table-row"
          >
            <td class="f-table-cell f-row-cell">
                <span class="f-table-string">{{ row.label }}</span>
            </td>
            <td
              v-for="(column, index) in question.columns"
              v-bind:key="'l' + index"
              v-bind:title="column.label"
              class="f-table-cell f-matrix-cell"
            >
              <label 
                class="f-matrix-field f-matrix-radio">
                <input
                  type="radio"
                  v-bind:name="row.value"
                  v-bind:id="index + '-' + row.value"
                  v-bind:aria-label="row.label"
                  class="f-field-control f-radio-control"
                  v-bind:value="column.value"
                />
                <span class="f-field-mask f-radio-mask">
                  <svg
                    viewBox="0 0 24 24"
                    class="f-field-svg f-radio-svg"
                  >
                    <circle r="6" cx="12" cy="12"></circle>
                  </svg>
                </span>
              </label>
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
