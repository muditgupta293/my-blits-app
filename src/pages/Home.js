import Blits from '@lightningjs/blits'

import Loader from '../components/Loader.js'
import Navbar from '../components/Navbar.js'

const colors = ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa']

export default Blits.Component('Home', {
  components: {
    Loader,
    Navbar
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Element :y.transition="$y">
        <Loader
          :x="1920 / 2"
          mount="{x: 0.5}"
          y="600"
          w="160"
          ref="row2"
          :alpha.transition="$loaderAlpha"
          :loaderColor="$color"
        />
      </Element>
      <Navbar x="0" mount="{x: 0.5}" y="0" ref="row1" />
    </Element>
  `,
  props: ['landingPage'],
  state() {
    return {
      y: 0,
      x: -1000,
      rotation: 0,
      scale: 1,
      loaderAlpha: 0,
      textAlpha: 0,
      color: '',
    }
  },
  hooks: {
    ready() {
      this.loaderAlpha = 1
      this.x = 1920 / 2
      const row1 = this.$select('row1')
      if (row1 && row1.$focus) row1.$focus()

      this.$setTimeout(() => {
        this.loaderAlpha = 0

      }, 3000)
    },
  },
})
