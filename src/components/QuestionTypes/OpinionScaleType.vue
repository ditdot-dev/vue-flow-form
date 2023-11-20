<template>
  <div class="f-radios-wrap">
    <ul class="f-radios" role="listbox">
      <li
        v-for="(option, index) in question.options"
        v-on:click.prevent="toggleAnswer(option)"
        v-on:mouseover="isIconScale && onMouseover(index)"
        v-on:mouseleave="isIconScale && onMouseleave()"
        v-bind:class="{'f-selected': option.selected, ...iconScaleClasses(index)}"
        v-bind:key="'m' + index"
        v-bind:aria-label="getLabel(option.value)"
        role="option"
      >
        <div v-if="!isIconScale" class="f-label-wrap">
          <span v-if="option.choiceLabel()" class="f-label">{{ option.choiceLabel() }}</span>
        </div>
        <div v-else class="f-icon-wrap">
          <div class="f-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" stroke-width=".5"/>
            </svg>
          </div>
          <div class="f-key">{{ getToggleKey(option.value) }}</div>
        </div>
      </li> 
    </ul>
    <div v-if="!isIconScale && (question.labelLeft || question.labelRight)" class="f-label-scale-wrap">
      <span v-if="question.labelLeft" class="f-label-scale">
        <span class="f-label-scale-num">1 - </span>
        {{ question.labelLeft }}
      </span>
      <span v-if="question.labelRight" class="f-label-scale">
        <span class="f-label-scale-num">{{ question.options.length }} - </span>
        {{ question.labelRight }}
      </span>
    </div>
  </div>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import logic from '../../composables/QuestionTypes/OpinionScaleType'

  export default logic
</script>
