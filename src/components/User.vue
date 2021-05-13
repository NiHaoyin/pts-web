<template>
    <div >
      
    <!-- 添加用户按钮 -->
    <el-row type="flex" justify="start">
    <el-button @click="dialogFormVisible = true" type="primary">添加用户</el-button>
    <!-- 激活所有用户按钮 -->
    <el-button @click="activateAllUser()" type="primary">激活所有用户</el-button>
    <el-button @click="refresh()" type="primary">刷新</el-button>
    </el-row>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="addUserRules">
        <!-- 输入用户名和密码 -->
        <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
        <el-input v-model="form.password2" autocomplete="off"></el-input>
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
      <el-table :data="userlist" stripe border>
      <el-table-column prop="userId" label="用户id" width="75">
      </el-table-column>
      <el-table-column  prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column  prop="password" label="用户密码" width="300">
      </el-table-column>
      <el-table-column  prop="created" label="创建日期" width="200">
      </el-table-column>
      <el-table-column  prop="status" label="状态" width="100">
      </el-table-column>

      <!-- 操作按钮 -->
      <el-table-column label="操作" width="500">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.active" @click="activate(scope.row)" 
          type="text" size="medium">激活用户</el-button>
          <el-button :disabled="!scope.row.active" @click="activate(scope.row)" 
          type="text" size="medium">注销用户</el-button>
          <el-button  @click="deleteUser(scope.row)" 
          type="text" size="medium">彻底删除用户</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <div class="block">
    <el-pagination
      @current-change="changePage"
      layout="prev, pager, next"
      :total="userCount"
      :page-size="offset"
      >
    </el-pagination>
    </div>
    
    <!-- new module here -->
    
</div>
</template>


<script>
import axios from 'axios'
  export default {
    data() {
      return {
        // 新添的用户信息
        dialogFormVisible: false,
        form: {
          username : '',
          password : '',
          password2: '',
        },
        formLabelWidth: '80px',
        addUserRules:
          {
            username:[
              { required: true, message: '请输入用户名称', trigger: 'blur' },
            ],
            password:[
              { required: true, message: '请输入密码', trigger: 'blur' },
            ],
          },
        // 用户列表
        userlist: [],

        // 用户数量
        userCount: 0,

        // 一页能显示多少用户
        offset: 5,
      };
      
    },
    created(){
        this.refresh();
    },

    methods:{
        refresh(){
          // 查询用户数量
          this.countUser();
          // 渲染第一页用户列表
          this.listUser(0);
        },

        listUser(base){
          var that = this;
          axios.get("/user/list?base="+base+"&offset="+that.offset).then(
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

        countUser(){
          var that = this;
          axios.get("/user/count").then(
            function(response){
              console.log(response);
              if(response.data.isSuccess){
                that.userCount = response.data.data;
              }else{
                that.$message.error(response.data.errorMessage);
              }
            }
          )
        },

        // 切换用户列表分页
        changePage(newPage){
          this.listUser((newPage-1)*this.offset);
        },

        addUser(){
            var that = this;
            if (that.form.username == '' || that.form.password == ''){
              that.$message.error("用户名密码不能为空");
              return;
            }
            if (that.form.password != that.form.password2){
              that.$message.error("两次密码输入不一致");
              return;
            }
            axios.post('/user/add', that.form).then(
              function(res){
                console.log(res);
                if (res.data.isSuccess){
                  that.$message.success("添加成功");
                  that.countUser();
                  that.listUser(0);
                }else{
                  that.$message.error(res.data.errorMessage);
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
          if (row.id == 1){
            this.$message.warning("该用户状态不能被修改");
            return;
          }
          var that = this;
          row.active = !row.active;
          axios.put("/user/activate?userid="+row.id+"&active="+row.active).then(
            function(res){
              console.log(res);
              if(res.data.isSuccess){
                that.$message({
                  type: 'success',
                  message: '修改成功!'
                });
              }else{
                that.$message.error("修改失败");
              }
            }
          )
          if (row.active){
            // console.log("y");
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
          axios.put("/user/activateall").then(
            function(res){
              if (res.data.isSuccess){
                for(let i=0;i<that.userlist.length;i++){
                  that.userlist[i].active = true;
                  that.userlist[i].status = "已激活";
                  that.refresh();
                  that.$message({type: 'success', message: '修改成功!'});
                }
              }else{
                that.$message({type: 'error', message: '修改失败!'});
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
        },
    
        // new function here
        deleteUser(row){
          var that = this;
          this.$confirm('确定要彻底删除用户吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
          if (row.id == 1){
            this.$message({type: 'warning',message: '该用户不能被删除!'});
            return;
          }
          axios.delete("/user/delete?userid="+row.id).then(
            function(res){
              console.log(res);
              if (res.data.isSuccess){
                that.$message({type: 'success',message: '删除成功!'});
                that.countUser();
                that.listUser(0);
              }else{
                that.$message({type: 'error',message: '删除失败!'});
              }
            }
          )
          }).catch(() => {
            this.$message({type: 'info', message: '已取消删除'});          
          });
          }
    }
}
</script>

<style>
  
</style>