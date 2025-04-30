import Blits from "@lightningjs/blits";
import { fetchListByGenre, getImageUrl } from "../api/api";
import Card from "../components/Card";
import { getWatchlist } from "../utils/favouritesUtil";

export default Blits.Component("GenreCollection", {
  components: {
    Card
  },
  state() {
    return {
      focusElement: 0,
      collectionList: [],
    };
  },
  hooks: {
    init() {
      const watchList = getWatchlist();
      this.collectionList = watchList.map(item => {
        return {
          poster: getImageUrl(item.poster_path, "w300"),
          identifier: item.id,
          title: item.title,
          rating: item.vote_average,
        };
      });
      setTimeout(() => {
        this.$trigger("focusElement");
      }, 0);
    },
    focus() {
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
        <Text content="Your Watchlist" size="45" color="#fff" />
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
      } else {
        this.$emit("focusNavbar");
      }
    }
  }
});
