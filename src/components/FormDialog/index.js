import CommonDialogHOC from '@/components/CommonDialogHoc'
import FormInDialogHOC from './FormInDialogHOC'

export default (
  {
    confirm = () => {},
    titleSuffix = ''
  } = {},
  mixin = {}
) => {
  return (Component) => {
    let HOC = CommonDialogHOC(FormInDialogHOC(Component))

    return {
      props: {
        adding: Boolean,
      },
      data() {
        return {
          loading: false
        }
      },
      methods: {
        confirm(data) {
          confirm.call(this, data)
        },
        closeDialog() {
          this.$emit('update:visible', false)
        }
      },

      mixins: [
        mixin
      ],

      render() {
        let { title, ...attrs } = this.$attrs
        title = this.adding ? `添加${titleSuffix}` : `编辑${titleSuffix}`

        return (
          <HOC { ...{attrs: attrs} }
            { ...{on: {...this.$listeners, confirm: this.confirm}} }
            adding={ this.adding }
            title={ title }
            loading={ this.loading }/>
        )
      }
    }
  }
}
