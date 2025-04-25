import Blits from "@lightningjs/blits";

export default Blits.Component("Background", {
  template: `
    <Element>
      <Element
        :src="$bgImg"
        w="1920"
        h="1080"
        color="{top: '#fff', bottom: '#000'}"
        :alpha.transition="{value: $alpha1, duration: 400, easing: 'ease-in'}"
      />
      <Element
        :src="$bgImg"
        w="1920"
        h="1080"
        color="{top: '#fff', bottom: '#000'}"
        :alpha.transition="{value: $alpha2, duration: 400, easing: 'ease-in'}"
      />
      <Element w="1920" h="1080" src="assets/gradient.png" alpha="0.3" />
    </Element>
  `,
  props: ["bgImg"],

  state() {
    return {
      counter: 0,
      alpha1: 0.8,
      alpha2: 0,
    };
  },
  watch: {
    bgImg(v) {
      this.counter = (this.counter + 1) % 2;
      if (this.counter === 0) {
        this.alpha1 = 0.8;
        this.alpha2 = 0;
      } else {
        this.alpha1 = 0;
        this.alpha2 = 0.8;
      }
    },
  },
});
