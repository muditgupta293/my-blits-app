import Blits from "@lightningjs/blits";
import { fetchMovieGenres, fetchMovieList } from "../api/api";
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
    focusElement() {
      const row = this.$select(`row${this.focusElement}`);
      if (row && row.$focus) row.$focus();
    },
  },
  hooks: {
    ready() {
      this.$trigger("focusElement");
    },
    async init() {
      this.pageData = [
        {
          title: "Popular Movies",
          items: await fetchMovieList("popular")
        },
        {
          title: "Top Rated Movies",
          items: await fetchMovieList("top_rated")
        },
        {
          title: "Trending Movies",
          items: await fetchMovieList("now_playing")
        },
        {
          title: "Upcoming Movies",
          items: await fetchMovieList("upcoming")
        }
      ],
      this.genresFilter = await fetchMovieGenres()
    }
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Element z="1">
        <Navbar :navbarBg="$navbarBg" x="0" mount="{x: 0.5}" y="0" ref="row0" />
      </Element>
      <GenreTags
        :if="$genresFilter && $genresFilter.length > 0"
        :genres="$genresFilter"
        x="40"
        :y.transition="{value: $offsetGenreY, delay: 200, easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}"
        w="1920"
        ref="row1"
      />
      <Element x="0" y="400" w="1920" color="#000">
        <CardsRow
          :if="$pageData.length > 0"
          :for="(item, index) in $pageData"
          :railTitle="$item.title"
          :railCards="$item.items"
          index="$index"
          key="$item.title"
          :y.transition="{value: (($index * 600) - $offsetY), delay: 200, easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}"
          :ref="'row' + ($index + 2)"
        />
      </Element>
    </Element>
  `,
  computed: {
    offsetY() {
      if (this.focusElement === 0 || this.focusElement === 1) return 0;
       else {
       return ((this.focusElement - 1) * 450 - 100);
      }
    },
    offsetGenreY() {
      if (this.focusElement > 1) return -175;
      else return 175
    },
    navbarBg() {
      return this.focusElement > 2 ? "#1e293b" : "transparent";
    },
  },
  input: {
    down() {
      if (this.focusElement <= this.pageData.length) {
        this.focusElement++;
      }
    },
    up() {
      if (this.focusElement > 0) {
        this.focusElement--;
      }
    }
  }
});
