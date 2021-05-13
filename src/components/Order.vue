<template>
  <div>

    <el-row type="flex">
      <el-button type="primary" @click="listRunningOrder">查询正在运输中的订单</el-button>
      <el-button type="primary" @click="listWaitingOrder">查询正在等待的订单</el-button>
      <el-button type="primary" @click="listFinishedOrder">查询已完成的订单</el-button>
      <!-- <el-button type="primary" @click="listOrder">查询所有订单</el-button> -->
      <el-button type="primary" @click="dialogFormVisible = true">下单</el-button>
      <el-button type="primary" @click="refresh">刷新</el-button>
      <el-col :span="6"><div class="bar">正在等待的订单数量：{{waitingOrderCount}}</div></el-col>
      <el-col :span="6"><div class="bar">正在运送的订单数量：{{runningOrderCount}}</div></el-col>
    </el-row>
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
    <el-form :model="form">
        <!-- 输入需要运送的托盘 -->
        <el-form-item label="需要运送的托盘" :label-width="formLabelWidth">
        <el-select v-model="trayId" filterable placeholder="请选择">
            <el-option
            v-for="item in trayIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
            </el-option>
        </el-select>
        </el-form-item>
        <!-- 选择出发地 -->
        <el-form-item label="出发地" :label-width="formLabelWidth">
        <el-select v-model="form.src" filterable placeholder="请选择">
            <el-option
            v-for="item in src"
            :key="item.value"
            :value="item.value"
            >
            </el-option>
        </el-select>
        </el-form-item>
        <!-- 选择目的地 -->
        <el-form-item label="目的地" :label-width="formLabelWidth">
        <el-select v-model="form.dst" filterable placeholder="请选择">
            <el-option
            v-for="item in dst"
            :key="item.value"
            :label="item.value"
            :value="item.value"
            :disabled="item.disabled">
            </el-option>
        </el-select>
        </el-form-item>
        <!-- 选择优先级 -->
        <el-form-item label="优先级" :label-width="formLabelWidth">
        <el-select v-model="form.priority" filterable placeholder="请选择">
            <el-option
            v-for="item in priority"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        </el-form-item>
        <!-- new bar here-->

        </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="placeorder()">确 定</el-button>
    </div>
    </el-dialog>
    
    <!-- 订单表格 -->
    <div>
    <el-table :data="orderTable" style="width: 100%" 
      stripe border >
        <el-table-column prop="orderId" label="订单Id"></el-table-column>
        <el-table-column prop="trayId" label="托盘Id"></el-table-column>
        <el-table-column prop="carId" label="运输车Id"></el-table-column>
        <el-table-column prop="src" label="出发地"></el-table-column>
        <el-table-column prop="dst" label="目的地"></el-table-column>
        <el-table-column prop="priority" label="优先级"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button  @click="getDetail(scope.row)" 
          type="primary" size="medium">详细信息</el-button>
          <el-button :disabled="scope.row.status != 'waiting'" @click="deleteOrder(scope.row)" 
          type="danger" size="medium">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <!-- Detail order -->
    <div>
    <el-drawer
      title=订单详细信息
      :visible.sync="drawer"
      size = "30%">
      <el-form ref="detailOrder" :model="detailOrder" label-width="120px" 
      label-position="middle" >
        <el-form-item label="订单Id">
          <span>{{detailOrder.orderId}}</span>
        </el-form-item>
        <el-form-item label="托盘Id">
          <span>{{detailOrder.trayId}}</span>
        </el-form-item>
        <el-form-item label="运输车Id">
          <span>{{detailOrder.carId}}</span>
        </el-form-item>
        <el-form-item label="运输车类型">
          <span>{{detailOrder.carType}}</span>
        </el-form-item>
        <el-form-item label="出发地" >
          <span>{{detailOrder.src}}</span>
        </el-form-item>
        <el-form-item label="目的地">
          <span>{{detailOrder.dst}}</span>
        </el-form-item>
        <el-form-item label="状态">
          <span>{{detailOrder.status}}</span>
        </el-form-item>
        <el-form-item label="下单人Id">
          <span>{{detailOrder.userId}}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span>{{detailOrder.created}}</span>
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
        dialogFormVisible: false,
        drawer: false,
        runningOrderCount: 0,
        waitingOrderCount: 0,
        // 提交表单
        trayId: '',
        form: {
          trayId : '',
          src: '',
          dst: '',
          priority: '',
          userId: window.sessionStorage.getItem("userId"),
        },
        // 托盘列表
        trayIdList: [],
        // 出发地列表
        src:[{
          value: '',
        }],
        // 目的地列表
        dst: [],
        priority:[{
          value: 1,
          label: '普通',
        },{
          value: 2,
          label: '紧急',
        },{
          value: 3,
          label: '非常紧急',
        }
        ],
        // 订单列表
        orderTable: [],
        detailOrder: {
        },
        formLabelWidth: '120px',
        dialogTableVisible: false,
      };
    },
    created(){
        this.init();
    },
    watch:{
      trayId: 'changeSrcDst',
      // deep: true,
    },
    methods:{
        // 拿到src，dst和tray列表
        init(){
          this.countRunningOrder();
          this.countWaitingOrder();
          this.listWaitingOrder();
          this.getTrayIdList();
        },
        // 进行下单或者删除订单操作之后要刷新
        refresh(){
          this.countRunningOrder();
          this.countWaitingOrder();
          this.listWaitingOrder();
          this.getTrayIdList();
          this.trayId = '';
          // this.form.src = '';
          // this.form.dst = '';
        },
        changeSrcDst(){
          this.changeSrc();
          this.changeDst();
        },
        // 得到托盘Id列表
        getTrayIdList(){
          var that = this;
          that.trayIdList.length = 0;
          axios.get('/tray/listid?status=noOrder').then(
            function(res){
              // console.log(res);
              if(res.data.isSuccess){
                that.trayIdList.length = 0;
                for(let i = 0; i<res.data.data.length;i++){
                  that.trayIdList.push({value: res.data.data[i], disabled: false});
                }
              }
            }
          )
        },
        // 根据trayId得到出发地
        changeSrc(){
          var that = this;
          console.log(that.trayId);
          that.form.trayId = that.trayId;
          axios.get('/tray/getcurrentnode?trayId='+that.form.trayId).then(
            function(res){
              // console.log(res);
              if(res.data.isSuccess){
                that.src[0].value = res.data.data;
                // console.log(that.src);
              }
            }
          )
        },
        // 根据trayId得到可能的目的地
        changeDst(){
          var that = this;
          that.dst.length = 0; // 清空数组
          axios.get('/tray/getavailablenode?trayId='+that.form.trayId).then(
            function(res){
              if(res.data.isSuccess){
                for(let i = 0; i<res.data.data.length;i++){
                  that.dst.push({value: res.data.data[i]});
                }
              }
            }
          )
        },
        // 查询正在运输的订单数量
        countRunningOrder(){
          var that = this;
          axios.get('/order/count?status=running').then(
            function(res){
              if(!res.data.isSuccess){
                that.$message.error("查询订单数量失败");
              }else{
                that.runningOrderCount = res.data.data;
              }
            }
          )
        },
        // 查询正在等待的订单数量
        countWaitingOrder(){
          var that = this;
          axios.get('/order/count?status=waiting').then(
            function(res){
              if(!res.data.isSuccess){
                that.$message.error("查询订单数量失败");
              }else{
                that.waitingOrderCount = res.data.data;
              }
            }
          )
        },
        // 下单
        placeorder(){
            var that = this;
            that.form.trayId = that.trayId;
            axios.post('/order/place', that.form).then(
                function(res){
                    console.log(res);
                    if (res.data.isSuccess){
                        that.$message.success("下单成功");
                        that.refresh();
                    }else{
                        that.$message.error(res.data.errorMessage);
                    }
                }
            )
            that.dialogFormVisible = false;
            
        },
        // 删除订单
        deleteOrder(row){
          this.$confirm('确定要删除订单吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             var that = this;
             axios.delete("/order/delete?orderid="+row.orderId).then(
                 function(res){
                    console.log(res);
                    if(res.data.isSuccess){
                        that.$message({
                        type: 'success',
                        message: '删除成功!'
                        });
                        that.refresh();
                    }else{
                        that.$message.error("删除订单失败");
                    }
                 }
             )
        })
        },
        // 查询正在运输的订单
        listRunningOrder(){
          var that = this;
          axios.get("/order/list?status=running").then(
            function(res){
              if(res.data.isSuccess){
                that.orderTable = res.data.data;
                for(let i = 0; i < res.data.data.length; i++){
                  let priority = that.orderTable[i].priority;
                  if(priority >= 3){
                    that.orderTable[i].priority = '非常紧急';
                  }else if(priority == 2){
                    that.orderTable[i].priority = '紧急';
                  }else{
                    that.orderTable[i].priority = '普通';
                  }
                }
                // that.$message("查询成功");
              }else{
                that.$message("查询正在运输的订单失败");
              }
            }
          )
          console.log("fin");
        },
        // 查询正在等待的订单
        listWaitingOrder(){
          var that = this;
          axios.get("/order/list?status=waiting").then(
            function(res){
              console.log(res);
              if(res.data.isSuccess){
                for(let i = 0; i<res.data.data.length;i++){
                  if(res.data.data[i].carId === ""){
                    res.data.data[i].carId = "未分配运输车";
                  }
                  let priority = res.data.data[i].priority;
                  if(priority >= 3){
                    res.data.data[i].priority = '非常紧急';
                  }else if(priority == 2){
                    res.data.data[i].priority = '紧急';
                  }else{
                    res.data.data[i].priority = '普通';
                  }
                }
                that.orderTable = res.data.data;
                // that.$message("查询成功");
              }else{
                that.$message("查询失败");
              }
            }
          )
        },
        // 查询已经完成的订单
        listFinishedOrder(){
          var that = this;
          axios.get("/order/list?status=finished").then(
            function(res){
              console.log(res);
              if(res.data.isSuccess){
                that.orderTable = res.data.data;
                that.$message("查询成功");
              }else{
                that.$message("查询失败");
              }
            }
          )
        },
        // 查询所有的订单
        // listOrder(){
        //   var that = this;
        //   axios.get("/order/list").then(
        //     function(res){
        //       console.log(res);
        //       if(res.data.isSuccess){
        //         that.orderTable = res.data.data;
        //         that.$message("查询成功");
        //       }else{
        //         that.$message("查询失败");
        //       }
        //     }
        //   )
        // },
        // 获取订单详细信息
        getDetail(row){
            var that = this;
            that.drawer = true;
            axios.get("/order/get?orderid="+row.orderId).then(
              function(res){
                console.log(res);
                if(res.data.isSuccess){
                  that.drawer = true;
                  that.$message.success("查询成功");
                  if(res.data.data.carId == ""){
                    res.data.data.carId = "未分配运输车";
                  }
                  that.detailOrder = res.data.data;
                  
                  // that.dialogTableVisible = true;
                }else{
                  that.$message.error("获取信息失败");
                }
              }
            )
        },

      // new function here
    }
  };
</script>

<style>
  .el-table .warning-row {
    background: #fdf5e6;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }

  .bar {
    font-size: 18px;
  }
</style>