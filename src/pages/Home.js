import Blits from "@lightningjs/blits";

import Loader from "../components/Loader.js";
import Navbar from "../components/Navbar.js";
import CardsRow from "../components/CardsRow.js";
import Background from "../components/Background.js";
import { fetchList } from "../api/api.js";

export default Blits.Component("Home", {
  components: {
    Loader,
    Navbar,
    CardsRow,
    Background,
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Background :bgImg="$src" />
      <Text
        :if="$title.length > 0"
        :content="$title"
        font="raleway"
        size="80"
        x="100"
        y="50"
        maxwidth="1000"
        maxlines="1"
      />
      <Text :content="$overview" maxwidth="880" x="100" y="200" lineheight="40" maxlines="3" />
      <Element x="0" y="550" w="1920">
        <CardsRow
          :if="$data.length > 0"
          :for="(item, index) in $data"
          :railTitle="$item.title"
          :railCards="$item.items"
          index="$index"
          key="$item.title"
          :y.transition="{value: 30 + ($index * 600 - $offsetY), delay: 200, easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}"
          :ref="'row' + $index"
        />
      </Element>
    </Element>
  `,
  state() {
    return {
      focusElement: 0,
      src: "https://image.tmdb.org/t/p/w300/xUkUZ8eOnrOnnJAfusZUqKYZiDu.jpg",
      title: "",
      overview: "",
      data: [
        {
          title: "",
          items: [],
        },
      ],
    };
  },
  computed: {
    offsetY() {
      if (this.focusElement === 0) return 200;
      else {
        return this.focusElement * 700;
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
      this.$listen("posterSelect", (item) => {
        this.src = item.background;
        if (this.focusElement === 0) {
          this.title = item.title;
          this.overview = item.overview;
        }
        if (this.focusElement > 0) {
          this.title = "";
          this.overview = "";
        }
      });
    },
    focus() {
      this.$trigger("focusElement");
    },
    async init() {
      this.data = [
        {
          title: "Popular Movies",
          items: await fetchList("movie", "popular"),
        },
        {
          title: "Top Rated Movies",
          items: await fetchList("movie", "top_rated"),
        },
        {
          title: "Popular Series",
          items: await fetchList("tv", "popular"),
        },
        {
          title: "Top Rated Series",
          items: await fetchList("tv", "top_rated"),
        }
      ];
      this.$trigger("focusElement");
    },
  },
  input: {
    down() {
      if (this.focusElement < this.data.length-1) this.focusElement++;
    },
    up() {
      if (this.focusElement > 0) {
        this.focusElement--;
      } else {
        this.$emit("focusNavbar");
      }
    },
  },
});
