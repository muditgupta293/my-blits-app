import Blits from "@lightningjs/blits"

export default Blits.Component("NavbarItem", {
  props: ["text", "index", "total"],

  template: `
    <Element x="$index * 250" w="250" h="100">
      <Element alpha="$showSeparator" w="2" h="80" mount="{y: -0.1}" color="#ffffff80" x="249" />
      <Text content="$text" x="30" y="30" :color="$fontColor" />
    </Element>
  `,
  state() {
    return {
      fontColor: "#e8d7f9",
    }
  },
  computed: {
    showSeparator() {
      return this.index < this.total - 1 ? 1 : 0
    },
  },

  hooks: {
    focus() {
      this.fontColor = "#000"
    },
    unfocus() {
      if (!this.$router.navigating) {
        this.fontColor = "#e8d7f9"
      }
    },
  },
  input : {
    enter() {
      this.$router.to(this.text.toLowerCase())
    }
  }
})
