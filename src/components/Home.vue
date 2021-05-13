<template>
<el-container  style="solid #eee">
  <!-- 头部栏 -->
  <el-header>
    <div>
      <img src="../assets/logo.png" alt/>
      <span>欢迎使用托盘运输信息系统</span>
    </div>
    <el-button type="info" @click="logout">退出登录</el-button>
   
  </el-header>

  <el-container style="height: 100%; border: 1px solid #eee">
    <!-- 侧边栏 -->
    <el-aside width="170px" style="height: 100%; ">
    <el-menu
      class="sideMenu"
      :router='true'>
      <el-menu-item index="/tray" class="sideMenu">
        <i class="el-icon-menu"></i>
        <span slot="title">托盘管理</span>
      </el-menu-item>
      <el-menu-item index="/car" class="sideMenu">
        <i class="el-icon-menu"></i>
        <span slot="title"><router-link to="/car"></router-link>运输车管理</span>
      </el-menu-item>
      <el-menu-item index="/order" class="sideMenu">
        <i class="el-icon-s-order"></i>
        <span slot="title"><router-link to="/order"></router-link>订单模块</span>
      </el-menu-item>
      <el-menu-item index="/user" class="sideMenu" active-text-color="#409eff">
        <i class="el-icon-user"></i>
        <span slot="title"><router-link to="/user"></router-link>用户管理</span>
      </el-menu-item>
    </el-menu>
   
    </el-aside>

    <!-- 主体栏 -->
    <el-main>
        <!-- 主题用路由占位符占住 -->
        <router-view>
        </router-view>
    </el-main>
  </el-container>

</el-container>
</template>

<script>
export default {
    name: 'Home',
    methods:{
      logout(){
        window.sessionStorage.clear();
        this.$router.push("/login");
      }
    }
}
</script>

<style>
  

  .el-header{
    /* background-color:#dae0e6; */
    display: flex;
    justify-content: space-between;
    /* padding-left: 10%;
    font-size: 20px; */
    height: 60px;
    /* color:#fff; */

  }
  /* .home-container{
    height: 100%;
  } */
  .sideMenu{
    /* background-color: #dae0e6; */
    color: #333;
    text-align: left;
    line-height: 100px;
    height: 100%;
  }
  
  .el-main {
    /* background-color: #E9EEF3; */
    /* color: #333; */
    text-align: center;
    /* line-height: 160px; */
  }

  img{
    width: 55px;
    height: 55px;
  }
  
  
</style>
