let hoc = Component => {
  return {
    name: 'CommonDialogHOC',
    props: {
      visible: Boolean
    },
    computed: {
      modelShow: {
        get() {
          return this.visible
        },
        set(val) {
          this.syncVisible(val)
        }
      }
    },
    methods: {
      cancel() {
        this.modelShow = false
      },
      handleConfirmClick() {
        this.$refs.component.eventBus.$emit('submit')
      },
      syncVisible(val) {
        this.$emit('update:visible', val)
      }
    },
    render() {
      let { title, loading, dialogProps, ...attrs } = this.$attrs
      let { ...listeners } = this.$listeners
      title = title || this.title

      return (
        <el-dialog
          title={ title }
          visible$sync={ this.modelShow }
          {...{props: dialogProps}}
        >
          <Component ref='component' dialog-visible={ this.modelShow } { ...{attrs} } { ...{on: listeners} } />
          <template slot='footer'>
            <el-button onClick={ this.cancel }>取消</el-button>
            <el-button type='primary' onClick={ this.handleConfirmClick } loading={loading}>确定</el-button>
          </template>
        </el-dialog>
      )
    }
  }
}

export default hoc
