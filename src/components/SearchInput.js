import Blits from "@lightningjs/blits";
import Input from "./Input";
import Keyboard from "./Keyboard";

export default Blits.Component("SearchInput", {
  components: {
    Input,
    Keyboard,
  },
  template: `
    <Element
      w="309"
      h="67"
      :color="$focused ? '#ccc' : '#444'"
      x="75%"
      y="15"
      :effects="[{type: 'radius', props: {radius: 5}}]"
    >
      <Element z="1" w="500" h="450" color="#000" x="-50%" y="70" :alpha.transition="$keyboardAlpha">
        <Keyboard x="5%" y="-5%" margin="70" perRow="7" :query="$queryString" ref="keyboard" />
      </Element>
      <Input y="3" x="5" ref="search" :inputText="$queryString" placeholderText="Search" />
    </Element>
  `,
  state() {
    return {
      focused: false,
      queryString: "",
      keyboardAlpha: 0,
    };
  },
  methods: {
    handleKey(char) {
      this.queryString += char
    },
  },
  hooks: {
    focus() {
      this.focused = true;
      if (this.keyboardAlpha) {
        this.keyboardAlpha = 0
      }
    },
    unfocus() {
      this.focused = false;
    },
    ready() {
      this.$listen('onKeyboardInput', ({ key }) => {
        this.handleKey(key)
      })
    }
  },
  input: {
    enter() {
      this.keyboardAlpha = 1;
      const element = this.$select("keyboard");
      if (element && element.$focus) {
        element.$focus();
      }
    },
  },
});
