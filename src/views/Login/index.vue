<style lang='scss'>
  .login-page {
    background-color: black;
    height: 100%;
    min-width: 500px;
    min-height: 800px;

    p {
      text-align: center;
    }

    .login-form-wrapper {
      position: absolute;
      width: 380px;
      margin: auto;
      top: 20%;
      left: 0;
      right: 0;
      background-color: rgba(50,50,50,0.6);
    }

    .login-form {
      margin: auto;
      width: 300px;
    }

    .logo-wrapper {
      text-align: center;
    }

    .logo {
      width: 80px;
      margin-top: 30px;
    }

    .login-button{
      margin-top: 20px;
      width: 100%;
    }

    .captcha {
      height: 30px;
      vertical-align: middle;
    }

    #particles-container {
      height: 100%;
    }
  }
</style>

<template lang='pug'>
  .login-page
    #particles-container
    .login-form-wrapper
      .logo-wrapper
        img.logo(src='@/assets/images/logo.svg')
      p 后台管理系统
      el-form.login-form(:model='loginData', label-position='top', :rules='rules', ref='form')
        el-form-item(label='用户名', prop='username')
          el-input(v-model='loginData.username', @keyup.enter.native='login')
        el-form-item(label='密码', prop='password')
          el-input(v-model='loginData.password', type='password', @keyup.enter.native='login')
        el-form-item(label='验证码', prop='captcha_code')
          el-row
            el-col(:span=14)
              el-input(v-model='loginData.captcha_code', @keyup.enter.native='login')
            el-col(:span=8, :offset='2')
              img.captcha(:src='captchaUrl' @click='refreshCaptcha')
        el-form-item
          el-button.login-button(type='success' @click='login') 登录
</template>

<script>
// eslint-disable-next-line
import particles from 'exports-loader?particlesJS=window.particlesJS,window.pJSDom!particles.js'
import config from './particlesConfig'
import {CachedBlockId} from '@/services/CachedStorages'
// import { CachedCsrf } from '@/services/CachedCookies'
// import types from '@/store/types'
import { Auth } from '@/api'

export default {
  data() {
    return {
      loginData: {
        username: '',
        password: '',
        captcha_code: ''
      },
      captchaUrl: '',
      isLogin: true,

      rules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'change'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'change'
        }],
        captcha_code: [{
          required: true, message: '请输入验证码', trigger: 'change'
        }]
      }
    }
  },

  // beforeRouteEnter(to, from, next) {
  //   HttpService.SCCommonGet('common/refresh-captcha').then(data => {
  //     next(vm => {
  //       vm.initCaptchaData(data)
  //     })
  //   })
  // },

  mounted() {
    particles.particlesJS('particles-container', config)
  },

  methods: {
    login() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            let data = await Auth.login(this.loginData)
            if (data.block_id) {
              CachedBlockId.set(data.block_id)
              // this.$store.dispatch(types.userInfo.SAVE, data)
              // CachedCsrf.renew()
            }
            this.$router.push('/mgmt/home')
          } catch (e) {
            console.log(e)
            this.refreshCaptcha()
          }
        }
      })
    },

    initCaptchaData(data) {
      this.loginData.captcha_key = data.captcha_key
      this.captchaUrl = data.captcha_img_url
    },

    async refreshCaptcha() {
      let data = await Auth.refreshCaptcha()
      this.initCaptchaData(data)
    }
  }
}
</script>
