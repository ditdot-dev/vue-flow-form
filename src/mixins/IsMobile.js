/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Simple mobile device/tablet detection
const isMobile = !!(typeof navigator !== 'undefined' && navigator.userAgent.match(/android|iphone|ipad|ipod/i))

// Mixin that adds an `isMobile` data variable
export const IsMobile = {
  data() {
    return {
      isMobile
    }
  }
}