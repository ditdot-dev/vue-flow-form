<template>
  <div class="f-radios-wrap">
    <ul class="f-radios" v-bind:class="{'f-multiple': question.multiple}" role="listbox">
      <li
        v-for="(option, index) in question.options"
        v-on:click.prevent="toggleAnswer(option)"
        v-bind:class="{'f-selected': option.selected}"
        v-bind:key="'m' + index"
        v-bind:aria-label="getLabel(index)"
        role="option"
      >
        <span class="f-image" v-if="hasImages && option.imageSrc">
          <img v-bind:src="option.imageSrc" v-bind:alt="option.imageAlt">
        </span>
        <div class="f-label-wrap">
          <span class="f-key">{{ getToggleKey(index) }}</span>
          <span v-if="option.choiceLabel()" class="f-label">{{ option.choiceLabel() }}</span>
        </div>
      </li>
      <li
        class="f-other"
        v-if="!hasImages && question.allowOther"
        v-on:click.prevent="startEditOther"
        v-bind:class="{'f-selected': question.other, 'f-focus': editingOther}"
        v-bind:aria-label="language.ariaTypeAnswer"
        role="option"
      >
        <div class="f-label-wrap">
          <span class="f-key" v-if="!editingOther">{{ getToggleKey(question.options.length) }}</span>
          <input
            v-if="editingOther"
            v-model="question.other"
            type="text"
            ref="otherInput"
            v-on:blur="stopEditOther"
            v-on:keyup.enter.prevent="stopEditOther"
            v-on:keyup="onChangeOther"
            v-on:change="onChangeOther"
            maxlength="256"
          />
          <span v-else-if="question.other" class="f-selected">
            <span class="f-label">{{ question.other }}</span>
          </span>
          <span v-else class="f-label">{{ language.otherPrompt }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import logic from '../../composables/QuestionTypes/MultipleChoiceType'

  export default logic
</script>
