import HttpService from '@/services/Http'
// import moment from 'moment'

// export function initTable(next, url) {
//   HttpService.SCPrefixGet(url).then(data => {
//     next(vm => {
//       vm.tableData = data
//     })
//   })
// }

// export function initTableAndFilters(next, urls) {
//   let filtersDef
//   let tableData

//   let p1 = HttpService.SCPrefixGet(urls.filters).then(data => {
//     filtersDef = data
//   }, error => {
//     console.log(error)
//   })

//   let p2 = HttpService.SCPrefixGet(urls.tableData).then(data => {
//     tableData = data
//   })

//   Promise.all([p1, p2]).then(_ => {
//     next(vm => {
//       vm.toolBarDef.filters.def = filtersDef
//       vm.tableData = tableData
//     })
//   })
// }

// export function makeRetry(fn, options = {}) {
//   function innerMakeRetry({
//     retryTimes = 3,
//     retryPeriod = 1000
//   }) {
//     return function() {
//       let count = 0
//       var context = this
//       var args = arguments

//       let doRetryCall
//       let promise = new Promise((resolve, reject) => {
//         doRetryCall = function() {
//           fn.apply(context, args).then((value) => {
//             resolve(value)
//           }, error => {
//             if (count++ < retryTimes) {
//               console.log(`will retry ${fn} in ${retryPeriod} second`, error)
//               window.setTimeout(() => {
//                 doRetryCall()
//               }, retryPeriod)
//             } else {
//               reject()
//             }
//           })
//         }
//       })

//       doRetryCall()
//       return promise
//     }
//   }

//   return innerMakeRetry(options)
// }

// export function strToDate(str) {
//   if (isNaN(Date.parse(str)) === false) {
//     return new Date(str)
//   } else {
//     return ''
//   }
// }

// export function dateToDateTimeStr(date) {
//   let str = moment(date).format('YYYY-MM-DD HH:mm')
//   return str === 'Invalid date' ? '' : str
// }

// export function dateToDateStr(date) {
//   let str = moment(date).format('YYYY-MM-DD')
//   return str === 'Invalid date' ? '' : str
// }
