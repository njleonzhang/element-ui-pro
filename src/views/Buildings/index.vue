<style lang='scss'>
</style>

<template lang='pug'>
  .buildings
    data-tables-server(
      :data='data',
      :total='total'
      :action-col='actionCol'
      @query-change='dataUpdate'
    )
      el-table-column(prop='name', label='name')
</template>

<script>
  import { Building } from '@/api'

  export default {
    data() {
      return {
        data: [],
        total: 0,
        actionCol: {
          props: {
            label: 'actions',
          },
          buttons: [
            {
              handler: row => {
                this.$message(`I am building ${row.name}`)
              },
              label: 'print'
            }
          ]
        }
      }
    },
    async beforeRouteEnter(to, from, next) {
      let { total, items } = await Building.retrieve({
        pageSize: 20,
        page: 1
      })

      next(vm => {
        vm.data = items
        vm.total = total
      })
    },
    methods: {
      async dataUpdate(queryInfo) {
        let { total, items } = await Building.retrieve(queryInfo)

        this.data = items
        this.total = total
      }
    }
  }
</script>
