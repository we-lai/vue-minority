<template>
  <div class="apartLetter">
    <span
      v-for="(i, index) in value"
      ref="item"
      :key="index"
      contenteditable
      class="item"
      @keydown.delete="e => deleteHandle(e, index)"
      @paste.prevent="e => pasteHandle(e, index)"
      @input="e => inputHandle(e, index)"
    >{{ i }}</span>
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
  data() {
    return {
      value: []
    }
  },
  mounted() {
		this.value = new Array(this.maxlength).join(',').split(',')
		if (this.autofocus) {
			this.$nextTick(() => this.focusIndexItem(0))
		}
	},
  methods: {
    getValuesText() {
			return [...this.$refs.item].map(i => i.textContent)
		},
		pasteHandle(e, index) {
			const paste = e.clipboardData.getData('text')
			Array.from(paste).forEach((i, pasteIndex) => this.setItemText(index + pasteIndex, i))
			this.focusIndexItem(index + paste.length)
		},
		inputHandle(e, index) {
			this.setItemText(index, e.target.textContent)
			if (e.target.textContent.length) {
				if (index < this.maxlength - 1) {
					this.focusIndexItem(index + 1)
				} else {
					this.$refs.item[index].blur()
				}
			}
		},
		setItemText(index = 0, text = '') {
			if (index < 0 || index >= this.maxlength) return
			this.$refs.item[index].textContent = text.replace(/\s/, '').slice(0, 1)
			this.$emit('change', this.getValuesText())
		},
		deleteHandle(e, index) {
			if (e.target.textContent === '' && index > 0) {
				this.focusIndexItem(index - 1)
				this.rangeItemToLast(index - 1)
			}
		},
		focusIndexItem(index) {
			if (index < 0 || index >= this.maxlength) return
			this.$refs.item[index].focus()
		},
		// 光标移至元素最后
		rangeToLast(element) {
			if (!(element instanceof Element)) {
				throw (new TypeError(`${ element } should be Element type`))
			}
			const range = window.getSelection()
			range.selectAllChildren(element)
			range.collapseToEnd()
		},
		rangeItemToLast(index) {
			this.rangeToLast(this.$refs.item[index])
		},
  },
}
</script>
