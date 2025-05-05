import Blits from "@lightningjs/blits";
import Card from "../components/Card";
import { fetchSearch } from "../api/api";

export default Blits.Component("SearchCollection", {
  components: {
    Card
  },
  props: ["query"],
  state() {
    return {
      focusElement: 0,
      searchResults: [],
    };
  },
  hooks: {
    async init() {
      this.searchResults = await fetchSearch(this.query);
      console.log(this.searchResults);
      this.$trigger("focusElement");
    }
  },
  watch: {
    focusElement() {

    }
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Text content="$query" x="50%" y="5%" size="60" font="raleway" color="white" align="center" />
    </Element>`,
});
