<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ info.title }}</span>
      <el-button style="float: right; padding: 3px 0" type="info" @click="loadDetail(info.programId)"
        >打开详情</el-button
      >
    </div>
    <div class="text item">
      {{ "作者： " + info.createrName }}
    </div>
    <div class="text item">
      {{ "编程语言：" + info.language }}
    </div>
    <div class="text item">
      {{ "内容：" + info.content }}
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      programInfo: {
        programId:"022021110300019",
        language: "java",
        createrId: localStorage.getItem("userid"),
        title: "前n项和",
        content:"wdefghhgfdsadfghnjhfd",
        state: "",
        publicState: "",
        createrName: "(*^_^*)",
      },
    };
  },
  props:{
      info:this.programInfo,//programInfo是默认值
  },
  methods:{
      loadDetail(programId){
          console.log(programId)
          this.$router.push({
              path: "/doProgram",
              query:{programId:programId},
            });
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width:50ch;
  float: left;
  border: 10px solid tan;
  height: 200px;
}
</style>