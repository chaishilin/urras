<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ info.title }}</span>
      
      <el-button
        style="float: right; padding: 3px 0"
        type="info"
        @click="loadDetail(info.programId)"
        >打开详情</el-button
      >
    </div>
    <span>支持语言：</span></span>
    <div class="languageList" v-for="key,value in info.codeMap">
     <el-tag class="languageTag"  type="success">{{value}}</el-tag> 
    </div>
    <br>
    <br>
    <div class="text item">
      {{ "作者： " + info.createrName }}
    </div>
  
    <div class="text item">
      {{ "内容：" + getContentAbstract(info.content)}}
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      programInfo: {
        programId: "022021110300019",
        language: "java",
        codeMap:"",
        createrId: localStorage.getItem("userid"),
        title: "前n项和",
        content: "wdefghhgfdsadfghnjhfd",
        state: "",
        publicState: "",
        createrName: "(*^_^*)",
      },
    };
  },
  props: {
    info: this.programInfo, //programInfo是默认值，vue组件的传参
  },
  methods: {
    loadDetail(programId) {
      console.log(programId);
      this.$router.push({
        path: "/doProgramPage",
        query: { programId: programId },
      });
    },
    getContentAbstract(content){
      var result = content.replace(/<[^>]+>/g,"");
      if(result.length > 10){
        return result.substring(0,20) + "...";
      }else{
        return result;
      }
    }
  },
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
  width: 50ch;
  float: left;
  border: 10px solid tan;
  height: 200px;
}
.languageList{
    display: inline-block;
  position:relative;
}
.languageTag{
  float: left;
  position:inherit;
}

</style>