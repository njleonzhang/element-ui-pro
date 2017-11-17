<style scoped lang="scss">
  // css hack for simulate ant design pro https://preview.pro.ant.design/#/dashboard/analysis

  .side-bar-wrapper {
    float: left;
    height: 100%;
  }

  .logo {
    height: $header-height;
    padding-left: 22px;
    position: relative;
    img {
      width: 32px;
      height: 32px;
      line-height: $header-height;
      display: inline-block;
      margin-right: 12px;
      vertical-align: middle;
    }

    span {
      line-height: $header-height;
      font-size: 20px;
      color: white;
      font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
      font-weight: 600;
    }
  }

  .el-menu--collapse .logo, .horizontal-collapse-transition .logo {
    img {
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
    }

    span {
      display: none !important;
    }
  }

  .menu {
    height: 100%;
    border-right: 0 !important;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

    &.el-menu--collapse {
      width: 80px;
      .el-menu-item, .el-submenu {
        text-align: center;
      }

      .el-submenu .el-menu-item {
        text-align: left;
      }

      &.horizontal-collapse-transition {
        .el-menu-item, .el-submenu {
          text-align: left;
        }
      }
    }

    &:not(.el-menu--collapse) {
      width: 256px;
    }
  }


  .el-menu-item {
    &.is-active {
      background-color: $side-active-item-bg !important;
      color: white !important;
    }

    &:hover {
      color: white !important;
    }
  }

  .el-submenu .el-menu .el-menu-item {
    background-color: $sibe-sub-item-bg !important;

    &.is-active {
      background-color: $side-active-item-bg !important;
    }
  }
</style>

<script>
  import navItems from '@/services/NavItems.js'

  export default {
    data() {
      return {
        navItems
      }
    },
    computed: {
      sideClose() {
        return this.$store.state.sideBar.close
      },
      activeIndex() {
        return this.$store.state.sideBar.active
      }
    },

    render() {
      const renderMenuItem = function(item) {
        return (
          <el-menu-item index={item.index}>
            <i class={item.icon}></i>
            <span slot='title'>{item.name}</span>
          </el-menu-item>
        )
      }

      return (
        <div class='side-bar-wrapper'>
          <el-menu
            background-color='#001529'
            text-color='#ffffffa6'
            active-text-color='#ffffffa6'
            class='menu'
            router
            collapse={this.sideClose}
            default-active={this.activeIndex}>

            <div class='logo'>
              <img src='src/assets/images/logo.svg' />
              <span>Element UI Pro</span>
            </div>

            {
              this.navItems.map((item, index) => {
                return item.index
                ? renderMenuItem(item)
                : <el-submenu index={`${index}`}>
                    <template slot="title">
                      <i class={`${item.icon}`}></i>
                      <span slot='title'>{item.name}</span>
                    </template>
                    {
                      item.children
                      ? item.children.map((childItem, itemPath) => renderMenuItem(childItem))
                      : null
                    }
                  </el-submenu>
              })
            }
          </el-menu>
        </div>
      )
    }
  }
</script>
