<template lang='pug'>
  .not-found
</template>

<script>
  export default {
    beforeRouteEnter(to, from, next) {
      window.location.href = '/static/404/404.html'
      next(false)
    }
  }
</script>
