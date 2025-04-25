import Blits from "@lightningjs/blits";

export default Blits.Component("ItemDetail", {
  state() {
    return {
      itemRating: '',
    };
  },
  // computed: {
  //   itemRating() {
  //     return JSON.parse(JSON.stringify(this.$router.state)).params.itemname
  //   }
  // },
  hooks: {
    // init() {
    //   this.itemRating = JSON.parse(JSON.stringify(this.$router.state)).params.itemname
    // },
    ready() {
      this.itemRating = JSON.parse(JSON.stringify(this.$router.state)).params.itemname
      console.log("ItemDetail ready", JSON.parse(JSON.stringify(this.$router.state)).params.itemname);
    },
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Text :content="$itemRating" x="100" y="100" />
      <!-- <Text content="$route.params.itemName" x="100" y="100" /> -->
    </Element>
  `,
});
