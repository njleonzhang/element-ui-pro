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
    padding-left: 24px;
    color: $primary-font;

    i {
      display: inline-block;
      line-height: $header-height;
      font-size: 20px;
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
      height: 100%;
      float: right;
      margin-right: 20px;

      .user-info {
        margin-right: 10px;
      }

      .el-icon-mgmt-user {
        font-size: 30px;
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
    padding: 24px;
    overflow-y: scroll;
  }

</style>

<template lang="pug">
  .mgmt
    side-bar
    .right-side(:class="{'slide-close': sideClose}")
      .header
        i.el-icon-mgmt(
          :class='sideClose ? "el-icon-mgmt-menu-unfold" : "el-icon-mgmt-menu-fold"'
          @click='toggleSlide')
        .right
          el-dropdown(@command='dropDownItemClick')
            span.el-dropdown-link
              .user-info
                .left-part
                  i.el-icon-mgmt.el-icon-mgmt-user
                .middle-part
                  p {{ userInfo.name }}
                  p {{ userInfo.role }}    
                .right-part
                  span.el-icon-arrow-down 
            el-dropdown-menu(slot='dropdown')
              el-dropdown-item(command='gotoMy') 个人信息
              el-dropdown-item(command='logout') 退出登录
      .main
        router-view
</template>

<script>
  import SideBar from '@/components/layout/SideBar'
  import types from '@/store/types'
  import { Auth } from '@/api'

  export default {
    components: {
      SideBar
    },
    computed: {
      sideClose() {
        return this.$store.state.sideBar.close
      },
      userInfo() {
        return this.$store.state.userInfo.content
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
            Auth.logout().then(() => {
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
    }
  }
</script>
