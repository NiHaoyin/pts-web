<template>
<el-container>
  <!-- 头部栏 -->
  <el-header>
    <div>
      欢迎使用托盘配送信息系统
    </div>
    
   
  </el-header>

  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="125px">
    <el-row width="140px" class="sideMenu">
    <el-col :span="150" class="sideMenu">
    <el-menu
      class="sideMenu"
      :router='true'>
      <el-menu-item index="1" class="sideMenu">
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
      <el-menu-item index="2" class="sideMenu">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
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
    </el-col>
    </el-row>
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
}
</script>

<style>
  .el-aside {
    background-color: #dae0e6;
    color: #333;
    text-align: left;
    line-height: 120px;
  }

  .sideMenu{
    background-color: #dae0e6;
    color: #333;
    text-align: left;
    line-height: 100px;
  }
  
  .el-main {
    /* background-color: #E9EEF3; */
    /* color: #333; */
    text-align: center;
    /* line-height: 160px; */
  }
  
  
</style>
