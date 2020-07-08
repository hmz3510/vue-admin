<template>
  <div class="app-container">
    <div class="formCss">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="监控类别" prop="watchType">
          <el-select v-model="ruleForm.watchType" placeholder="设备心跳监控" style="min-width:240px">
            <el-option label="设备心跳监控" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="目标服务器名" prop="serverName">
          <el-input v-model="ruleForm.serverName" placeholder="请输入内容" style="min-width:240px;width:240px" />
        </el-form-item>
        <el-form-item label="目标服务器Ip" prop="serverIp">
          <el-input v-model="ruleForm.serverIp" placeholder="请输入内容" style="min-width:240px;width:240px" />
        </el-form-item>
        <el-form-item label="采集周期" prop="circleTime">
          <el-input-number v-model="ruleForm.circleTime" :disabled="true" style="min-width:190px;width:190px" />
          <span class="formTimer">分钟</span>
        </el-form-item>
        <el-form-item label="异常说明" prop="waringInfo">
          <el-input v-model="ruleForm.waringInfo" placeholder="请输入内容" style="min-width:240px;width:240px" />
        </el-form-item>
        <el-form-item label="告警短信接收人">
          <el-tag
            v-for="tag in waringTagsList"
            :key="tag.name"
            closable
            :type="tag.type"
            style="margin-right:10px"
            @close="handleClose(tag)"
          >
            {{ tag.name }}
          </el-tag>
          <el-button class="button-new-tag" size="small" type="info" plain @click="addTag">+ 添加</el-button>
        </el-form-item>
        <el-form-item style="margin-top:88px">
          <el-button type="primary" plain style="padding:15px 40px">测试</el-button>
          <el-button type="primary" style="padding:15px 40px" @click="upSubmit('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-dialog
        class="myDiaLog"
        title="添加短信接收人"
        :visible.sync="tagState"
        width="605px"
        height="365px"
      >
        <div class="checkAll">
          <el-checkbox v-for="item of allCheckBox" :key="item.name" size="mini" :checked="item.mychecked" :label="item.name" :disabled="item.mydisabled" @change="changeOne" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="tagState = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="tagState = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        watchType: '1',
        serverName: '',
        serverIp: '',
        circleTime: '5',
        waringInfo: ''
      },
      rules: {
        watchType: [
          { required: true, message: '请选择监控设备', trigger: 'change' }
        ],
        serverName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        serverIp: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        circleTime: [
          { required: true, message: '必填项不能为空' }
        ]
      },
      waringTagsList: [
        { name: '全员组', type: 'warning' },
        { name: '标签二' },
        { name: '标签三' },
        { name: '标签四' }
      ],
      tagState: false,
      allCheckBox: [{
        id: 1,
        name: '全员组',
        mychecked: true
      }, {
        id: 2,
        name: '标签二',
        mychecked: true
      }, {
        id: 3,
        name: '标签三',
        mychecked: true
      }, {
        id: 4,
        name: '标签四',
        mychecked: true
      }, {
        id: 5,
        name: '标签五'
      }, {
        id: 5,
        name: '标签五'
      }, {
        id: 5,
        name: '标签五'
      }, {
        id: 5,
        name: '标签五'
      }, {
        id: 5,
        name: '标签五'
      }, {
        id: 5,
        name: '标签五'
      }]
    }
  },
  created() {
    console.log(this.$route.params)
  },
  methods: {
    handleClose(tag) {
      this.waringTagsList.splice(this.waringTagsList.indexOf(tag), 1)
    },
    addTag() {
      this.tagState = true
    },
    upSubmit(formName) {
      console.log(this.waringTagsList)
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          alert('正在提交')
          // console.log(this.ruleForm)
        } else {
          return false
        }
      })
    },
    changeOne() {

    }
  }
}
</script>
<style scoped>
</style>
