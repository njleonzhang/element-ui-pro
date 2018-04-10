<style lang='scss'>
  .my {
    margin-top: 100px;

    .button-wraper {
      float: right;
    }
  }
</style>

<template lang='pug'>
  .manage-page
    .mgmt-title 个人信息

    el-row.my
      el-col(:span='12', :offset='6')
        info-bar(label='工号', :val='detail.employee_id' label-width="80px")
        el-form(:model='detail', :rules='rules' label-width="80px" ref="form")
          el-row
            el-col(:span='12')
              el-form-item(label='姓名', prop="name")
                el-input(v-model='detail.name')
            el-col(:span='12')
              el-form-item(label='生日', prop="birthday")
                el-date-picker(
                  v-model='detail.birthday',
                  format='yyyy-MM-dd',
                  type='date')
          el-form-item(label='身份证号', prop="id_number")
            el-input(v-model='detail.id_number')
          el-row
            el-col(:span='12')
              el-form-item(label='性别', prop="gender_code")
                el-select(v-model='detail.gender_code', placeholder='请选择性别')
                  el-option(label='男', value='1')
                  el-option(label='女', value='2')
            el-col(:span='12')
              el-form-item(label='手机', prop="cellphone")
                el-input(v-model='detail.cellphone')
          el-form-item(label='家庭住址', prop="address")
            el-input(v-model='detail.address')
          el-form-item
            .button-wraper
              el-button(type='primary', @click='onSubmit') 保存
              el-button(type='primary', @click='onRevisePd') 修改密码
</template>

<script>
  // import HttpService from '@/services/Http'
  import InfoBar from '@/components/InfoBar'
  // import types from '@/store/types'
  import {isCellphone, isIdNumber} from '@/services/Validate'

  export default {
    components: {
      InfoBar
    },

    data() {
      return {
        detail: {},
        revisePdDialogShow: false,
        rules: {
          name: [{
            required: true, message: '请填写用户姓名', trigger: 'change'
          }],
          cellphone: [{
            required: true, message: '请填写手机号码', trigger: 'change'
          }]
        }
      }
    },

    // beforeRouteEnter(to, from, next) {
      // HttpService.SCPrefixGet('staff/detail').then(data => {
      //   next(vm => {
      //     vm.detail = data
      //   })
      // })
    // },

    methods: {
      onSubmit() {
        console.log(this.$refs)
        this.$refs.form.validate(valid => {
          if (valid) {
            let data = Object.assign({}, this.detail, {
              // birthday: dateToDateStr(this.detail.birthday)
            })
            if (!data.gender_code.length) {
              data.gender_code = '0'
            }

            let errMsg = ''
            if (!isCellphone(data.cellphone)) {
              errMsg = '请检查输入的手机号码格式'
            } else if (data.id_number && !isIdNumber(data.id_number)) {
              errMsg = '请检查输入的身份证号格式'
            }
            if (errMsg) {
              this.$message(errMsg)
              // return
            }

            // HttpService.SCPrefixPost('staff/update', data).then(_ => {
            //   this.$message({
            //     type: 'success',
            //     message: '更新成功'
            //   })
            //   this.$store.dispatch(types.userInfo.UPDATE, {
            //     name: _.name
            //   })
            // })
          } else {
            return false
          }
        })
      },

      onRevisePd() {
        this.revisePdDialogShow = true
      }
    }
  }
</script>
