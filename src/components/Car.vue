<template>
    <div>
      <!-- 按钮 -->
      <el-row type="flex">
        <el-button type="primary" @click="listRunningCar">查询运送中的运输车</el-button>
        <el-button type="primary" @click="listWaitingCar">查询等待中的运输车</el-button>
        <el-button type="primary" @click="refresh">刷新</el-button>
        <el-col :span="6"><div class="bar">运送中的运输车数量：{{runningCarCount}}</div></el-col>
        <el-col :span="6"><div class="bar">等待中的运输车数量：{{waitingCarCount}}</div></el-col>
        <!-- <el-button type="success" round>成功按钮</el-button> -->
      </el-row>
      <!-- 表格 -->
      <el-table :data="carList" stripe border >
          <el-table-column prop="carId" label="车牌号" width="175">
          </el-table-column>
          <el-table-column  prop="carType" label="车辆类型" width="150">
          </el-table-column>
          <el-table-column  prop="position" label="车辆位置" width="280">
          </el-table-column>
          <el-table-column  prop="status" label="状态" width="150">
          </el-table-column>
          <el-table-column label="操作" width="500">
          <template slot-scope="scope">
            <!-- <el-button type="success" round>成功按钮</el-button> -->
          <el-button  @click="getDetail(scope.row)" 
            type="primary" size="medium">详细信息</el-button>
          </template>
        </el-table-column>
        </el-table>
        <!-- 抽屉 -->
        <div>
        <el-drawer
          title=车辆详细信息
          :visible.sync="drawer"
          size = "30%">
          <el-form ref="detailCar" :model="detailCar" label-width="120px" 
          label-position="middle" >
            <el-form-item label="车牌号" >
              <span>{{detailCar.carId}}</span>
            </el-form-item>
            <el-form-item label="车辆类型" >
              <span>{{detailCar.carType}}</span>
            </el-form-item>
            <el-form-item label="车辆位置" >
              <span>{{detailCar.position}}</span>
            </el-form-item>
            <el-form-item label="状态" >
              <span>{{detailCar.status}}</span>
            </el-form-item>
            <el-form-item label="车速" >
              <span>{{detailCar.speed}} km/h</span>
            </el-form-item>
            <el-form-item label="载位" >
              <span>{{detailCar.capacity}}</span>
            </el-form-item>
            <el-form-item label="载重" >
              <span>{{detailCar.load}} 吨</span>
            </el-form-item>
            <el-form-item label="司机" >
              <span>{{detailCar.driver}}</span>
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
        waitingCarCount: 0,
        runningCarCount: 0,
        detailCar: {},
        carList: [],
      }
    },
    created(){
        this.refresh();
    },
    methods:{
      refresh(){
        this.countRunningCar();
        this.countWaitingCar();
        this.listWaitingCar();
      },
      // 获取车辆详细信息
      getDetail(row){
        var that = this;
        that.drawer = true;
        axios.get("/car/get?carid="+row.carId).then(
          function(res){
            console.log(res);
            if(res.data.isSuccess){
              that.$message.success("查询成功");
              switch(res.data.data.carType){
                    case 'PBTC1':
                      res.data.data.carType = '平板拖车(1载位)';
                      break;
                    case 'PBTC2':
                      res.data.data.carType = '平板拖车(2载位)';
                      break;
                    case 'PBYSC':
                      res.data.data.carType = '平板运输车';
                      break;
                    case 'CC':
                      res.data.data.carType = '叉车';
                      break;
                  }
              that.detailCar = res.data.data;
            }else{
              that.$message.error("获取信息失败");
            }
          }
        )
      },
      // 获取runningCar
      listRunningCar(){
        var that = this;
        axios.get("/car/list?status=running").then(
          function(res){
            if(res.data.isSuccess){
              for(let i = 0; i < res.data.data.length; i++){
                res.data.data[i].position = JSON.stringify(res.data.data[i].position);
                switch(res.data.data[i].carType){
                    case 'PBTC1':
                      res.data.data[i].carType = '平板拖车(1载位)';
                      break;
                    case 'PBTC2':
                      res.data.data[i].carType = '平板拖车(2载位)';
                      break;
                    case 'PBYSC':
                      res.data.data[i].carType = '平板运输车';
                      break;
                    case 'CC':
                      res.data.data[i].carType = '叉车';
                      break;
                  }
              }
              that.carList = res.data.data;
              that.$message.success("查询成功");
            }else{
              that.$message.error("查询失败");
            }
          }
        )
      },
      // 获取waitingCar
      listWaitingCar(){
        var that = this;
        axios.get("/car/list?status=waiting").then(
          function(res){
            if(res.data.isSuccess){
              for(let i = 0; i < res.data.data.length; i++){
                res.data.data[i].position = JSON.stringify(res.data.data[i].position);
                switch(res.data.data[i].carType){
                    case 'PBTC1':
                      res.data.data[i].carType = '平板拖车(1载位)';
                      break;
                    case 'PBTC2':
                      res.data.data[i].carType = '平板拖车(2载位)';
                      break;
                    case 'PBYSC':
                      res.data.data[i].carType = '平板运输车';
                      break;
                    case 'CC':
                      res.data.data[i].carType = '叉车';
                      break;
                  }
              }
              that.carList = res.data.data;
              that.$message.success("查询成功");
            }else{
              that.$message.error("查询失败");
            }
          }
        )
      },
      // countRunningTray
      countRunningCar(){
        var that = this;
        axios.get("/car/count?status=running").then(
          function(res){
            if(res.data.isSuccess){
              that.runningCarCount = res.data.data;
              // that.$message.success("查询成功");
            }else{
              that.$message.error("查询失败");
            }
          }
        )
      },
      // countWaitingTray
      countWaitingCar(){
        var that = this;
        axios.get("/car/count?status=waiting").then(
          function(res){
            if(res.data.isSuccess){
              that.waitingCarCount = res.data.data;
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