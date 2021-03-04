<template>
<div>
    <el-button type="text" @click="dialogFormVisible = true">下单</el-button>

    <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
    <el-form :model="form">
        <!-- 输入需要运送的物料 -->
        <el-form-item label="需要运送的物料" :label-width="formLabelWidth">
        <el-input v-model="form.pallet" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 选择出发地 -->
        <el-form-item label="出发地" :label-width="formLabelWidth">
        <el-select v-model="form.src" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-form-item>
        <!-- 选择目的地 -->
        <el-form-item label="目的地" :label-width="formLabelWidth">
        <el-select v-model="form.dst" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="placeorder()">确 定</el-button>
    </div>
    </el-dialog>
</div>
<!-- Form -->

</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          pallet : '',
          src: '',
          dst: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods:{
        placeorder(){
            var that = this;
            axios.post('/order/place', that.form).then(
                function(res){
                    console.log(res);
                    if (res.data.isSuccess){
                        that.$message.success("下单成功");
                    }else{
                        that.$message.alert("下单失败");
                    }
                }
            )
            that.dialogFormVisible = false;
        }
    }
  };
</script>
