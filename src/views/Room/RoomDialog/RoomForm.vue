<template>
  <el-form class='room-form' :model='data' :rules='rules' label-width='100px' ref='form'>
    <el-form-item label='name' prop='name'>
      <el-input v-model='data.name'></el-input>
    </el-form-item>
    <el-form-item label='building' prop='building'>
      <el-input v-model='data.building'></el-input>
    </el-form-item>
    <el-form-item label='floor' prop='floor'>
      <el-input v-model='data.floor'></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        data: {},
        defaultData: {
          name: '',
          building: '',
          floor: ''
        },
        rules: {
          name: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          building: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          floor: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
        }
      }
    }
  }
</script>
