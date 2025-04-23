import Blits from '@lightningjs/blits'

export default Blits.Component('Card', {
  props: ['itemName', 'itemRating', 'index'],
  state() {
    return {
      bgColor: '#000',
      scale: 1
    }
  },
  hooks: {
    focus() {
      this.bgColor = '#fff'
      this.scale = 1.1
    },
    unfocus() {
      this.bgColor = '#000'
      this.scale = 1
    }
  },
  template: `
    <Element :scale.transition="$scale" w="300" h="400" :color="$bgColor" :effects="[{type: 'radius', props: {radius: 6}}]">
      <Text maxwidth="250" maxlines="2" content="$itemName" x="10" y="30" :color="$fff" />
    </Element>
  `,
})
