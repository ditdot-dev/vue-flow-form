// Form template and logic

<template>
  <div class="vff" :class="{ 'vff-not-standalone': !standalone, 'vff-is-mobile': isMobile, 'vff-is-ios': isIos }">
    <div class="f-container">
      <div class="f-form-wrap">
        <flow-form-question :ref="setQuestionRef" v-for="(q, index) in questionList" v-bind:question="q"
          v-bind:language="language" v-bind:tokens="extraTokens" v-bind:key="'q' + index"
          v-bind:active="q.index === activeQuestionIndex" v-model="q.answer" v-on:answer="onQuestionAnswered"
          v-bind:reverse="reverse" v-bind:disabled="disabled" v-on:disable="setDisabled" v-bind:autofocus="autofocus" />

        <slot></slot>

        <!-- Complete/Submit screen slots -->
        <div v-if="isOnLastStep" class="vff-animate f-fade-in-up field-submittype">
          <slot name="complete" :submitted="submitted">
            <!-- Default content for the "complete" slot -->
            <div class="f-section-wrap">
              <p>
                <span class="fh2">{{ language.thankYouText }}</span>
              </p>
            </div>
          </slot>

          <slot name="completeButton" :submitted="submitted" :submit="submit">
            <!-- Default content for the "completeButton" slot -->
            <button class="o-btn-action" ref="button" type="button" href="#" v-on:click.prevent="submit()"
              v-if="!submitted" v-bind:aria-label="language.ariaSubmitText">
              <span>{{ language.submitText }}</span>
            </button>
            <a class="f-enter-desc" href="#" v-on:click.prevent="submit()" v-if="!submitted"
              v-html="language.formatString(language.pressEnter)">
            </a>
            <p class="text-success" v-if="submitted">{{ language.successText }}</p>
          </slot>
        </div>
      </div>
    </div>

    <div class="vff-footer">
      <div class="footer-inner-wrap">
        <div v-if="progressbar" class="f-progress"
          v-bind:class="{ 'not-started': percentCompleted === 0, 'completed': percentCompleted === 100 }">
          <div class="f-progress-bar">
            <div class="f-progress-bar-inner" v-bind:style="'width: ' + percentCompleted + '%;'"></div>
          </div>
          {{ language.percentCompleted.replace(':percent', percentCompleted) }}
        </div>
        <div v-if="navigation" class="f-nav">
          <a class="f-prev" href="#" v-bind:class="{ 'f-disabled': activeQuestionIndex === 0 || submitted }"
            v-on:click.prevent="goToPreviousQuestion()" role="button" v-bind:aria-label="language.ariaPrev">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
              y="0px" width="42.333px" height="28.334px" viewBox="78.833 5.5 42.333 28.334" aria-hidden="true">
              <path
                d="M82.039,31.971L100,11.442l17.959,20.529L120,30.187L101.02,8.492c-0.258-0.295-0.629-0.463-1.02-0.463c-0.39,0-0.764,0.168-1.02,0.463L80,30.187L82.039,31.971z" />
            </svg>
            <span class="f-nav-text" aria-hidden="true">{{ language.prev }}</span>
          </a>
          <a class="f-next" href="#" v-bind:class="{ 'f-disabled': !isNextQuestionAvailable() }"
            v-on:click.prevent="goToNextQuestion()" role="button" v-bind:aria-label="language.ariaNext">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
              y="0px" width="42.333px" height="28.334px" viewBox="78.833 5.5 42.333 28.334" aria-hidden="true">
              <path
                d="M117.963,8.031l-17.961,20.529L82.042,8.031l-2.041,1.784l18.98,21.695c0.258,0.295,0.629,0.463,1.02,0.463c0.39,0,0.764-0.168,1.02-0.463l18.98-21.695L117.963,8.031z" />
            </svg>
            <span class="f-nav-text" aria-hidden="true">{{ language.next }}</span>
          </a>
        </div>
        <div v-if="timer" class="f-timer">
          <span>{{ formatTime(time) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*!
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

import logic from "../composables/FlowForm"

export default logic
</script>

<style lang="css">
@import '../assets/css/common.css';
</style>
