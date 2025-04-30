import Blits from "@lightningjs/blits";

import Home from "./pages/Home.js";
import ItemDetail from "./pages/ItemDetail.js";
import Movies from "./pages/Movies.js";
import GenreCollection from "./pages/GenreCollection.js";
import Series from "./pages/Series.js";
import Favourites from "./pages/Favourites.js";
import Navbar from "./components/Navbar.js";

export default Blits.Application({
  components: {
    Navbar,
  },
  hooks: {
    ready() {
      this.$listen("focusNavbar", () => {
        const row = this.$select("navbar");
        if (row && row.$focus) row.$focus();
      });
      this.$listen("focusRouter", () => {
        const row = this.$select("router-view");
        if (row && row.$focus) row.$focus();
      });
      const row = this.$select("navbar");
      if (row && row.$focus) row.$focus();
    },
  },
  watch: {
    focusElement() {
      const row = this.$select(`row${this.focusElement}`);
      if (row && row.$focus) row.$focus();
    },
  },
  template: `
    <Element>
      <Element z="1">
        <Navbar ref="navbar" />
      </Element>
      <Element y="100">
        <RouterView ref="router-view" />
      </Element>
    </Element>
  `,
  routes: [
    { path: "/", component: Home },
    { path: "/movies", component: Movies },
    { path: "/series", component: Series },
    { path: "/home", component: Home },
    { path: "/:type/:genre/:genreId", component: GenreCollection },
    { path: "/:itemType/:item", component: ItemDetail },
    { path: "/favourites", component: Favourites },
  ],
});
