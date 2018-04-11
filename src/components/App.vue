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
      this.$router.beforeEach((to, from, next) => {
        this.$Progress.start()
        next()
      })

      this.$router.afterEach(_ => {
        this.$Progress.finish()
      })
    },
    mounted() {
      this.$nextTick(() => {
        const preloadItem = document.getElementById('preloader')
        preloadItem && document.body.removeChild(preloadItem)
      })
    }
  }
</script>
