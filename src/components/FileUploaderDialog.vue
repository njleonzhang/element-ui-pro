<style lang='scss'>
  .file-chooser {
    input {
      display: none;
    }

    .el-upload {
      margin: auto;
    }
  }
</style>

<template lang='pug'>
  el-dialog.file-chooser(v-model='modelShow', size='tiny', :title="title", @close='close')
    a(:href='template') 下载模板
    el-upload(
      :action='upload',
      type='drag',
      :on-success='handleSuccess')
      i.el-icon-upload
      .el-dragger__text
        | 将文件拖到此处，或
        em 点击上传
      .el-upload__tip(slot='tip') 请上传符合模板的文件
    .dialog-footer(slot='footer')
      el-button(@click='close') 关闭
</template>

<script>
  import DialogVModelMixin from '@/mixins/DialogVModel'

  export default {
    mixins: [
      DialogVModelMixin
    ],

    props: {
      title: String,
      url: {
        type: String,
        default: ''
      },
      template: String,
      upload: {
        type: String,
        default: ''
      }
    },

    methods: {
      handleSuccess(response, file, fileList) {
        console.log(response, file, fileList)
      }
    }
  }
</script>
