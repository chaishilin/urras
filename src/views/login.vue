<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-tag type="primary">用户名</el-tag>
    <el-input v-model="loginForm.username" placeholder="">用户名</el-input>
    <el-input v-model="loginForm.password" placeholder="">密码</el-input>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to urras',
      loginForm:{
        username:"admin",
        password:"password"
      },
      info:''
    }
  },
  methods:{
    login(){
      console.log("登录~");
      this.$store.dispatch("Login",this.loginForm).then((result) => {
        let status = result.status;
        console.log(result.data)
        if(status == 200){
          console.log("yes")
        }else{
          console.log("no")
        }
      }).catch((err) => {
        return false;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
