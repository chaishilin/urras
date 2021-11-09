<template>
  <div class="programPublicList">
    <h1 class="msg">{{ msg }}</h1>
    <div class = "info" v-for="info in programInfoList">
      <program-item :info="info"></program-item>
    </div>
  </div>
</template>

<script>
import programItem from "@/components/programItem";

export default {
  data() {
    return {
      msg: "公共程序清单",
      programInfoList: [
        {
          createrName: "",
          programId: "",
          title: "",
          language: "",
          createTime: "",
          createrId: "",
          content: "",
          createrName: "(*^_^*)",
        },
      ],
    };
  },
  components: {
    programItem,
  },
  mounted: function () {
    this.$store
      .dispatch("PublicProgramList")
      .then((result) => {
        let status = result.data.code;
        //console.log(result.data);
        if (status == 200) {
          this.programInfoList = result.data.data;
          //console.log("yes");
        } else if (status == 401) {
          this.$router.push({
            path: "/",
          });
        } else {
          //console.log("no");
          alert(result.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
  methods:{
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
.msg{
  color: tan;
  font-size: 30px;
}
.info{
  border: 10px solid white;
  display: inline-block;
}
</style>