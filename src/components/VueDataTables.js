import {DataTables as oDataTables, DataTablesServer as oDataTablesServer} from 'vue-data-tables'
import Vue from 'vue'
import { merge, isPlainObject } from 'lodash'

let defaults = {
  'table-props': {
    stripe: false,
    border: false
  },
  'action-col-def': {
    tableColProps: {
      align: 'center'
    }
  },
  'show-action-bar': false
}

let dataTablesHoc = Component => {
  return {
    name: `${Component.name}Hoc`,
    methods: {
      mergeAttr(attrs, prop, defaultOption) {
        if (attrs[prop] !== this[`_pre${prop}`]) {
          // prop发生了变化
          if (isPlainObject(attrs[prop])) {
            attrs[prop] = merge({}, defaultOption, this.$attrs[prop])
          }
        } else if (attrs[prop] === undefined && this[`_pre${prop}`] === undefined) {
          // 没有provide值的时候，使用默认值
          attrs[prop] = defaults[prop]
        }
      }
    },

    render() {
      let attrs = {
        attrs: this.$attrs
      }

      Object.keys(defaults).map(key => {
        this.mergeAttr(this.$attrs, key, defaults[key])
      })

      return (
        <Component {...attrs} {...{on: this.$listeners}}>
          <template slot='custom-tool-bar'>
            { this.$slots['custom-tool-bar'] }
          </template>
          { this.$slots.default }
        </Component>
      )
    }
  }
}

Vue.component('DataTables', dataTablesHoc(oDataTables))
Vue.component('DataTablesServer', dataTablesHoc(oDataTablesServer))
