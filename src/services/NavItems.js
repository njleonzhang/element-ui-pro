export default [
  {
    name: '首页',
    icon: 'el-icon-mgmt el-icon-mgmt-home',
    index: '/mgmt/home'
  },
  {
    name: '楼栋房屋管理',
    icon: 'el-icon-mgmt el-icon-mgmt-building',
    children: [
      {
        name: '房屋管理',
        index: '/mgmt/rooms'
      },
      {
        name: '楼栋管理',
        index: '/mgmt/buildings'
      }
    ]
  },
  {
    name: '用户管理',
    icon: 'el-icon-mgmt el-icon-mgmt-user',
    children: [
      {
        name: '用户列表',
        index: '/mgmt/staff'
      }
    ]
  }
]
