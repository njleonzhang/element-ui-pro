<template lang="pug">
  el-dialog(:title='title', v-model='modelShow', :size='size', @close='close', @open='open')
    slot
    .dialog-footer(slot='footer')
      el-button(@click='close') 取 消
      el-button(type='primary', @click='confirm', :loading='loading') 确 定
</template>

<script>
  import DialogVModelMixin from '@/mixins/DialogVModel'

  export default {
    props: {
      title: String,
      size: {
        type: String,
        default: 'small'
      },

      loading: {
        type: Boolean,
        default: false
      }
    },

    mixins: [DialogVModelMixin],
    methods: {
      confirm() {
        this.$emit('confirm')
      }
    }
  }
</script>
