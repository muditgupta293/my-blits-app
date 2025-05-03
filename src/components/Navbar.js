import Blits from "@lightningjs/blits"
import NavbarItem from "./NavbarItem"

export default Blits.Component("Navbar", {
  components: {
    NavbarItem,
  },
  template: `
    <Element w="1920" h="100" :color.transition="$navbarColor">
      <Text content="LightningJS" x="2%" y="25" font="raleway" size="40" color="red" />
      <NavbarItem
        :for="(item, index) in $navbarItems"
        key="$item"
        text="$item"
        index="$index"
        total="$navbarItems.length"
        :ref="'item' + $index"
      />
    </Element>
  `,
  state() {
    return {
      navbarItems: ["Home", "Movies", "Series", "Favourites"],
      itemFocused: 0,
      navbarColor: "transparent"
    }
  },
  watch: {
    itemFocused() {
      const item = this.$select(`item${this.itemFocused}`)
      if (item && item.$focus) item.$focus()
    }
  },
  hooks: {
    focus() {
      this.itemFocused = Number(window.localStorage.getItem("NavbarSelection")) || 0
      this.$trigger("itemFocused")
    },
    ready() {
      this.$listen("changeNavbarColor", (bgColor) => {
        this.navbarColor = bgColor
      })
    }
  },
  input: {
    left() {
      if (this.itemFocused > 0) {
        this.itemFocused--
      } else {
        this.itemFocused = this.navbarItems.length - 1
      }
    },

    right() {
      if (this.itemFocused < this.navbarItems.length - 1) {
        this.itemFocused++
      } else {
        this.itemFocused = 0
      }
    },
    down() {
      this.$emit("focusRouter")
    },
  },
})
