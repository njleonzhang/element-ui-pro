<style scoped lang="scss">
  .room-selector {
    overflow: hidden;
  }
</style>

<style lang="scss">
  .room-selector {
    .el-loading-spinner {
      margin-top: -10px;
    }
    .el-select {
      width: 100%;
    }
  }
</style>

<template lang="pug">
  el-row(class="room-selector" :gutter="20")
    el-col(:span="6")
      el-select(v-model='buildingGroupSelected',
        v-if='buildingGroupExist',
        clearable, placeholder='分区')
        el-option(v-for='item in buildingGroupOps', :key='item.id', :label='item.name', :value='item.id')
    el-col(:span="6")
      el-select(v-model='buildingSelected',
        clearable,
        placeholder='楼栋')
        el-option(v-for='item in buildingOps', :key='item.id', :label='item.name', :value='item.id')
    el-col(:span="6" v-if='type !== "floor"')
      el-select(v-model='unitSelected', clearable,
        placeholder='单元')
        el-option(v-for='item in unitOps', :key='item.id', :label='item.name', :value='item.id')
    el-col(:span="6" v-if='type === "floor" || type === "floorAndUnit"')
      el-select(v-model='floorSelected', clearable,
        placeholder='楼层')
        el-option(v-for='item in floorOps', :key='item.id', :label='item.name', :value='item.id')
    el-col(:span="6" v-if='type === "room"')
      el-select(v-model='roomSelected', clearable, placeholder='房屋',
        element-loading-spinner="el-icon-loading", v-loading='loadingRooms')
        el-option(v-for='item in roomOps', :key='item.id', :label='item.name', :value='item.id')
</template>

