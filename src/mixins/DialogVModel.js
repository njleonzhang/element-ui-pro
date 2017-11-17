export default {
  props: {
    value: [Boolean]
  },
  data() {
    return {
      modelShow: false
    }
  },
  watch: {
    value(val) {
      this.modelShow = val
    }
  },
  methods: {
    open() {
      this.$emit('open')
    },

    close() {
      this.modelShow = false
      this.$emit('input', this.modelShow) // 实现v-model
      this.$emit('close')
    }
  }
}
