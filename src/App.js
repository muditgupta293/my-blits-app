import Blits from "@lightningjs/blits"

import Home from "./pages/Home.js"
import ItemDetail from "./pages/ItemDetail.js"
import Movies from "./pages/Movies.js"
import GenreCollection from "./pages/GenreCollection.js"

export default Blits.Application({
  template: `
    <Element>
      <RouterView />
    </Element>
  `,
  routes: [
    { path: "/", component: Home },
    { path: "/movies", component: Movies },
    { path: "/home", component: Home },
    { path: "/movie-list/:genre/:genreId", component: GenreCollection },
    { path: "/item-detail/:itemId", component: ItemDetail },
  ],
})
