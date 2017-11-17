import CommonDialog from '@/components/CommonDialog'
import DialogVModelMixin from '@/mixins/DialogVModel'
import TableActionsMixin from '@/mixins/TableActions'

export default {
  mixins: [
    DialogVModelMixin,
    TableActionsMixin
  ],

  components: {
    CommonDialog
  },
  props: {
    data: Object,
    row: Object,
    isNew: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isDialog: true,
      title: '',
      loading: false,
      defaultInnerData: {}
    }
  },

  watch: {
    data(val) {
      this.innerData = this.data
    },
    modelShow(val) {
      if (!val) {
        this.reset()
      }
    }
  },

  created() {
    this.defaultInnerData = Object.assign({}, this.innerData)
  },

  methods: {
    reset() {
      this.innerData = Object.assign({}, this.defaultInnerData)
      this.$refs.form && this.$refs.form.resetFields()
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
            return false
          }
        })
      })
    }
  }
}
