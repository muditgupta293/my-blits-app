import Blits from "@lightningjs/blits"

import Home from "./pages/Home.js"
import ItemDetail from "./pages/ItemDetail.js"
import Movies from "./pages/Movies.js"
import GenreCollection from "./pages/GenreCollection.js"
import Series from "./pages/Series.js"
import Favourites from "./pages/Favourites.js"

export default Blits.Application({
  template: `
    <Element>
      <RouterView />
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
})
