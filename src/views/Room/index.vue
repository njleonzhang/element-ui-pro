<style lang='scss'>
  .tool-bar {
    margin-bottom: 20px;
  }
</style>

<template>
  <div class='room'>
    <el-row class='tool-bar'>
      <el-col :span="18">
        <el-button @click="createNewRoom">create 1 row</el-button>
        <el-button @click="bulkDelete">bulk delete</el-button>
      </el-col>

      <el-col :span="6">
        <el-input placeholder="search NO." v-model="filters[0].value"></el-input>
      </el-col>
    </el-row>

    <data-tables
      :data="data"
      :action-col="actionCol"
      :filters="filters"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column v-for="title in titles"
        :prop="title.prop"
        :label="title.label"
        :key="title.prop"
        sortable="custom">
      </el-table-column>
    </data-tables>

    <room-dialog
      :in-state-one='adding'
      :visible.sync='RoomDialogVisible'
      :loading.sync='confirming'
      :data='roomData'
      @confirm='confirmEditRoom'
      >
    </room-dialog>
  </div>
</template>

<script>
  import { Room } from '@/api'
  import RoomDialog from './RoomDialog'

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }

  export default {
    components: {
      RoomDialog
    },
    data() {
      return {
        data: [],
        titles: [
          {
            prop: 'name',
            label: 'room'
          },
          {
            prop: 'building',
            label: 'building'
          },
          {
            prop: 'floor',
            label: 'floor'
          }
        ],
        filters: [{
          prop: 'name',
          value: ''
        }],
        actionCol: {
          props: {
            label: 'actions',
          },
          buttons: [{
            props: {
              type: 'primary'
            },
            handler: row => {
              this.roomData = row
              this.adding = false
              this.RoomDialogVisible = true
            },
            label: 'Edit'
          }, {
            handler: row => {
              this.data.splice(this.data.indexOf(row), 1)
              this.$message('delete success')
            },
            label: 'delete'
          }]
        },
        selectedRow: [],
        adding: false,
        RoomDialogVisible: false,
        confirming: false,
        roomData: {},
      }
    },
    async beforeRouteEnter(to, from, next) {
      let data = await Room.all()
      next(vm => {
        vm.data = data
      })
    },
    methods: {
      createNewRoom() {
        this.adding = true
        this.RoomDialogVisible = true
      },
      handleSelectionChange(val) {
        this.selectedRow = val
      },
      bulkDelete() {
        if (this.selectedRow.length === 0) {
          this.$message('please select room')
          return
        }
        this.selectedRow.map(row => {
          this.data.splice(this.data.indexOf(row), 1)
        })
        this.$message('bulk delete success')
      },
      confirmEditRoom(data) {
        if (this.adding) {
          // should have http request here.
          this.data.unshift({
            ...data,
            id: guid()
          })
          this.$message('new success')
        } else {
          Object.assign(this.roomData, data)
          this.$message('edit success')
        }

        this.RoomDialogVisible = false
      }
    }
  }
</script>
