// Single question template and logic

<template>
  <div class="vff-animate q-form" v-bind:class="mainClasses" ref="qanimate">
    <div class="q-inner">
      <div v-bind:class="{'f-section-wrap': question.type === QuestionType.SectionBreak}">
        <div v-bind:class="{'fh2': question.type !== QuestionType.SectionBreak}">
          <span class="f-tagline" v-if="question.tagline">{{ question.tagline }}</span>

          <template v-if="question.title">
            <span class="fh2" v-if="question.type === QuestionType.SectionBreak" v-html="question.title"></span>
            <span class="f-text" v-else>
              {{ question.title }}&nbsp;
              <!-- Required questions are marked by an asterisk (*) -->
              <span class="f-required" v-if="question.required" v-bind:aria-label="language.ariaRequired" role="note"><span aria-hidden="true">*</span></span>

              <span v-if="question.inline" class="f-answer">
                <component
                  ref="questionComponent"
                  v-bind:is="question.type"
                  v-bind:question="question"
                  v-bind:tokens="tokens"
                  v-bind:language="language"
                  v-model="dataValue"
                  v-bind:active="active"
                  v-bind:disabled="disabled"
                  v-on:next="onEnter"
                />
              </span>
            </span>
          </template>

          <span class="f-sub" v-if="showHelperText">
            <span v-if="question.subtitle" v-html="question.subtitle"></span>

            <span class="f-help" v-if="question.type === QuestionType.LongText && !isMobile" v-html="question.helpText || language.formatString(language.longTextHelpText)"></span>

            <span class="f-help" v-if="question.type === QuestionType.MultipleChoice && question.multiple" v-html="question.helpText || language.multipleChoiceHelpText"></span>
            <span class="f-help" v-else-if="question.type === QuestionType.MultipleChoice" v-html="question.helpText || language.multipleChoiceHelpTextSingle "></span>
          </span>

          <div v-if="!question.inline" class="f-answer f-full-width">
            <component
              ref="questionComponent"
              v-bind:is="question.type"
              v-bind:question="question"
              v-bind:language="language"
              v-bind:tokens="tokens"
              v-model="dataValue"
              v-bind:active="active"
              v-bind:disabled="disabled"
              v-on:next="onEnter"
            />
          </div>
        </div>
        <p v-if="question.description || question.descriptionLink.length !== 0" class="f-description">
          <span v-if="question.description">{{ question.description }}</span>
          <a
            v-for="(link, index) in question.descriptionLink" 
            class="f-link" 
            v-bind:key="'m' + index"
            v-bind:href="link.url"
            v-bind:target="link.target"
          >{{ link.text || link.url }}</a>
        </p>

      </div>
      <div class="vff-animate f-fade-in f-enter" v-if="showOkButton()">
        <button 
          class="o-btn-action"
          type="button"
          ref="button"
          href="#"
          v-on:click.prevent="onEnter"
          v-bind:aria-label="language.ariaOk"
        >
          <span v-if="question.type === QuestionType.SectionBreak">{{ language.continue }}</span>
          <span v-else-if="showSkip()">{{ language.skip }}</span>
          <span v-else>{{ language.ok }}</span>
        </button>

        <a 
          class="f-enter-desc"
          href="#"
          v-if="question.type !== QuestionType.LongText || !isMobile"
          v-on:click.prevent="onEnter"
          v-html="language.formatString(language.pressEnter)">
        </a>
      </div>

      <div v-if="showInvalid()" class="f-invalid" role="alert" aria-live="assertive">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
  import logic from '../composables/FlowFormQuestion';

  export default logic
</script>
