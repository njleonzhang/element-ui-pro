<template>
  <div class="progress-item">
    <div class="process-title">{{title}}</div>
    <div class="process-bar">
      <div class="progress-bar__number">
        {{current}}
      </div>
      <div class="progress-bar__outer" style="height: 6px;">
        <div class="progress-bar__inner" :style="innerStyle">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      current: {
        type: Number
      },
      total: {
        type: Number
      }
    },
    computed: {
      innerStyle() {
        let progress = Math.floor(this.current / this.total * 100)
        return {
          width: `${progress}%`
        }
      }
    }
  }
</script>

<style lang='scss'>
  .progress-group {
    height: 100%;
  }
  .progress-item {
    margin-bottom: 40px;
  }
  .process-title {
    font-size: 14px;
    color: #666;
  }
  .progress-bar {
    margin-top: 15px;
  }
  .progress-bar__number {
    text-align: right;
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  .progress-bar__outer {
    margin-left: 10px;
    display: inline-block;
    vertical-align: middle;
    width: 250px;
    height: 6px;
    border-radius: 100px;
    background-color: #f3f3f3;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
  }
  .progress-bar__inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #ffc000;
    text-align: right;
    border-radius: 100px;
    line-height: 1;
    white-space: nowrap;
  }
</style>
