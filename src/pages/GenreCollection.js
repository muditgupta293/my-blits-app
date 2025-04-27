import Blits from "@lightningjs/blits";
import { fetchMovieListByGenre } from "../api/api";
import Card from "../components/Card";

export default Blits.Component("GenreCollection", {
  components: {
    Card
  },
  props: ["genre", "genreId"],
  state() {
    return {
      focusElement: 0,
      collectionList: [],
    };
  },
  hooks: {
    async init() {
      const genreId = this.genreId ||window.location.href.split("/")[window.location.href.split("/").length - 1];
      this.collectionList = await fetchMovieListByGenre(genreId);
      this.$trigger("focusElement");
    }
  },
  watch: {
    focusElement() {
      const card = this.$select(`card${this.focusElement}`);
      if (card && card.$focus) card.$focus();
    }
  },
  computed: {
    offsetY() {
      return (Math.floor(this.focusElement / 5) * 400)
    }
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Element x="50" y="50" w="100%" h="300">
        <Text :content="'Best of ' + $genre + ' Movies'" size="45" color="#fff" />
      </Element>
      <Card
        :if="$collectionList && $collectionList.length > 0"
        :for="(item, index) in $collectionList"
        maxwidth="1000"
        maxlines="$collectionList.length/5"
        :y.transition="{ value: ((Math.floor($index / 5) * 500) - $offsetY) + 200, delay: 50, duration: 500 }"
        :x.transition="{value: 50 + ($index%5) * 370, delay: 50 , duration: 500}"
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
  `,
  input: {
    right() {
      if (this.focusElement < this.collectionList.length - 1) {
        this.focusElement++;
      }
    },
    left () {
      if (this.focusElement > 0) {
        this.focusElement--;
      }
    },
    down() {
      if (this.focusElement + 5 <= this.collectionList.length - 1) {
        this.focusElement = this.focusElement+5;
      }
    },
    up() {
      if (this.focusElement - 5 >= 0) {
        this.focusElement = this.focusElement-5;
      }
    }
  }
});
