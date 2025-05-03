import Blits from "@lightningjs/blits";
import { fetchItemDetail, fetchSimilarContent, getImageUrl } from "../api/api";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import CardsRow from "../components/CardsRow";
import { isInWatchlist, toggleWatchlist } from "../utils/favouritesUtil";

export default Blits.Component("ItemDetail", {
  components: {
    Background,
    Navbar,
    CardsRow,
  },
  props: ["itemType", "item"],
  state() {
    return {
      focusElement: 0,
      imgSrc: "",
      itemDetail: {
        title: "",
        release_date: "",
        first_air_date: "",
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
      similarData: [
        {
          title: "",
          items: [],
        },
      ],
      itemId: "",
      btnBgColor: "#7dcaad",
      scaleBtn: 1,
      favouriteStatus: false,
    };
  },
  computed: {
    getReleaseDate() {
      if (
        this.itemDetail.status === "In Production" ||
        this.itemDetail.status === "Upcoming"
      ) {
        return "Coming Soon...";
      } else
      {
        try {
          return new Date(
            this.itemDetail.release_date || this.itemDetail.first_air_date,
          ).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          });
        } catch {
          return "";
        }
      }
    },
    offsetY() {
      if (this.focusElement <= 1) return 0;
      else return 300;
    },
    getBtnName() {
      this.favouriteStatus;
      return isInWatchlist(this.itemId)
        ? "Remove from Watchlist"
        : "Add to Watchlist";
    },
  },
  watch: {
    focusElement(value) {
      const item = this.$select(`item${this.focusElement}`);
      if (item && item.$focus) item.$focus();
      if (value == 1 || value == 0) {
        this.$emit("changeNavbarColor", "transparent");
      } else {
        this.$emit("changeNavbarColor", "#333");
      }
    }
  },
  hooks: {
    async init() {
      this.itemId =
        window.location.href.split("/")[
          window.location.href.split("/").length - 1
        ];
      const itemType = window.location.hash
        .replace("#", "")
        .split("/")[1]
        .includes("movie")
        ? "movie"
        : "tv" || "movie";
      this.itemDetail = await fetchItemDetail(itemType, this.itemId);
      this.imgSrc = getImageUrl(this.itemDetail.backdrop_path, "w1280");
      this.similarData = [
        {
          title: "Similar Content for You",
          items: await fetchSimilarContent(itemType, this.itemId),
        },
      ];
    },
    ready() {
      this.$trigger("focusElement");
    },
    focus() {
      this.focusElement = 1;
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
          :content="{value: $itemDetail.title || $itemDetail.name}"
          font="raleway"
          color="#eee"
          size="80"
          x="100"
          y="120"
          maxwidth="1000"
          maxlines="1"
        />
        <Element :if="$itemDetail && $itemDetail.release_date && $itemDetail.release_date.length > 0">
          <Text :content="$getReleaseDate" size="25" color="#eee" x="100" y="230" />
        </Element>
        <Element
          :for="(genre, index) in $itemDetail.genres"
          :x="($index * 150) + 300"
          y="230"
          h="22"
          color="{left: '#fff', right: '#8a9199'}"
          maxlines="1"
          maxwidth="120"
          :key="$genre.id"
          :effects="[{type: 'radius', props: {radius: 5}}]"
        >
          <Text :content="$genre.name" y="3" x="8" maxlines="1" maxwidth="120" lineheight="20" size="18" color="#000" />
        </Element>
        <Text :content="'Rating: ' + $itemDetail.vote_average.toFixed(1) + '/10'" size="22" color="#eee" x="100" y="270" />
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
          :color="{left: $focusElement === 1 ? '#7dcaad' : '#000', right: '#8a9199'}"
          :scale.transition="{value: $focusElement === 1 ? 1.1 : 1, duration: 400}"
          maxlines="1"
          maxwidth="400"
          :effects="[{type: 'radius', props: {radius: 5}}]"
          ref="item1"
        >
          <Text
            :content="$getBtnName"
            placement="{x: 'center', y: 'middle'}"
            :color="$focusElement === 1 ? '#000' : '#fff'"
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
      if (this.focusElement > 1) {
        this.focusElement--;
      } else {
        this.focusElement--;
        this.$emit("focusNavbar");
      }
    },
    enter() {
      if (this.focusElement === 1) {
        this.favouriteStatus = toggleWatchlist(this.itemDetail) === "added";
      }
    }
  },
});
