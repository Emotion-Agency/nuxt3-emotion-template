export const resetScroll = () => {
  // window.escroll?.reset()
  if (window.escroll) {
    try {
      window.escroll.reset()
    } catch (e) {
      console.log(e)
    }
  }
  window.escroll && (window.escroll.isFixed = false)
  setTimeout(() => {
    window.parallax && window.parallax.update()
  }, 0)
}
