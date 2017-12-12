import Vue from 'vue'
import { cloneDeep } from 'lodash'

export default FormComponent => {
  return {
    name: 'FormInDialogHOC',
    props: {
      adding: Boolean,
      data: Object,
      dialogVisible: Boolean
    },
    computed: {
      innerData() {
        return this.adding ? {} : this.data
      },
      formComponent() {
        return this.$refs.formComponent
      },
      form() {
        return this.formComponent.$refs.form
      }
    },
    data() {
      return {
        eventBus: new Vue()
      }
    },
    created() {
      this.eventBus.$on('submit', () => {
        this.$emit('confirm', this.formComponent.innerData)
      })
    },
    mounted() {
      this.formComponent.$watch(
        () => {
          return this.formComponent.data
        },
        (val) => {
          this.formComponent.innerData = cloneDeep(val)
        },
        {
          immediate: true
        }
      )
    },
    watch: {
      dialogVisible(val) {
        if (!val) {
          if (this.form) {
            this.$nextTick(() => {
              this.formComponent.innerData = cloneDeep(this.formComponent.data)
              this.form.clearValidate()
            })
          } else {
            console.error('form component must has a Form with ref form')
          }
        }
      }
    },
    methods: {
      async submit() {
        let validated = await this.validate()

        if (validated) {
          return this.form.innerData
        } else {
          return null
        }
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
          data={ this.innerData }
          adding={ this.adding }
          { ...{attrs: this.$attrs} }
          { ...{on: this.$listeners} }/>
      )
    }
  }
}
