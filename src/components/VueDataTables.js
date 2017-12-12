import {DataTables as oDataTables, DataTablesServer as oDataTablesServer} from 'vue-data-tables'
import Vue from 'vue'
import { merge } from 'lodash'

let dataTablesHoc = Component => {
  return {
    name: `${Component.name}Hoc`,

    render() {
      let attrs = {
        attrs: merge({
          'table-props': {
            stripe: false,
            border: false
          },
          'action-col-def': {
            tableColProps: {
              align: 'center'
            }
          }
        }, this.$attrs)
      }

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
