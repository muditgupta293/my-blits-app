import Blits from "@lightningjs/blits";
import { fetchGenres, fetchList } from "../api/api";
import CardsRow from "../components/CardsRow";
import Navbar from "../components/Navbar";
import GenreTags from "../components/GenreTags";

export default Blits.Component("Movies", {
  components: {
    CardsRow,
    Navbar,
    GenreTags
  },
  state() {
    return {
      focusElement: 0,
      pageData: [{
        title: "",
        items: []
      }],
      genresFilter: [],
    };
  },
  watch: {
    focusElement(value) {
      const row = this.$select(`row${this.focusElement}`);
      if (row && row.$focus) row.$focus();
      if (value <= 1 ) {
        this.$emit("changeNavbarColor", "transparent");
      } else {
        this.$emit("changeNavbarColor", "#333");
      }
    },
  },
  hooks: {
    async init() {
      this.pageData = [
        {
          title: "Popular Movies",
          items: await fetchList("movie", "popular")
        },
        {
          title: "Top Rated Movies",
          items: await fetchList("movie", "top_rated")
        },
        {
          title: "Trending Movies",
          items: await fetchList("movie", "now_playing")
        },
        {
          title: "Upcoming Movies",
          items: await fetchList("movie", "upcoming")
        }
      ],
      this.genresFilter = await fetchGenres("movie")
      this.focusElement = 1
      this.$trigger("focusElement")
    },
    focus() {
      this.$trigger("focusElement")
    }
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <GenreTags
        :if="$genresFilter && $genresFilter.length > 0"
        :genres="$genresFilter"
        x="40"
        :y.transition="{value: $offsetGenreY + 70, delay: 200, easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}"
        w="1920"
        ref="row0"
      />
      <Element x="0" y="300" w="1920" color="#000">
        <CardsRow
          :if="$pageData.length > 0"
          :for="(item, index) in $pageData"
          :railTitle="$item.title"
          :railCards="$item.items"
          index="$index"
          key="$item.title"
          :y.transition="{value: ((($index * 600) + 50) - $offsetY), delay: 200, easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}"
          :ref="'row' + ($index + 1)"
        />
      </Element>
    </Element>
  `,
  computed: {
    offsetY() {
      if (this.focusElement === 0 || this.focusElement === 1) return 0;
       else {
       return (this.focusElement * 450 - 100);
      }
    },
    offsetGenreY() {
      if (this.focusElement > 1) return -175;
      else return 75
    }
  },
  input: {
    down() {
      if (this.focusElement <= this.pageData.length - 1) {
        this.focusElement++;
      }
    },
    up() {
      if (this.focusElement > 0) {
        this.focusElement--;
      } else {
        this.$emit("focusNavbar");
      }
    }
  }
});
