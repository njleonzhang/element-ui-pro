let hoc = Component => {
  return {
    name: 'CommonDialogHOC',
    props: {
      visible: Boolean
    },
    computed: {
      modelShow() {
        return this.visible
      }
    },
    methods: {
      cancel() {
        this.notifyClose()
      },
      handleDialogClose() { // 处理点击dialog头上得叉叉关闭的场景
        this.notifyClose()
      },
      handleConfirmClick() {
        this.$refs.component.eventBus.$emit('submit')
      },
      notifyClose() {
        this.$emit('update:visible', false)
      }
    },
    render() {
      let { title, loading, dialogProps, ...attrs } = this.$attrs
      let { ...listeners } = this.$listeners
      title = title || this.title

      return (
        <el-dialog
          title={ title }
          visible={ this.modelShow }
          onClose={ this.handleDialogClose }
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
