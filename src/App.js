import Blits from "@lightningjs/blits"

import Home from "./pages/Home.js"
import ItemDetail from "./pages/ItemDetail.js"

export default Blits.Application({
  template: `
    <Element>
      <RouterView />
    </Element>
  `,
  routes: [
    { path: "/", component: Home },
    { path: "/item-detail/:itemName", component: ItemDetail },
    { path: "/:landingPage", component: Home },
  ],
})
