// import ScTable from 'vue-data-tables'
import TableActionsMixin from 'mixins/TableActions'

export default {
  components: {
    // ScTable
  },

  mixins: [
    TableActionsMixin
  ],

  data() {
    return {
      tableData: [],
      currentRow: {},
      rowActionsDef: this.getRowActionsDef(),
      toolBarDef: this.getToolBarDef(),

      newOrEditDialogShow: false,
      newOrEditDialogTitle: '',
      newOrEditData: {},
      newModel: true,

      detailShow: false,

      isMainTable: true
    }
  },

  methods: {
    showDetail(row) {
      this.currentRow = row
      this.detailShow = true
    }
  }
}
