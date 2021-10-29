<template>
  <div class="userInfo">
    <h1>{{ msg }}</h1>
    <el-table :data="userInfoList">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="username" prop="username"></el-table-column>
      <el-table-column label="password" prop="password"></el-table-column>
      <el-table-column label="createTime" prop="createTime"></el-table-column>
      <el-table-column label="lastModifiedTime" prop="lastModifiedTime"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg:"userInfoList",
      userInfoList:[{
          id:"",
          username:"admin",
          password:"password",
          createTime:"",
          lastModifiedTime:""
        }   
      ]
    }
  },
  methods:{
  },
  mounted:function(){
    this.$store.dispatch("UserInfoList").then((result) => {
      let status = result.data.code;
      console.log(result.data)
      if(status == 200){
        this.userInfoList = result.data.data
        console.log("yes")
      }else if(status == 401){
        this.$router.push({
          path:"/"
        })
      }else{
        console.log("no")
        alert(result.data.msg)
      }
    }).catch((err) => {
      console.log(err)
        return false;
    });
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
