import Blits from "@lightningjs/blits";
import { fetchItemDetail, fetchSimilarContent, getImageUrl } from "../api/api";
import Background from "../components/Background";

export default Blits.Component("ItemDetail", {
  components: {
    Background,
  },
  state() {
    return {
      focusElement: 0,
      imgSrc: "",
      itemDetail: {
        title: "",
        release_date: "",
        overview: "",
        status: "",
        backdrop_path: "",
        vote_average:0,
        genres: [{
          id: "",
          name: ""
        }],
      },
      similarItems: [],
      itemId: "",
      btnBgColor: "#7dcaad",
      scaleBtn: 1,
    };
  },
  computed: {
    getReleaseDate() {
      if(this.itemDetail.status === "Released") {
        return new Date(this.itemDetail.release_date).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })
      }
      return "Coming Soon..."
    }
  },
  watch: {
    focusElement() {
      const item = this.$select(`row${this.focusElement}`);
      console.log(item)
      if (item && item.$focus) item.$focus();
    },
  },
  hooks: {
    async init() {
      this.itemId = window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
      this.similarItems = await fetchSimilarContent(this.itemId);
      this.itemDetail = await fetchItemDetail(this.itemId)
      this.imgSrc = getImageUrl(this.itemDetail.backdrop_path, "w1280")
    },
    ready() {
      this.$trigger("focusElement");
    },
    focus() {
      console.log("focus");
      this.scaleBtn = 1.1;
      this.btnBgColor = "#fff";
    },
    unfocus() {
      this.scaleBtn = 1;
      this.btnBgColor = "#7dcaad";
    },
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Background :bgImg="$imgSrc" alpha="0.5" />
      <Text
        :content="$itemDetail.title"
        font="raleway"
        color="#eee"
        size="80"
        x="100"
        y="60"
        maxwidth="1000"
        maxlines="1"
      />
      <Text :content="$getReleaseDate" size="25" color="#eee" x="100" y="200" />
      <Element
        :for="(genre, index) in $itemDetail.genres"
        :x="($index * 120) + 300"
        y="200"
        h="22"
        color="{left: '#fff', right: '#8a9199'}"
        maxlines="1"
        maxwidth="100"
        :key="$genre.id"
        :effects="[{type: 'radius', props: {radius: 5}}]"
      >
        <Text :content="$genre.name" align="center" y="3" x="8" lineheight="20" size="18" color="#000" />
      </Element>
      <Text :content="'Rating: ' + $itemDetail.vote_average.toFixed(1) + '/10'" size="22" color="#eee" x="100" y="240" />
      <Text
        :content="$itemDetail.overview"
        size="32"
        color="#ced4da"
        maxwidth="1080"
        x="100"
        y="350"
        lineheight="45"
        maxlines="4"
      />
      <Element
        y="600"
        h="80"
        x="100"
        :color="{left: $btnBgColor, right: '#8a9199'}"
        :scale="{value: $scaleBtn, duration: 200}"
        maxlines="1"
        maxwidth="400"
        :effects="[{type: 'radius', props: {radius: 5}}]"
        ref="row0"
      >
        <Text content="Add to Watchlist" placement="{x: 'center', y: 'middle'}" color="#000" />
      </Element>
    </Element>
  `,
  input: {
    down () {
      if (this.focusElement === 0) {
        this.focusElement = 1;
      }
    },
    up () {
      if (this.focusElement === 1) {
        this.focusElement = 0;
      }
    }
  }
});
