<style lang="scss">
  .imgs-wrap {
    .attachment {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
</style>

<template lang="pug">
  .imgs-wrap
    a(v-for='img in imgSrcs', :href='img', target='_blank')
      img.attachment(:src='img')
</template>

<script>
  export default {
    props: [
      'imgSrcs'
    ]
  }
</script>
