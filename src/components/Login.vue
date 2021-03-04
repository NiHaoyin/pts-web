<template>
    <div class="login_container">
        <div class = "login_box" >
            <div class="welcome">欢迎登录托盘配送系统</div>
            <el-form :model="loginForm" :rules="loginRules" 
                      ref="loginFormRef" class="login_form"
                      label-width="0px">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password" >
                    <el-input v-model="loginForm.password" 
                    prefix-icon="el-icon-user-solid" type = "password"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login()">登录</el-button>
                    <el-button type="info" @click="resetLoginForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            loginForm:{
                username:"admin",
                password:"admin"
            },
            loginRules:
            {
                username:[
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields()
        },
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return;
                const {data:res} = await this.$http.post("/login", this.loginForm);
                if (res.isSuccess){
                    console.log(res);
                    this.$message.success("登陆成功");
                    window.sessionStorage.setItem("user", this.loginForm.username);
                    this.$router.push({path:"/home"});
                    this.$router.replace()
                }else{
                    console.log(res);
                    this.$message.error("账号密码错误");
                }
            })
        }
    },
   
}
</script>

<style scoped>
.welcome{
    font-size: 25px;
    position: absolute;
    left: 28%;
    bottom: 85%;
}

.login_box{
    width: 500px;
    height: 240px;
    background-color: rgba(255, 255, 255, 0.418);
    border-radius:5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns{
    display: flex;
    justify-content: center;
}
</style>

