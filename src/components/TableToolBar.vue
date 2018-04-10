<script>
  import { merge } from 'lodash'
  export default {
    props: {
      value: {
        type: Array
      },
      actionOptions: {
        type: Object
      },
      filterOptions: {
        type: Object
      },
      customOptions: {
        type: Object
      },
      layout: {
        type: String,
        default: 'action, radio, select, checkbox, search'
      },
    },
    data() {
      return {
      }
    },
    provide() {
      return {
        rootToolBar: this
      }
    },
    computed: {
      curRadioVal: {
        get() {
          return this.getVal('radio', this.innerFilterOptions.radioOptions.all)
        },
        set(val) {
          this.setVal('radio', val)
        }
      },
      curSelectVal: {
        get() {
          return this.getVal('select')
        },
        set(val) {
          this.setVal('select', val)
        }
      },
      curSearchVal: {
        get() {
          return this.getVal('search')
        },
        set(val) {
          this.setVal('search', val)
        }
      },
      curCheckboxVal: {
        get() {
          let options = this.innerFilterOptions.checkboxOptions
          let defaultVals =
            options.items
            .filter(item => item.value)
            .map(item => item.prop)
          return this.getVal('checkbox', defaultVals)
        },
        set(val) {
          this.setVal('checkbox', val)
        }
      },
      innerActionOptions() {
        return merge({}, {
          colProps: {
            span: 24
          },
          items: []
        }, this.actionOptions)
      },
      innerFilterOptions() {
        return merge({},
          {
            props: {
              radio: 'radio',
              select: 'select',
              checkbox: 'checkbox',
              search: 'search',
              custom: 'custom',
            },
            radioOptions: {
              colProps: {
                span: 10
              },
              all: null,
              items: []
            },
            selectOptions: {
              colProps: {
                span: 4
              },
              items: [],
              props: {
                clearable: true
              }
            },
            checkboxOptions: {
              colProps: {
                span: 3,
                offset: 1
              },
              items: []
            },
            searchOptions: {
              colProps: {
                span: 6
              },
              items: []
            }
          },
          this.filterOptions
        )
      },
      innerCustomOptions() {
        return merge({}, {
          colProps: {
            span: 24
          },
          filter: {
            prop: 'custom',
            data: {}
          }
        }, this.customOptions)
      },
      filterProps() {
        const layout = this.layout || ''
        if (!layout) {
          return []
        }

        return this.layout.split(',')
          .map((item) => item.trim())
          .filter(item => item !== 'action')
      }
    },
    render(h) {
      let toolBarRow = []

      const layout = this.layout || ''
      if (!layout) {
        toolBarRow = null
      } else {
        const TEMPLATE_MAP = {
          action: <btn-action></btn-action>,
          radio: <radio-filter></radio-filter>,
          select: <select-filter></select-filter>,
          checkbox: <checkbox-filter></checkbox-filter>,
          search: <search-filter></search-filter>
        }

        const customTools = this.$slots['custom-tools']
        if (customTools) {
          TEMPLATE_MAP['custom'] = (
            <el-col {...{props: this.innerCustomOptions.colProps}}>
              { customTools }
            </el-col>
          )
        }

        layout
        .split(',')
        .map((item) => item.trim())
        .forEach(compo => {
          toolBarRow.push(TEMPLATE_MAP[compo])
        })
      }

      return (
        <el-row class="table-tool-bar" gutter={20}>
          {toolBarRow}
        </el-row>
      )
    },
    components: {
      BtnAction: {
        inject: ['rootToolBar'],
        render(h) {
          let { colProps, items } = this.rootToolBar.innerActionOptions
          return (
            <el-col
              class="table-action-wrapper"
              {...{props: colProps}}
            >
              {
                items.map((action, index) => {
                  return (
                    <el-button type="primary"
                      key={index}
                      onClick={() => action.handler()}>
                      {action.name}
                    </el-button>
                  )
                })
              }
            </el-col>
          )
        }
      },
      RadioFilter: {
        inject: ['rootToolBar'],
        render(h) {
          let { props, colProps, items, all } = this.rootToolBar.innerFilterOptions.radioOptions
          return (
            <el-col class="radio-filter-wrapper" {...{props: colProps}}>
              <el-radio-group
                v-model={this.rootToolBar.curRadioVal}
                class="radio-filter"
                {...{props}}
              >
                <el-radio-button key="all" label={ all }>
                  {'全部'}
                </el-radio-button>
                {
                  items.map((item, index) => {
                    return (
                      <el-radio-button
                        key={item.value}
                        label={item.value}
                      >
                        {item.label}
                      </el-radio-button>
                    )
                  })
                }
              </el-radio-group>
            </el-col>
          )
        }
      },
      SelectFilter: {
        inject: ['rootToolBar'],
        render(h) {
          let { props, colProps, items } = this.rootToolBar.innerFilterOptions.selectOptions
          return (
            <el-col class="select-filter-wrapper" {...{props: colProps}}>
              <el-select
                v-model={this.rootToolBar.curSelectVal}
                class="select-filter"
                {...{props}}
              >
                {
                  items.map((item, index) => {
                    return (
                      <el-option
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      >
                      </el-option>
                    )
                  })
                }
              </el-select>
            </el-col>
          )
        }
      },
      CheckboxFilter: {
        inject: ['rootToolBar'],
        render(h) {
          let { props, colProps, items } = this.rootToolBar.innerFilterOptions.checkboxOptions
          return (
            items.length > 0
            ? (
                <el-col class="checkbox-filter-wrapper" {...{props: colProps}}>
                  <el-checkbox-group
                    v-model={this.rootToolBar.curCheckboxVal}
                  >
                    {
                      items.map((item, index) => {
                        return (
                          <el-checkbox
                            class="checkbox-filter"
                            key={index}
                            label={item.prop}
                            {...{props}}
                          >
                            {item.label}
                          </el-checkbox>
                        )
                      })
                    }
                  </el-checkbox-group>
                </el-col>
              )
            : null
          )
        }
      },
      SearchFilter: {
        inject: ['rootToolBar'],
        render(h) {
          let { props, colProps } = this.rootToolBar.innerFilterOptions.searchOptions
          return (
            <el-col class="search-filter-wrapper" {...{props: colProps}}>
              <el-input
                class="search-filter"
                v-model={this.rootToolBar.curSearchVal}
                suffix-icon="el-icon-search"
                {...{props}}
              >
              </el-input>
            </el-col>
          )
        }
      }
    },
    methods: {
      getVal(prop, defaultVal = '') {
        let type = this.innerFilterOptions.props[prop]
        let data = this.value.filter(v => {
          return v.type === type
        })
        return (data[0] && data[0].vals && data[0].vals.length > 0)
        ? data[0].vals[0]
        : defaultVal
      },
      setVal(prop, val) {
        let type = this.innerFilterOptions.props[prop]
        let data = {}
        data[type] = val

        this.emitFilter(data)
      },
      emitFilter(args) {
        const FILTER_MAP = {
          radio: this.curRadioVal,
          select: this.curSelectVal,
          checkbox: this.curCheckboxVal,
          search: this.curSearchVal
        }
        let emitData = {}

        this.filterProps.forEach(prop => {
          if (prop === 'custom') {
            let { prop, data } = this.customOptions.filter
            emitData[prop] = data
          } else {
            emitData[this.innerFilterOptions.props[prop]] = FILTER_MAP[prop]
          }
        })

        emitData = {
          ...emitData,
          ...args
        }

        this.$emit('doFilter', emitData)
        this.$emit('input', this.customFilterData(emitData))
      },
      customFilterData(data) {
        let ret = []
        for (const key of Object.keys(data)) {
          let val = data[key] === '' ? null : data[key]
          ret.push({
            type: key,
            vals: [val]
          })
        }
        return ret
      }
    }
  }
</script>

<style lang='scss'>
  .table-tool-bar{
    overflow: hidden;
    & > .el-col {
      margin-bottom: 10px;
    }
    .checkbox-filter-wrapper {
      padding-top: 10px;
    }
  }
</style>
