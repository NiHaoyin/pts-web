<template>
    <div align="left">
      
    <!-- 添加用户按钮 -->
    <el-row>
    <el-button @click="dialogFormVisible = true" type="primary">添加用户</el-button>
    <!-- 激活所有用户 -->
      <el-button @click="activateAllUser()" type="primary">激活所有用户</el-button>
    </el-row>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
    <el-form :model="form">
        <!-- 输入用户名和密码 -->
        <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
    </div>
    </el-dialog>
    
   

    <!-- 用户列表 -->
    <div>
      <!-- 用户信息 -->
      <el-table :data="userlist" style="width: 100%" >
      <el-table-column fixed prop="id" label="用户id" width="75">
      </el-table-column>
      <el-table-column fixed prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column fixed prop="password" label="用户密码" width="200">
      </el-table-column>
      <el-table-column fixed prop="created" label="创建日期" width="200">
      </el-table-column>
      <el-table-column fixed prop="status" label="状态" width="100">
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.active" @click="activate(scope.row)" 
          type="text" size="medium">激活用户</el-button>
          <el-button :disabled="!scope.row.active" @click="activate(scope.row)" 
          type="text" size="medium">注销用户</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>


    </div>

</template>


<script>
import axios from 'axios'
  export default {
    data() {
      return {
        // 添加用户
        dialogFormVisible: false,
        form: {
          username : '',
          password : '',
        },
        formLabelWidth: '80px',

        // 用户列表
        userlist: [],

      };
      
    },
    created(){
        // 查询所有用户
        var that = this;
        axios.get("/user/list").then(
          function(response){
            console.log(response);
            that.userlist = response.data.data;
            for(let i=0;i<that.userlist.length;i++){
              if(that.userlist[i].active){
                that.userlist[i].status = "已激活";
              }else{
                that.userlist[i].status = "未激活";
              }
            }
            }
        )
        
    },
    methods:{
        addUser(){
            var that = this;
            axios.post('/user/add', that.form).then(
                function(res){
                    console.log(res);
                    if (res.data.isSuccess){
                        that.$message.success("添加成功");
                    }else{
                        that.$message.error("添加失败，"+res.data.errorMessage);
                    }
                }
            )
            that.dialogFormVisible = false;
        },

        // 激活或注销用户
        activate(row){
          this.$confirm('确定要修改用户状态吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.active = !row.active;
          axios.get("/user/activate?userid="+row.id+"&active="+row.active).then(
            function(res){
              console.log(res);
            }
          )
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          if (row.active){
            row.status = "已激活";
          }else{
            row.status = "未激活";
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
        },

        // 激活所有用户
        activateAllUser(){
          this.$confirm('确定要修改用户状态吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var that = this;
          axios.get("/user/activateall").then(
            function(){
              for(let i=0;i<that.userlist.length;i++){
                that.userlist[i].active = true;
                that.userlist[i].status = "已激活";
              }
            })
            this.$message({type: 'success', message: '修改成功!'});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
        }
    
    // new function here

    }
}
</script>

<style>
  
</style>