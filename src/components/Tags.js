import Blits from "@lightningjs/blits";

export default Blits.Component("Tags", {
  state() {
    return {
      bgColor: "#333",
      fontColor: "#fff",
      scale: 1,
    };
  },
  props: ["name", "index"],
  hooks: {
    focus() {
      this.bgColor = "#fff"
      this.fontColor = "#333"
      this.scale = 1.1
    },
    unfocus() {
      this.bgColor = "#333"
      this.fontColor = "#fff"
      this.scale = 1
    }
  },
  template: `
    <Element
      :y.transition="{ value: Math.floor($index / 10) * 100, delay: 50, duration: 500 }"
      :x.transition="{value: 50 + ($index%10) * 170, delay: 50 , duration: 500}"
      h="60"
      :color="$bgColor"
      maxlines="2"
      maxwidth="150"
      :scale.transition="{value: $scale, delay: 50, duration: 500}"
      :effects="[{type: 'radius', props: {radius: 20}}]"
    >
      <Text content="$name" maxwidth="150" y="20" align="center" lineheight="20" size="18" :color="$fontColor" />
    </Element>
  `,
});
