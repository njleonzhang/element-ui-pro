// import HttpService from '@/services/Http'

// function add(vm, url, {
//   tableData = vm.$parent.tableData,
//   data = vm.innerData,
//   resultMessage = '新建成功',
//   resultType = 'success'
// }) {
//   vm.loading = true
//   return HttpService.SCPrefixPost(url, data).then(data => {
//     if (data) {
//       tableData.unshift(data)
//       vm.isDialog && (vm.modelShow = false)
//       vm.$message({
//         type: resultType,
//         message: resultMessage
//       })
//     } else {
//       vm.$message({
//         type: 'error',
//         message: '返回数据错误，请刷新页面'
//       })
//     }
//     vm.loading = false
//   }, error => {
//     console.log(error)
//     vm.loading = false
//   })
// }

// function del(vm, url, row, {
//   tableData = vm.tableData,
//   resultMessage = '删除成功',
//   resultType = 'success'
// }) {
//   vm.loading = true
//   return HttpService.SCPrefixPost(url).then(_ => {
//     tableData.splice(tableData.indexOf(row), 1)
//     vm.$message({
//       type: resultType,
//       message: resultMessage
//     })
//     vm.loading = false
//   }, error => {
//     console.error(error)
//     vm.loading = false
//   })
// }

// function update(vm, url, row, {
//   data = vm.innerData,
//   resultType = 'success',
//   resultMessage = ''
// }) {
//   vm.loading = true
//   return HttpService.SCPrefixPost(url, data).then(data => {
//     if (data) {
//       Object.assign(row, data)
//       vm.isDialog && (vm.modelShow = false)
//       console.log(resultMessage)
//       vm.$message({
//         type: resultType,
//         message: resultMessage
//       })
//     } else {
//       vm.$message({
//         type: 'error',
//         message: '返回数据错误，请刷新页面'
//       })
//     }
//     vm.loading = false
//     return data
//   }, error => {
//     console.error(error)
//     vm.loading = false
//   })
// }

// function refresh(vm, url) {
//   vm.loading = true
//   return HttpService.SCPrefixGet(url).then(data => {
//     vm.tableData = data
//     vm.loading = false
//   }, error => {
//     console.log(error)
//     vm.loading = false
//   })
// }

// function notice(vm, url, {
//   data = vm.innerData,
//   resultType = 'success',
//   resultMessage = ''
// }) {
//   vm.loading = true
//   return HttpService.SCPrefixPost(url, data).then(data => {
//     vm.isDialog && (vm.modelShow = false)
//     vm.$message({
//       type: resultType,
//       message: resultMessage
//     })
//     vm.loading = false
//   }, error => {
//     console.log(error)
//     vm.loading = false
//   })
// }

// export default {
//   methods: {
//     tableActionAdd(url, options = {}) {
//       return add(this, url, options)
//     },
//     tableActionDel(url, row, options = {}) {
//       return del(this, url, row, options)
//     },
//     tableActionUpdate(url, row, options = {}) {
//       return update(this, url, row, options)
//     },
//     tableActionRefresh(url) {
//       return refresh(this, url)
//     },
//     tableActionNotice(url, options = {}) {
//       return notice(this, url, options)
//     },
//     tableActionWithLoading(confirmOptions) {
//       let {msgboxOpts, action, url, row, options} = confirmOptions
//       let {instance, done} = msgboxOpts
//       if (msgboxOpts && msgboxOpts.action === 'cancel') {
//         done()
//         return
//       }
//       action = action.charAt(0).toUpperCase() + action.slice(1)
//       instance.confirmButtonLoading = true
//       instance.confirmButtonText = '执行中...'
//       let tableAction = this[`tableAction${action}`]
//       let args = [url]
//       if (action === 'Del' || action === 'Update') {
//         args.push(row)
//       }

//       if (options && options.resultMessage && action !== 'Refresh') {
//         args.push(options)
//       }
//       tableAction.apply(this, args).then(_ => {
//         done()
//         setTimeout(() => {
//           instance.confirmButtonLoading = false
//         }, 300)
//       }).catch(_ => {
//         done()
//         setTimeout(() => {
//           instance.confirmButtonLoading = false
//         }, 300)
//       })
//     }
//   }
// }
