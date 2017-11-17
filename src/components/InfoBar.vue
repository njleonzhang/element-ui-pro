<style lang='scss'>
  .info-bar {
    height: 36px;
    margin-bottom: 22px;
    font-size: 14px;
    color: $label-color;

    span {
      display: inline-block;
      line-height: 36px;
    }

    .label {
      text-align: right;

      span {
        margin-right: 12px;
      }
    }
  }
</style>

<template lang='pug'>
  .info-bar
    span.label(:style='labelStyle')
      span {{label}}
    span.val
      span {{val}}
</template>

<script>
  export default {
    props: {
      label: String,
      val: String,
      labelWidth: String
    },

    computed: {
      labelStyle() {
        return {
          width: this.labelWidth
        }
      }
    }
  }
</script>
