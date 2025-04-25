import Blits from "@lightningjs/blits";
import Card from "./Card";

export default Blits.Component("CardsRow", {
  components: {
    Card,
  },

  props: ["railTitle", "railCards", "index"],
  state() {
    return {
      focusCardElement: 0,
      itemOffset: 30,
      rowOffset: 40
    };
  },
  hooks: {
    ready() {
      this.itemOffset = 0;
    },
    focus() {
      this.$trigger("focusCardElement");
    },
  },
  watch: {
    focusCardElement(value) {
      const card = this.$select(`card${value}`);
      if (card && card.$focus) {
        card.$focus();
        if (value < 4) {
          this.rowOffset = 40
        } else if (value < this.railCards.length) {
          this.rowOffset = 200 - Math.min(this.focusCardElement, this.railCards.length - 1720 / 330) * 330
        }
      }
    },
  },
  input: {
    left() {
      if (this.focusCardElement > 0) {
        this.focusCardElement--;
      }
    },
    right() {
      if (this.focusCardElement < this.railCards.length - 1) {
        this.focusCardElement++;
      }
    },
  },

  template: `
    <Element w="1920" h="550" :if="$railCards && $railCards.length > 0">
      <Element w="600" h="100" x="30">
        <Text content="$railTitle" size="45" x="10" y="30" color="$fff" />
      </Element>
      <Element y="150" color="red" :x.transition="{value: $rowOffset, duration: 800}">
        <Card
          :for="(item, index) in $railCards"
          :x.transition="{value: $itemOffset + $index * 330, delay: 50 * ($index%5), duration: 500}"
          itemName="$item.title"
          itemRating="$item.rating"
          poster="$item.poster"
          background="$item.background"
          identifier="$item.identifier"
          overview="$item.overview"
          index="$index"
          key="$item.title"
          :ref="'card' + $index"
        />
      </Element>
    </Element>
  `,
});
