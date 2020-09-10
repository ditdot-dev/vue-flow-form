export const IsMobile = {
  data() {
    return {
      isMobile: !!navigator.userAgent.match(/android|iphone|ipad|ipod/i)
    }
  }
}