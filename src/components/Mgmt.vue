<style scoped lang='scss'>
  $header-height: 64px;
  $main-min-width: 1280px;

  .mgmt {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-width: $main-min-width;
  }

  .header {
    background-color: white;
    height: $header-height;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    i {
      display: inline-block;
      line-height: $header-height;
      color: rgba(0, 0, 0, 0.65);
      font-size: 30px;
      vertical-align: middle;

      &.hover {
        font-size: 32px;
      }
    }

    .title-logo {
      width: 140px;
      margin: 0 10px 0 20px;
      vertical-align: middle;
      cursor: pointer;
    }

    .right {
      float: right;
      margin-right: 20px;
      .el-dropdown-link {
        color: #fff;
      }

      .user-info {
        margin-right: 10px;
      }
    }
  }

  .right-side {
    margin-left: $side-width;
    height: 100%;
    overflow: scroll;
    transition: margin-left .3s;
    position: relative;

    &.slide-close {
      margin-left: $side-close-width;
    }
  }

  .main {
    background: $main-area-bg;
    position: absolute;
    top: $header-height;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>

<template lang="pug">
  .mgmt
    side-bar
    .right-side(:class="{'slide-close': sideClose}")
      .header
        img.title-logo(src='@/assets/images/titleLogo.png' @click='gotoHome')
        i.el-icon-my.el-icon-my-toggle.toggle(
          v-hover=''
          @click="toggleSlide")
        .right
          el-dropdown(@command='dropDownItemClick')
            span.el-dropdown-link
              span.user-info {{userInfo}}
              i.el-icon-my.el-icon-my-user(v-hover='')
            el-dropdown-menu(slot='dropdown')
              el-dropdown-item(command='gotoMy') 个人信息
              el-dropdown-item(command='logout') 退出登录
      .main
        router-view
</template>

<script>
  import SideBar from '@/components/SideBar'
  import HttpService from '@/services/Http'
  import types from '@/store/types'

  export default {
    components: {
      SideBar,
    },
    computed: {
      sideClose() {
        return this.$store.state.sideBar.close
      },
      userInfo() {
        return this.$store.state.userInfo.content
      }
    },
    data() {
      return {
        isHover: false
      }
    },
    methods: {
      toggleSlide() {
        this.$store.dispatch(types.sideBar.TOGGLE)
      },

      dropDownItemClick(command) {
        switch (command) {
          case 'gotoMy':
            this.$router.push('/mgmt/my')
            break

          case 'logout':
            HttpService.SCCommonGet('staff/logout').then(_ => {
              this.$message({
                type: 'success',
                message: '登出成功'
              })
              this.$store.dispatch(types.userInfo.DELETE)
              this.$router.push('/login')
            })
            break

          default:
            // 不会到这里
        }
      },

      gotoHome() {
        this.$router.push('/mgmt/home')
      }
    },

    created() {
      this.$store.dispatch(types.userInfo.UPDATE)
    },

    directives: {
      hover: {
        bind(el) {
          let hoverClass = ' hover'

          el.addEventListener('mouseover', _ => {
            el.className += hoverClass
          })

          el.addEventListener('mouseout', _ => {
            let name = el.className
            el.className = name.replace(hoverClass, '')
          })
        }
      }
    }
  }
</script>
