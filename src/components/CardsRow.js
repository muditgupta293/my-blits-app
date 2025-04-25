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
      rowOffset: 40,
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
        if (value < 1) {
          this.rowOffset = 40
        } else if (value > this.railCards.length - 6) {
          this.rowOffset = 40 - (this.railCards.length - 6) * 430 + 250
        } else {
          this.rowOffset = 40 - value * 430 + 290
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
    <Element w="1920" h="550">
      <Element w="600" h="100" x="30">
        <Text content="$railTitle" x="10" y="30" color="$fff" />
      </Element>
      <Element y="150" color="red" :x.transition="$rowOffset">
        <Card
          :for="(item, index) in $railCards"
          :x.transition="{value: $itemOffset + $index * 330, delay: 50 * ($index%4), duration: 500}"
          itemName="$item.name"
          itemRating="$item.rating"
          index="$index"
          key="$item.name"
          :ref="'card' + $index"
        />
      </Element>
    </Element>
  `,
});
