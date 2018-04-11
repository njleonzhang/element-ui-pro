import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from '@/components/App'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueProgressBar from 'vue-progressbar'
import '@/assets/styles/main.scss'
import '@/assets/iconfont/iconfont.css'
import DataTables from 'vue-data-tables'

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

Vue.component('chart', ECharts)
sync(store, router)

Vue.use(ElementUI)
Vue.use(VueProgressBar, {
  color: '#13ce66'
})
Vue.use(DataTables)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  data() {
    return {
      init: false
    }
  }
})
