<template lang="pug">
  common-dialog(title='修改密码', :loading='loading', size='tiny', v-model='modelShow' @close="close" @open='open' @confirm='confirm')
    el-form(:model='innerData', :rules='rules' label-width="120px" ref="form")
      el-form-item(label='老密码', prop="old_password")
        el-input(v-model='innerData.old_password')
        el-input(v-show='false', type='text', name="password_fake")
      el-form-item(label='新密码', prop="new_password")
        el-input(v-model='innerData.new_password', type='password')
      el-form-item(label='重复新密码', prop="new_password_repeat")
        el-input(v-model='innerData.new_password_repeat', type='password')
</template>
<script>
  import FormDialogMixin from '@/mixins/FormDialog'

  export default {
    mixins: [
      FormDialogMixin
    ],

    data() {
      return {
        innerData: {
          old_password: '',
          new_password: '',
          new_password_repeat: ''
        },
        rules: {
          old_password: [{
            required: true, message: '请填写用老密码', trigger: 'change'
          }],
          new_password: [{
            required: true, message: '请填写新密码', trigger: 'change'
          }],
          new_password_repeat: [{
            required: true, message: '请填写重复密码', trigger: 'change'
          }]
        }
      }
    },

    methods: {
      open() {
        this.reset()
      },

      confirm() {
        this.validate().then(_ => {
          if (this.innerData.new_password !== this.innerData.new_password_repeat) {
            this.$message('两次填写的密码不一致')
            return
          }

          // HttpService.SCPrefixPost('staff/reset-password', this.innerData).then(_ => {
          //   this.$message({
          //     type: 'success',
          //     message: '修改成功'
          //   })
          //   this.modelShow = false
          // })
        })
      }
    }
  }
</script>
