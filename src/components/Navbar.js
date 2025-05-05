import Blits from "@lightningjs/blits"
import NavbarItem from "./NavbarItem"
import SearchInput from "./SearchInput"

export default Blits.Component("Navbar", {
  components: {
    NavbarItem,
    SearchInput
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
      <SearchInput x="80%" ref="searchInput" />
    </Element>
  `,
  state() {
    return {
      navbarItems: ["Home", "Movies", "Series", "Favourites"],
      itemFocused: 0,
      navbarColor: "transparent",
      onSearch: false,
    }
  },
  watch: {
    itemFocused() {
      if (!this.onSearch) {
        const item = this.$select(`item${this.itemFocused}`)
        if (item && item.$focus) item.$focus()
      }
    },
    onSearch(val) {
      const ref = this.$select("searchInput")
      if (ref && ref.$focus && val) {
        ref.$focus()
      } else if (!val) {
        this.$trigger("itemFocused")
      }
    }
  },
  hooks: {
    focus() {
      this.itemFocused = Number(window.localStorage.getItem("NavbarSelection")) || 0
      this.onSearch = false
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
      if (this.onSearch) {
        this.onSearch = false
      } else if (this.itemFocused > 0) {
        this.itemFocused--
      } else {
        this.itemFocused = this.navbarItems.length - 1
      }
    },

    right() {
      if (this.itemFocused < this.navbarItems.length - 1) {
        this.itemFocused++
      } else {
        this.onSearch = true
      }
    },
    down() {
      this.$emit("focusRouter")
    },
  },
})
