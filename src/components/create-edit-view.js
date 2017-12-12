const MGMT_ROOT_MAP = {
  house: {path: 'houses', caption: '房源管理'},
  householder: {path: 'householders', caption: '住户管理'},
  lock: {path: 'locks', caption: '门锁管理'}
}

export default function(Component, options) {
  let rootInfo = MGMT_ROOT_MAP[options.root.name]
  return {
    name: `${rootInfo.path}-${options.type}-view`,
    render(h) {
      let data = {
        props: {
          to: {
            path: `/mgmt/${rootInfo.path}`
          }
        }
      }
      return (
        <el-card class="page" style="overflow: scroll;">
          <div slot="header" class="clearfix">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item {...data}>{rootInfo.caption}</el-breadcrumb-item>
              <el-breadcrumb-item>{options.caption}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <Component {...{props: {options}}}>
          </Component>
        </el-card>
      )
    }
  }
}
