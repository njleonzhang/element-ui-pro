<template lang='pug'>
  .not-found
</template>

<script>
  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$nextTick(() => {
          window.location.replace('/static/404/404.html')
        })
      })
    }
  }
</script>
