<template>
  <el-card class="number-card">
    <h3 class="card-title">{{title}}</h3>
    <p class="card-number">{{number}}</p>
  </el-card>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      number: {
        type: [String, Number],
        default: ''
      }
    }
  }
</script>

<style lang='scss'>
  .number-card {
    height: 120px;
    box-sizing: border-box;
    .card-title {
      margin: 0;
      line-height: 1;
      font-size: 14px;
      color: #999999;
    }
    .card-number {
      text-align: center;
      margin: 0;
      line-height: 1;
      font-size: 42px;
      color: #333333;
      margin-top: 24px;
      font-weight: bold;
    }
  }
</style>
