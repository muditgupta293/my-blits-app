import Blits from "@lightningjs/blits";
import Tags from "./Tags";

export default Blits.Component("GenreTags", {
  components: {
    Tags
  },
  props: ["genres"],
  state() {
    return {
      focusElement: 0,
    };
  },
  watch: {
    focusElement() {
      const genre = this.$select(`genre${this.focusElement}`);
      if (genre && genre.$focus) genre.$focus();
    }
  },
  hooks: {
    focus () {
      this.$trigger("focusElement");
    }
  },
  input: {
    right() {
      if (this.focusElement < this.genres.length - 1) {
        this.focusElement++;
      }
    },
    left() {
      if (this.focusElement > 0) {
        this.focusElement--;
      }
    }
  },

  template: `
    <Element w="1920" h="100">
      <Tags
        :if="$genres && $genres.length > 0"
        :for="(genre, index) in $genres"
        :key="$genre.name"
        name="$genre.name"
        index="$index"
        :ref="'genre' + $index"
      />
    </Element>
  `,
});
