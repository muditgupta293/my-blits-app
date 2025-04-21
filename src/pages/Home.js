import Blits from "@lightningjs/blits";

import Loader from "../components/Loader.js";
import Navbar from "../components/Navbar.js";
import CardsRow from "../components/CardsRow.js";

const colors = ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa"];

export default Blits.Component("Home", {
  components: {
    Loader,
    Navbar,
    CardsRow
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Navbar x="0" mount="{x: 0.5}" y="0" ref="row1" />
      <!-- <Element :transition.y="{value: $y, duration: 300}"> -->
      <CardsRow
        :for="(item, index) in $data"
        rail="$item.title"
        railCards="$item.items"
        index="$index"
        key="$item.title"
        :y="$index * 600 + $y"
        :ref="'row' + ($index + 2)"
      />
      <!-- <CardsRow -->
      <!-- :for="(item, index) in $data" -->
      <!-- rail="$item.title" -->
      <!-- railCards="$item.items" -->
      <!-- index="$index" -->
      <!-- key="$item.title" -->
      <!-- y="$index * 600 + 100" -->
      <!-- :ref="'row' + ($index + 2)" -->
      <!-- /> -->
      <!-- </Element> -->
    </Element>
  `,
  props: ["landingPage"],
  state() {
    return {
      focusElement: 1,
      y: 100,
      data: [
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
          ],
          y: 0,
        },
        {
          title: "Top Rated Movies",
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
          ],
          y: 200,
        },
        {
          title: "Upcoming Movies",
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
          ],
          y: 400,
        },
      ],
    };
  },
  watch: {
    focusElement() {
      const row = this.$select(`row${this.focusElement}`);
      if (row && row.$focus) row.$focus();
      // Scroll behavior
    // const rowHeight = 600; // or get dynamically from rowRef.h
    // const centerY = 1080 / 2; // screen center
    // const offset = 100; // y offset from top

    // // Get the focused row's y
    // const targetY = this.focusElement * rowHeight + offset;

    // // Calculate new y for container so the focused row appears in center
    // const newContainerY = centerY - targetY;

    // this.$y = newContainerY;
    },
  },
  hooks: {
    ready() {
      this.$trigger("focusElement");
    }
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
