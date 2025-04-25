import Blits from "@lightningjs/blits";

import Loader from "../components/Loader.js";
import Navbar from "../components/Navbar.js";
import CardsRow from "../components/CardsRow.js";
import Background from "../components/Background.js";
import { fetchMovieList } from "../api/api.js";

export default Blits.Component("Home", {
  components: {
    Loader,
    Navbar,
    CardsRow,
    Background

  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Background :bgImg="$src" />
      <Text :content.transition="$title" font="raleway" size="80" x="100" y="150" maxwidth="1000" maxlines="1" />
      <Text :content.transition="$overview" maxwidth="880" x="100" y="300" lineheight="40" maxlines="3" />
      <Element z="1">
        <Navbar :navbarBg="$navbarBg" x="0" mount="{x: 0.5}" y="0" ref="row1" />
      </Element>
      <Element x="0" y="650" w="1920">
        <CardsRow
          if="$data.length > 0"
          :for="(item, index) in $data"
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
  props: ["landingPage"],
  state() {
    return {
      focusElement: 1,
      src: "https://image.tmdb.org/t/p/w300/xUkUZ8eOnrOnnJAfusZUqKYZiDu.jpg",
      title: "",
      overview: "",
      data: [{
        title: "",
        items: []
      }],
    };
  },
  computed: {
    offsetY() {
      if (this.focusElement === 1) return 0;
      else if (this.focusElement === 2) return 160;
       else {
       return (((this.focusElement - 1) * 650) - 300);
      }
    },
    navbarBg() {
      return this.focusElement > 2 ? "#1e293b" : "transparent";
    },
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
      this.$listen('posterSelect', (item) => {
        this.src = item.background
        if (this.focusElement === 2) {
          this.title = item.title
          this.overview = item.overview
        }
        if (this.focusElement > 2) {
          this.title = ""
          this.overview = ""
        }
      })
    },
    async init() {
      this.data = [
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
      ]
    },
  },
  input: {
    down() {
      if (this.focusElement <= this.data.length) this.focusElement++;
    },
    up() {
      if (this.focusElement > 1) this.focusElement--;
    },
  },
});
