import Vue from 'vue'
import { cloneDeep } from 'lodash'

/* commonDialogHoc -> FormInDialogHoc(this) -> Form
  处理dialog中form的通用逻辑
  1. dialog确定按钮被点击时, 触发form的validate对表格数据格式进行验证, 验证成功后向父组件发送form里的数据
  2. dialog关闭的时候，并清空form里validate的值
*/

export default FormComponent => {
  return {
    name: 'FormInDialogHOC',
    props: {
      adding: Boolean,
      data: Object,
      dialogVisible: Boolean
    },
    computed: {
      formComponent() {
        return this.$refs.formComponent
      },
      form() {
        return this.formComponent.$refs.form
      }
    },
    data() {
      return {
        eventBus: new Vue(),
        innerData: {}
      }
    },
    mounted() {
      // 接受来自父组件（commonDialogHoc）的summit事件
      this.eventBus.$on('submit', async () => {
        if (await this.isFormValid()) {
          this.$emit('confirm',
            (this.formComponent.getData && this.formComponent.getData()) || this.formComponent.data)
        }
      })
    },
    watch: {
      dialogVisible: {
        handler(val) {
          this.$nextTick(() => {
            if (val) {
              // dialog打开的时候对form进行初始化，如果是新建逻辑，则用formComponent的defaultData字段去初始化form；
              // 否则使用传入的data字段进行初始化(这里暴力地直接去修改了子组件的数据)
              this.formComponent.data = cloneDeep(
                this.adding
                  ? this.formComponent.defaultData
                  : this.data
              )
            } else {
              // dialog关闭的时候把form的validate清除
              this.form.clearValidate()
            }
          })
        },
        immediate: true
      }
    },
    methods: {
      async isFormValid() {
        let valid = await this.validate()
        return valid
      },

      validate() {
        return new Promise((resolve) => {
          this.form.validate(valid => {
            if (valid) {
              resolve(true)
            } else {
              resolve(false)
            }
          })
        })
      }
    },
    render() {
      return (
        <FormComponent ref='formComponent'
          adding={ this.adding }
          { ...{attrs: this.$attrs} }
          { ...{on: this.$listeners} }/>
      )
    }
  }
}
