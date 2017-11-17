<style lang="scss">
  body {
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .app-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<template lang="pug">
  .app-wrapper
    vue-progress-bar
    router-view
</template>

<script>
  export default {
    created() {
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start()
      this.$router.beforeEach((to, from, next) => {
        this.$Progress.start()
        next()
      })

      this.$router.afterEach(_ => {
        this.$Progress.finish()
      })
    },
    mounted() {
      this.$Progress.finish()
    }
  }
</script>
