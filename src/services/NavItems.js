export default [
  {
    name: '首页',
    icon: 'el-icon-my el-icon-my-home',
    index: '/mgmt/home'
  },
  {
    name: '楼栋房屋管理',
    icon: 'el-icon-my el-icon-my-rooms',
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
    icon: 'el-icon-my el-icon-my-staff',
    children: [
      {
        name: '用户列表',
        index: '/mgmt/staff'
      }
    ]
  }
]
