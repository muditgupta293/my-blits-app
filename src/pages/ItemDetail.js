import Blits from "@lightningjs/blits";
import { fetchItemDetail, fetchSimilarContent, getImageUrl } from "../api/api";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import CardsRow from "../components/CardsRow";

export default Blits.Component("ItemDetail", {
  components: {
    Background,
    Navbar,
    CardsRow
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
        vote_average: 0,
        genres: [
          {
            id: "",
            name: "",
          },
        ],
      },
      similarData: [{
        title: "",
        items: [],
      }],
      itemId: "",
      btnBgColor: "#7dcaad",
      scaleBtn: 1,
      itemOffset: 30
    };
  },
  computed: {
    getReleaseDate() {
      if (this.itemDetail.status === "Released") {
        return new Date(this.itemDetail.release_date).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });
      }
      return "Coming Soon...";
    },
    offsetY() {
      if (this.focusElement <= 1) return 0;
      else return 300;
    },
  },
  watch: {
    focusElement() {
      const item = this.$select(`item${this.focusElement}`);
      if (item && item.$focus) item.$focus();
    },
  },
  hooks: {
    async init() {
      this.itemId =
        window.location.href.split("/")[
          window.location.href.split("/").length - 1
        ];
      this.itemDetail = await fetchItemDetail(this.itemId);
      this.imgSrc = getImageUrl(this.itemDetail.backdrop_path, "w1280");
      this.similarData = [{
        title: "Similar Content for You",
        items: await fetchSimilarContent(this.itemId),
      }];
    },
    ready() {
      this.$trigger("focusElement");
    },
    focus() {
      this.scaleBtn = 1.1;
      this.btnBgColor = "#000";
    },
    unfocus() {
      this.scaleBtn = 1;
      this.btnBgColor = "#7dcaad";
    },
  },
  template: `
    <Element w="1920" h="1080" color="#1e293b">
      <Background :bgImg="$imgSrc" alpha="0.5" />
      <Element
        w="1920"
        h="1080"
        :y.transition="{value: 0-$offsetY, delay: 200, easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}"
      >
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
          maxlines="3"
        />
        <Element
          y="520"
          h="80"
          x="100"
          :color="{left: $focusElement === 1 ? '#000' : '#7dcaad', right: '#8a9199'}"
          :scale="{value: $focusElement === 1 ? 1.1 : 1, duration: 200}"
          maxlines="1"
          maxwidth="400"
          :effects="[{type: 'radius', props: {radius: 5}}]"
          ref="item1"
        >
          <Text
            content="Add to Watchlist"
            placement="{x: 'center', y: 'middle'}"
            :color="$focusElement === 1 ? '#fff' : '#000'"
          />
        </Element>
      </Element>
      <Element
        x="0"
        :y.transition="{value: 700-$offsetY, delay: 200, easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}"
        w="1920"
        color="#000"
      >
        <CardsRow
          :if="$similarData.length > 0"
          :for="(item, index) in $similarData"
          :railTitle="$item.title"
          :railCards="$item.items"
          index="$index"
          key="$item.title"
          :ref="'item' + ($index + 2)"
        />
      </Element>
    </Element>
  `,
  input: {
    down() {
      if (this.focusElement < 2) {
        this.focusElement++;
      }
    },
    up() {
      if (this.focusElement > 0) {

        this.focusElement--;
        if (this.focusElement === 1) {
          const row1 = this.$select("item1");
          if (row1 && row1.$focus) row1.$focus();
        }
      }
    },
    enter() {
      if (this.focusElement === 0) {
        console.log("add to watchlist");
      }
    }
  },
});
