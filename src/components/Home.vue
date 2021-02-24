<template>
<el-container>
  <el-header>Header</el-header>

  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="125px">
    <el-row width="140px" class="sideMenu">
    <el-col :span="150" class="sideMenu">
    <el-menu
      class="sideMenu"
      :router='true'>
      <el-submenu index="1" class="sideMenu">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" class="sideMenu">选项1</el-menu-item>
          <el-menu-item index="1-2" class="sideMenu">选项2</el-menu-item>
          <el-menu-item index="1-3" >选项3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2" class="sideMenu">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" class="sideMenu">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4" class="sideMenu">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <el-menu-item index="user" class="sideMenu">
        <i class="el-icon-setting"></i>
        <span slot="title">用户管理</span>
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
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
