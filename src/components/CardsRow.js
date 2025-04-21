import Blits from "@lightningjs/blits"
import Card from "./Card"

export default Blits.Component("CardsRow", {
  components: {
    Card
  },

  props: ["rail", "railCards", "index"],

  hooks: {
    ready() {
      console.log("CardsRow ready",this.rail)
    },
    focus() {
      console.log("CardsRow focus")
    },
  },

  template: `
    <Element w="1920" h="550" color="#1e293b">
      <Element w="600" h="100" x="30" color="#000">
        <Text content="$rail" x="10" y="30" :color="$fff" />
      </Element>
      <Element x="30" y="150" w="300" h="200" color="#000">
        <Card x="0" y="0" w="300" h="200" />
      </Element>
    </Element>
  `,
})
