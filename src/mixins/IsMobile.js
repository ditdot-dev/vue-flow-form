/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Simple mobile device/tablet detection
const isIos = navigator.userAgent.match(/iphone|ipad|ipod/i) || (navigator.userAgent.indexOf("Mac") !== -1 && "ontouchend" in document)
const isMobile = !!(typeof navigator !== 'undefined' && (isIos || navigator.userAgent.match(/android/i)))

// Mixin that adds an `isMobile` data variable
export const IsMobile = {
  data() {
    return {
      isIos,
      isMobile
    }
  }
}