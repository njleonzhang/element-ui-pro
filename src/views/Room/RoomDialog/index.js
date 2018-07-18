import RoomForm from './RoomForm'
import { createFormDialog } from 'el-form-dialog'

export default createFormDialog({
  stateOneTitle: 'new room',
  stateTwoTitle: 'edit room'
})(RoomForm)