<script>
  import api from '@/api'

  export default {
    props: {
      value: {
        type: Object
      },
      type: {
        type: String,
        default: 'room'
      },
      data: {
        type: Object,
        default() {
          return {
            room_id: '',
            building_id: '',
            unit: '',
            floor: ''
          }
        }
      }
    },

    data() {
      return {
        input: {
          buildingGroup: '',
          building: '',
          unit: '',
          floor: '',
          roomSelected: ''
        },
        current: {
          buildingGroup: '',
          building: '',
          unit: '',
          floor: '',
          room: ''
        },
        buildingGroupExist: true,
        buildingGroupOps: [],
        roomOps: [],
        loadingRooms: false
      }
    },

    async created() {
      // 初始化buildingGroupOps或者buildingOps
      // console.log(this.data)
      await this.getBuildings()
      if (this.data.building_id || this.data.room_id) {
        await this.initWithValue()
      }
    },

    computed: {
      result() {
        return {
          buildingGroup_id: this.buildingGroupSelected,
          building_id: this.buildingSelected,
          unit: this.unitInfoMap && this.unitSelected && this.unitInfoMap[this.unitSelected] && this.unitInfoMap[this.unitSelected].code,
          floor: this.floorInfoMap && this.floorSelected && this.floorInfoMap[this.floorSelected] && this.floorInfoMap[this.floorSelected].code,
          room_id: this.roomSelected
        }
      },

      buildingOpsMap() {
        let tmpMap = {}
        // console.log('buildingOpsMap', this.buildingGroupOps)
        this.buildingGroupOps.forEach(el => {
          tmpMap[el.id] = el.buildings
        })

        return tmpMap
      },

      // 楼栋选项完全是由分区选项决定的
      buildingOps() {
        return this.buildingOpsMap[this.buildingGroupSelected]
      },

      buildingInfoMap() {
        let tmpMap = {}
        // console.log('buildingInfoMap', this.buildingOps)
        this.buildingOps && this.buildingOps.forEach(el => {
          tmpMap[el.id] = el
        })

        return tmpMap
      },

      unitOps() {
        let unitOps = []
        if (this.buildingInfoMap && this.buildingSelected) {
          let buildingInfo = this.buildingInfoMap[this.buildingSelected]
          for (var i = 0; i < Number.parseInt(buildingInfo.unit_count); i++) {
            let unit = i + 1
            unitOps.push({code: `${unit}`, id: `${buildingInfo.id}_${unit}`, name: `第${unit}单元`})
          }
        }
        return unitOps
      },

      unitInfoMap() {
        let tmpMap = {}
        // console.log('unitInfoMap', this.unitOps)
        this.unitOps && this.unitOps.forEach(el => {
          tmpMap[el.id] = el
        })

        return tmpMap
      },

      floorOps() {
        let floorOps = []

        if (this.buildingInfoMap && this.buildingSelected) {
          let buildingInfo = this.buildingInfoMap[this.buildingSelected]
          for (var i = 0; i < Number.parseInt(buildingInfo.floor_count); i++) {
            let floor = i + 1
            floorOps.push({code: `${floor}`, id: `${buildingInfo.id}_${floor}`, name: `第${floor}层`})
          }
        }

        return floorOps
      },

      floorInfoMap() {
        let tmpMap = {}
        // console.log('floorInfoMap', this.floorOps)
        this.floorOps && this.floorOps.forEach(el => {
          tmpMap[el.id] = el
        })

        return tmpMap
      },

      roomInfoMap() {
        let tmpMap = {}
        // console.log('roomInfoMap', this.roomOps)
        this.roomOps && this.roomOps.forEach(el => {
          tmpMap[el.id] = el
        })

        return tmpMap
      },

      buildingGroupSelected: {
        get() {
          return this.current.buildingGroup || this.input.buildingGroup
        },
        set(val) {
          this.current.buildingGroup = val
        }
      },

      buildingSelected: {
        get() {
          let building = this.buildingInfoMap[this.current.building || this.input.building]
          return building && building.id
        },
        set(val) {
          // console.log('buildingSelected', this.current.building)
          this.current.building = val
        }
      },

      unitSelected: {
        get() {
          console.log(this.unitInfoMap, this.current.unit, this.input.unit)
          let unit = this.unitInfoMap[this.current.unit || this.input.unit]
          return unit && unit.id
        },
        set(val) {
          // console.log('unitSelected', this.current.unit)
          this.current.unit = val
        }
      },

      floorSelected: {
        get() {
          let floor = this.floorInfoMap[this.current.floor || this.input.floor]
          return floor && floor.id
        },
        set(val) {
          // console.log('floorSelected', this.current.floor)
          this.current.floor = val
        }
      },

      roomSelected: {
        get() {
          let room = this.roomInfoMap[this.current.room || this.input.room]
          return room && room.id
        },

        set(val) {
          this.current.room = val
        }
      }
    },

    watch: {
      data(val) {
        this.initWithValue()
      },
      buildingGroupSelected() {
        this.buildingSelected = ''
        this.unitSelected = ''
        this.floorSelected = ''
        this.roomSelected = ''
      },
      buildingSelected() {
        this.unitSelected = ''
        this.floorSelected = ''
        this.roomSelected = ''
      },
      unitSelected(val) {
        this.roomSelected = ''
        this.floorSelected = ''
        this.getRooms()
      },
      floorSelected() {
        this.roomSelected = ''
      },
      input() {
        // console.log('input change')
        this.current = {
          buildingGroup: '',
          building: '',
          unit: '',
          floor: '',
          room: ''
        }
      },
      result(val) {
        // console.log('change', val)
        this.$emit('change', val)
        this.$emit('input', val)
      }
    },

    methods: {
      async getBuildings() {
        let data = await api.RoomSelector.getBuildings()
        if (data.building_group) {
          this.buildingGroupOps = data.data
        } else {
          this.buildingOps = data.data
          this.buildingGroupExist = false
        }
      },

      async getRooms() {
        if (this.unitSelected) {
          let unit = this.unitInfoMap[this.unitSelected].code
          try {
            this.loadingRooms = true
            let data = await api.RoomSelector.getRooms(this.buildingSelected, unit)
            this.roomOps = data
          } catch (e) {
            this.roomOps = []
          }
          this.loadingRooms = false
        } else {
          this.roomOps = []
        }
      },

      async initWithValue() {
        // 外部数据变化时调用
        if (this.type === 'room') {
          let data = await api.RoomSelector.getRoomInfo(this.data.room_id)
          this.input = {
            buildingGroup: data.building_group_id,
            building: data.building_id,
            unit: `${data.building_id}_${data.unit}`,
            room: data.room_id
          }
        } else {
          let data = await api.RoomSelector.getBuildingInfo(this.data.building_id)
          this.input = {
            buildingGroup: data.building_group_id,
            building: data.building_id,
            unit: `${data.building_id}_${this.data.unit}`,
            floor: `${data.building_id}_${this.data.floor}`
          }
        }
      },

      reset() {
        this.input.buildingGroup = ''
        this.current.buildingGroup = ''
      }
    }
  }

</script>
