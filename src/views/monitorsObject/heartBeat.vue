<template>
  <div class="app-container">
    <div class="app-top">
      <el-button type="primary">批量操作</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addNewObj">新增监控对象</el-button>
    </div>
    <div class="app-mian">
      <div class="app-search">
        <div class="demo-input-suffix">
          <span>目标服务器名：</span>
          <el-input
            v-model="listQuery.serverName"
            placeholder="请输入内容"
            style="width: 240px;min-width: 240px;"
          />
        </div>
        <div class="demo-input-suffix">
          <span>目标服务器IP：</span>
          <el-input
            v-model="listQuery.serverIp"
            placeholder="请输入内容"
            style="width: 240px;min-width: 240px;"
          />
        </div>
        <div class="demo-input-suffix">
          <span>采集周期：</span>
          <el-input
            v-model="listQuery.timeCycle"
            placeholder="请输入内容"
            style="width: 240px;min-width: 240px;"
          />
        </div>
        <div class="demo-input-suffix">
          <span>启用状态：</span>
          <el-select v-model="listQuery.enableState" placeholder="请选择" style="width: 240px;min-width: 240px;">
            <el-option
              v-for="item in enableStateList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="demo-input-suffix">
          <span>是否发送短信：</span>
          <el-select v-model="listQuery.messageState" placeholder="请选择" style="width: 240px;min-width: 240px;">
            <el-option
              v-for="item in messageStateList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="demo-input-suffix">
          <span>短信接收人：</span>
          <el-input
            v-model="listQuery.messageName"
            placeholder="请输入内容"
            style="width: 240px;min-width: 240px;"
          />
        </div>
      </div>
      <div class="mybtn">
        <el-button type="primary" round style="width: 106px;height: 36px;line-height: 36px;padding: 0;" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="myTable">
      <el-table
        :data="list"
        :header-cell-style="{background:'rgb(221, 238, 196)',color:'#333333',fontSize:'14px',fontWeight:'500'}"
        :row-style="{color:'#333333',fontSize:'14px',fontWeight:'400'}"
        style="width: 100%"
      >
        <el-table-column type="selection" width="60px" fixed="left" />
        <el-table-column prop="numberId" label="序号" width="80px" />
        <el-table-column prop="watchType" label="监控类型" width="160px" />
        <el-table-column prop="serverIp" label="目标服务IP" width="180px" />
        <el-table-column prop="serverName" label="目标服务器名" width="180px" />
        <el-table-column prop="timeCycle" label="采集周期" width="180px" />
        <el-table-column label="告警短信接收人" width="180px">
          <template slot-scope="scope">
            <div>
              <span class="span1">{{ scope.row.waringPeople }}</span>
              <span class="span2">{{ scope.row.waringPeopleName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="启用状态" width="180px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isDisable" active-text="启用" inactive-text="禁用" active-color="#13ce66" />
          </template>
        </el-table-column>
        <el-table-column label="发送短信" width="180px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isSendMessage" active-text="发送" inactive-text="停发" active-color="#13ce66" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="editInfo(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="delInfo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        p: 1,
        s: 50,
        serverName: undefined,
        serverIp: undefined,
        timeCycle: undefined,
        messageName: undefined,
        enableState: '2',
        messageState: '2'
      },
      enableStateList: [{
        id: '0',
        label: '禁用'
      }, {
        id: '1',
        label: '启用'
      }, {
        id: '2',
        label: '全部'
      }],
      messageStateList: [{
        id: '0',
        label: '停发'
      }, {
        id: '1',
        label: '发送'
      }, {
        id: '2',
        label: '全部'
      }],
      list: [{
        numberId: '1',
        watchType: '设备心跳监控',
        serverIp: '192.168.1.6',
        serverName: '批次调度服务器1',
        timeCycle: '五分钟',
        waringPeople: '全组员',
        waringPeopleName: '刘欢',
        isDisable: true,
        isSendMessage: true
      }, {
        numberId: '2',
        watchType: '设备心跳监控1',
        serverIp: '192.168.1.6',
        serverName: '批次调度服务器2',
        timeCycle: '五分钟',
        waringPeople: '全组员',
        waringPeopleName: '刘欢',
        isDisable: false,
        isSendMessage: true
      }]
    }
  },
  created() {},
  methods: {
    search() {
    },
    editInfo(row) {
      this.$router.push({ name: 'newHeartBeat', params: row })
    },
    delInfo(row) {},
    addNewObj() {
      this.$router.push({ name: 'newHeartBeat', params: '' })
    }
  }
}
</script>
<style scoped>
</style>
