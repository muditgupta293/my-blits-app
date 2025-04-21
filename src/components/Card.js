import Blits from '@lightningjs/blits'

export default Blits.Component('Card', {
  template: `
    <Element w="300" h="400" color="#000">
      <Text content="Cards" x="10" y="30" :color="$fff" />
    </Element>
  `,
})
