import Blits from "@lightningjs/blits";

import Loader from "../components/Loader.js";
import Navbar from "../components/Navbar.js";
import CardsRow from "../components/CardsRow.js";
import Background from "../components/Background.js";

const colors = ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa"];

export default Blits.Component("Home", {
  components: {
    Loader,
    Navbar,
    CardsRow,
    Background

  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Background bgImg="/assets/logo.png" />
      <Element z="1">
        <Navbar :navbarBg="$navbarBg" x="0" mount="{x: 0.5}" y="0" ref="row1" />
      </Element>
      <Element x="0" y="650" w="1920" h="980">
        <CardsRow
          :for="(item, index) in $data"
          railTitle="$item.title"
          railCards="$item.items"
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
      data: [{}]
    };
  },
  computed: {
    offsetY() {
      if (this.focusElement === 1) return 0;
      else  {
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
    },
    init() {
      this.data = [
        {
          title: "Popular Movies",
          items: [
            { name: "The Shawshank Redemption", rating: 9.2 },
            { name: "The Godfather", rating: 9.2 },
            { name: "The Dark Knight", rating: 9.0 },
            { name: "The Godfather: Part II", rating: 9.0 },
            { name: "12 Angry Men", rating: 8.9 },
            { name: "Schindler's List", rating: 8.9 },
            {
              name: "The Lord of the Rings",
              rating: 8.9,
            },
            { name: "Pulp Fiction", rating: 8.9 },
            { name: "The Good, the Bad and the Ugly", rating: 8.9 },
            { name: "Fight Club", rating: 8.8 },
          ]
        },
        {
          title: "Top Rated Movies",
          items: [
            { name: "The Shawshank Redemption", rating: 9.2 },
            { name: "gangs Of Wasseypur ", rating: 9.2 },
            { name: "The Dark Knight", rating: 9.0 },
            { name: "The Godfather: Part II", rating: 9.0 },
            { name: "12 Angry Men", rating: 8.9 },
            { name: "Schindler's List", rating: 8.9 },
            {
              name: "The Lord of the Rings",
              rating: 8.9,
            },
            { name: "Pulp Fiction", rating: 8.9 },
            { name: "The Good, the Bad and the Ugly", rating: 8.9 },
            { name: "Fight Club", rating: 8.8 },
          ]
        },
        {
          title: "Upcoming Movies",
          items: [
            { name: "The return of dawood bhai", rating: 9.2 },
            { name: "The Godfather", rating: 9.2 },
            { name: "The Dark Knight", rating: 9.0 },
            { name: "The Godfather: Part II", rating: 9.0 },
            { name: "12 Angry Men", rating: 8.9 },
            { name: "Schindler's List", rating: 8.9 },
            {
              name: "The Lord of the Rings",
              rating: 8.9,
            },
            { name: "Pulp Fiction", rating: 8.9 },
            { name: "The Good, the Bad and the Ugly", rating: 8.9 },
            { name: "Fight Club", rating: 8.8 },
          ]
        },
        {
          title: "Popular Series",
          items: [
            { name: "The Shawshank Redemption", rating: 9.2 },
            { name: "The Godfather", rating: 9.2 },
            { name: "The Dark Knight", rating: 9.0 },
            { name: "The Godfather: Part II", rating: 9.0 },
            { name: "12 Angry Men", rating: 8.9 },
            { name: "Schindler's List", rating: 8.9 },
            {
              name: "The Lord of the Rings",
              rating: 8.9,
            },
            { name: "Pulp Fiction", rating: 8.9 },
            { name: "The Good, the Bad and the Ugly", rating: 8.9 },
            { name: "Fight Club", rating: 8.8 },
          ]
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
