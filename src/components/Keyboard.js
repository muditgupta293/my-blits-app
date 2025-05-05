import Blits from '@lightningjs/blits'

const Key = Blits.Component('Key', {
  template: `
    <Element w="55" h="55">
      <Text :content="$inputValue" size="28" align="center" w="70" />
    </Element>
  `,
  props: ['value', 'layout'],
  computed: {
    inputValue() {
      return this.layout === 'upper' ? this.value.toUpperCase() : this.value
    },
  },
})

export default Blits.Component('Keyboard', {
  components: {
    Key,
  },
  template: `
    <Element>
      <Element w="60" h="60" mount="{x:0.5, y:0.5}" :x.transition="$focusX" :y.transition="$focusY" color="0xffffff33" />
      <Key :for="(item, index) in $keys" :x="$keyX" ref="key" key="$item" value="$item" :y="$keyY" :layout="$layout" />
    </Element>
  `,
  props: ['margin', 'perRow', 'query'],
  computed: {
    focusX() {
      return (this.focusIndex % this.perRow) * this.margin + 8
    },
    focusY() {
      return ~~(this.focusIndex / this.perRow) * this.margin + 70
    },
    keyX() {
      return (this.index % this.perRow) * this.margin
    },
    keyY() {
      return Math.floor(this.index / this.perRow) * this.margin + 50
    },
  },
  state() {
    return {
      focusIndex: 0,
      layout: 'lower',
      keys: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '-',
        '_',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        'Go',
      ],
    }
  },
  input: {
    left() {
      if (this.focusIndex % this.perRow === 0) {
        this.focusIndex = Math.min(this.focusIndex + this.perRow - 1, this.keys.length - 1)
      } else {
        this.focusIndex = Math.max(this.focusIndex - 1, 0)
      }
    },
    right() {
      if (this.focusIndex % this.perRow === this.perRow - 1) {
        this.focusIndex -= this.perRow - 1
      } else {
        this.focusIndex = Math.min(this.focusIndex + 1, this.keys.length - 1)
      }
    },
    up() {
      this.focusIndex = Math.max(this.focusIndex - this.perRow, 0)
    },
    down() {
      this.focusIndex = Math.min(this.focusIndex + this.perRow, this.keys.length - 1)
    },
    enter(e) {
      const key = this.keys[this.focusIndex]
      if(key.toLowerCase() === 'go') {
        this.parent.$focus()
        this.$router.to(`/search-results/${this.query}`)
      } else {
        this.$emit('onKeyboardInput', {
          key: this.layout === 'upper' ? key.toUpperCase() : key,
        })
      }
    },
    any(e) {
      if (e.key === 'Shift') {
        this.layout = this.layout === 'lower' ? 'upper' : 'lower'
      }
      if (e.key === 'Escape') {
        this.parent.$focus()
      }
    },
    back() {
      this.parent.$focus()
    },
  },
})
