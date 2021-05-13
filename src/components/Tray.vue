<template>
    <div>
      <el-row type="flex">
        <el-button type="primary" @click="listRunningTray">查询正在运输中的托盘</el-button>
        <el-button type="primary" @click="listWaitingTray">查询正在等待的托盘</el-button>
        <el-button type="primary" @click="listNoOrderTray">查询没有订单的托盘</el-button>
        <el-button type="primary" @click="refresh">刷新</el-button>
        <el-col :span="6"><div class="bar">等待运送的托盘数量：{{waitingTrayCount}}</div></el-col>
        <el-col :span="6"><div class="bar">正在运送的托盘数量：{{runningTrayCount}}</div></el-col>
        <el-col :span="6"><div class="bar">没有订单的托盘数量：{{noOrderTrayCount}}</div></el-col>
      </el-row>
        <el-table :data="trayList" stripe border >
          <el-table-column prop="trayId" label="托盘id" width="175">
          </el-table-column>
          <el-table-column  prop="nodeId" label="所在集配点" width="150">
          </el-table-column>
          <el-table-column  prop="trayType" label="托盘类型" width="150">
          </el-table-column>
          <el-table-column  prop="status" label="状态" width="150">
          </el-table-column>
          <el-table-column label="操作" width="500">
          <template slot-scope="scope">
          <el-button  @click="getDetail(scope.row)" 
            type="primary" size="medium">详细信息</el-button>
          </template>
        </el-table-column>
        </el-table>
        <!-- Detail order -->
    <div>
    <el-drawer
      title=托盘详细信息
      :visible.sync="drawer"
      size = "30%">
      <el-form ref="detailTray" :model="detailTray" label-width="120px" 
      label-position="middle" >
        <el-form-item label="托盘Id">
          <span>{{detailTray.trayId}}</span>
        </el-form-item>
        <el-form-item label="托盘类型">
          <span>{{detailTray.trayType}}</span>
        </el-form-item>
        <el-form-item label="所在位置" >
          <span>{{detailTray.nodeId}}</span>
        </el-form-item>
        <el-form-item label="状态" >
          <span>{{detailTray.status}}</span>
        </el-form-item>
        <el-form-item label="第一优先运输车辆类型" >
          <span>{{detailTray.firstCarType}}</span>
        </el-form-item>
        <el-form-item label="第二优先运输车辆类型" >
          <span>{{detailTray.secondCarType}}</span>
        </el-form-item>
      </el-form>
    </el-drawer>
    </div>
    </div>
    
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        drawer: false,
        dialogTableVisible: false,
        trayList:[],
        detailTray: {
            trayId: '',
            trayType: '',
            status: '',
            firstCarType: '',
            secondCarType: '',
        },
        waitingTrayCount: 0,
        runningTrayCount: 0,
        noOrderTrayCount: 0,
      }
    },
    created(){
        this.refresh();
    },
    methods:{
        refresh(){
          this.countRunningTray();
          this.countWaitingTray();
          this.countNoOrderTray();
          this.listRunningTray();
        },
        // 获取托盘详细信息
        getDetail(row){
            var that = this;
            that.drawer = true;
            axios.get("/tray/get?trayid="+row.trayId).then(
              function(res){
                console.log(res);
                if(res.data.isSuccess){
                  that.$message.success("查询成功");
                  that.detailTray = res.data.data;
                //   that.dialogTableVisible = true;
                }else{
                  that.$message.error("获取信息失败");
                }
              }
            )
        },
        // 获取running的托盘
        listRunningTray(){
          var that = this;
          axios.get("/tray/list?status=running").then(
            function(res){
              if(res.data.isSuccess){
                that.trayList = res.data.data;
                that.$message.success("查询成功");
              }else{
                that.$message.error("查询失败");
              }
            }
          )
        },
        // 获取waiting的托盘
        listWaitingTray(){
          var that = this;
          axios.get("/tray/list?status=waiting").then(
            function(res){
              if(res.data.isSuccess){
                that.trayList = res.data.data;
                that.$message.success("查询成功");
              }else{
                that.$message.error("查询失败");
              }
            }
          )
        },
        // 获取没有订单的托盘
        listNoOrderTray(){
          var that = this;
          axios.get("/tray/list?status=noOrder").then(
            function(res){
              if(res.data.isSuccess){
                that.trayList = res.data.data;
                that.$message.success("查询成功");
              }else{
                that.$message.error("查询失败");
              }
            }
          )
        },
        // countRunningTray
        countRunningTray(){
          var that = this;
          axios.get("/tray/count?status=running").then(
            function(res){
              if(res.data.isSuccess){
                that.runningTrayCount = res.data.data;
                // that.$message.success("查询成功");
              }else{
                that.$message.error("查询失败");
              }
            }
          )
        },
        // countWaitingTray
        countWaitingTray(){
          var that = this;
          axios.get("/tray/count?status=waiting").then(
            function(res){
              if(res.data.isSuccess){
                that.waitingTrayCount = res.data.data;
                // that.$message.success("查询成功");
              }else{
                that.$message.error("查询失败");
              }
            }
          )
        },
        // countNoOrderTray
        countNoOrderTray(){
          var that = this;
          axios.get("/tray/count?status=noOrder").then(
            function(res){
              if(res.data.isSuccess){
                that.noOrderTrayCount = res.data.data;
                // that.$message.success("查询成功");
              }else{
                that.$message.error("查询失败");
              }
            }
          )
        },
    },
  }
</script>