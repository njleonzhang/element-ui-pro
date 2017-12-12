<style lang="scss" scoped>

</style>

<template lang="pug">
  .single-selector
    el-checkbox(v-for='select in selects', :label='select.code',
      :key='select.code', :value='select.code === innerCode',
      @change='onSelect(select.code)') {{select.name}}
</template>

<script>
  export default {
    props: {
      code: String,
      index: Number,
      selects: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        innerCode: ''
      }
    },

    watch: {
      code: {
        immediate: true,
        handler(val) {
          this.innerCode = val
        }
      }
    },

    methods: {
      onSelect(code) {
        this.innerCode = this.innerCode === code ? '' : code

        this.$emit('change', {
          index: this.index,
          code: this.innerCode
        })
      }
    }
  }
</script>
