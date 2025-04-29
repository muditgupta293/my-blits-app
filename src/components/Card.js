import Blits from "@lightningjs/blits";

export default Blits.Component("Card", {
  props: [
    "itemName",
    "itemRating",
    "index",
    "poster",
    "background",
    "identifier",
    "overview",
  ],
  state() {
    return {
      bgColor: "#000",
      scale: 1,
    };
  },
  hooks: {
    focus() {
      this.scale = 1.2;
      this.$emit("posterSelect", {
        background: this.background,
        title: this.itemName,
        overview: this.overview,
      });
    },
    unfocus() {
      this.scale = 1;
    }
  },
  input: {
    enter() {
      const contentType =
        (window.location.hash.includes("series") ? "series" : "movie") || "movie";
      const routeTo = `${contentType}-item-detail`;
      this.$router.to(`/${routeTo}/${this.identifier}`);
    },
  },
  template: `
    <Element
      :scale.transition="$scale"
      src="$poster"
      color="{left: '#333', right: '#fff'}"
      w="300"
      h="400"
      :effects="[{type: 'radius', props: {radius: 6}}]"
    >
      <Text maxwidth="250" maxlines="2" content="$itemName" x="10" y="30" color="#fff" />
      <Text
        maxwidth="250"
        size="22"
        maxlines="1"
        :content="$itemRating !== undefined && $itemRating !== null ? ('Rating: ' + $itemRating.toFixed(1)) : 'Rating: N/A'"
        x="10"
        y="350"
        color="#fff"
      />
    </Element>
  `,
});
