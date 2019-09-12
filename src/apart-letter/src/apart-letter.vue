// 文字分离的输入框: Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ
<template>
  <div class="apartLetterInput">
    <input
      ref="input"
      class="input"
      :autofocus="autofocus"
      @keydown="keydownHandle"
      @blur="blurHandle"
    >
    <div
      v-for="(i, index) in value"
      ref="item"
      :key="index"
      class="item"
      :class="{ 'activated': focusIndex === index }"
      @click="focusItem(index)"
    >
      {{ focusIndex === index ? '' : i }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MinoApartLetter',
  props: {
		maxlength: {
			type: Number,
			default: 5,
		},
		autofocus: Boolean,
	},
  data () {
    return {
      value: [],
      focusIndex: -1,
    }
  },
  mounted () {
    this.value = new Array(this.maxlength).join(',').split(',');
		if (this.autofocus) {
			this.$nextTick(() => this.focusItem(0));
		}
  },
  methods: {
    keydownHandle(e) {
      const { key, keyCode } = e

      if (this.focusIndex < 0 || this.focusIndex >= this.maxlength) return

      // 删除字符
      if (key === 'Backspace') {
        this.$set(this.value, this.focusIndex, '')
        this.focusIndex >= 1 ? this.focusIndex -= 1 : this.focusIndex = 0

      }

      // 搜狗类输入法会在 keyCode 为 0 时输入多个 key
      if (keyCode !== 0 && key.length === 1) {
        this.$set(this.value, this.focusIndex, key)
        this.focusIndex < this.maxlength - 1 ? this.focusIndex += 1 : this.focusIndex = -1
      }

      this.$emit('change', this.value)
    },
    blurHandle() {
      this.focusIndex = -1
    },
    focusItem(index) {
      this.focusIndex = index
      this.$refs.input.focus()
    },
  }
}
</script>

<style lang="scss">
$box-size: 3rem;
$letter-space: .8rem;
$font-size: 1.8rem;
@keyframes bling {
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
.apartLetterInput {
  font-size: $font-size;
  position: relative;
  .input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    width: 0;
    height: 0;
    display: block;
  }
  .item {
    display: inline-block;
    vertical-align: middle;
    outline: none;
    width: $box-size;
    height: $box-size;
    line-height: $box-size;
    border: 1px solid #78879c;
    border-radius: .25rem;
    text-align: center;
    position: relative;
    &.activated {
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 1px;
        height: $box-size * .6;
        background: #000;
        content: '';
        animation: bling 1s step-end infinite;
      }
    }
    &:not(:last-child) {
      margin-right: $letter-space;
    }
  }
}
</style>
