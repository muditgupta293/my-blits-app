import Blits from "@lightningjs/blits";
import { fetchListByGenre } from "../api/api";
import Card from "../components/Card";

export default Blits.Component("GenreCollection", {
  components: {
    Card
  },
  props: ["type", "genre", "genreId"],
  state() {
    return {
      focusElement: 0,
      collectionList: [],
      genreName: ""
    };
  },
  hooks: {
    async init() {
      const contentType = this.type.includes('series') ? 'tv' : 'movie';
      this.genreName = decodeURIComponent(this.genre);
      const genreId = this.genreId || window.location.href.split("/")[window.location.href.split("/").length - 1];
      this.collectionList = await fetchListByGenre(contentType, genreId);
      this.$trigger("focusElement");
    },
    focus() {
      this.$trigger("focusElement");
    }
  },
  watch: {
    focusElement(value) {
      const card = this.$select(`card${this.focusElement}`);
      if (card && card.$focus) card.$focus();
      if (value <= 4) {
        this.$emit("changeNavbarColor", "transparent");
      } else {
        this.$emit("changeNavbarColor", "#333");
      }
    }
  },
  computed: {
    offsetCardY() {
      return (Math.floor(this.focusElement / 5) * 400)
    },
    offsetYWrapper() {
      return this.focusElement <= 4 ? 0 : -(Math.floor(this.focusElement / 5) * 400)
    }
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Element
        x="50"
        :y.transition="{value: $offsetYWrapper + 120, delay: 200, easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}"
        w="100%"
        h="300"
      >
        <Text :content="'Best of ' + $genreName + ' Collection'" size="45" color="#fff" />
      </Element>
      <Card
        :if="$collectionList && $collectionList.length > 0"
        :for="(item, index) in $collectionList"
        maxwidth="1000"
        maxlines="$collectionList.length/5"
        :y.transition="{ value: ((Math.floor($index / 5) * 500) - $offsetCardY) + 250, delay: 50, duration: 500 }"
        :x.transition="{value: 50 + ($index%5) * 370, delay: 50 , duration: 500}"
        itemName="$item.title"
        itemRating="$item.rating"
        poster="$item.poster"
        background="$item.background"
        identifier="$item.identifier"
        overview="$item.overview"
        index="$index"
        key="$item.identifier"
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
      } else {
        this.$emit("focusNavbar");
      }
    }
  }
});
