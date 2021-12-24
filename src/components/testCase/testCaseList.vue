<template>
  <div class="testCaseList">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-model="this.testCaseInfo"
        :name="testCaseInfo.caseId"
        :key="testCaseInfo.caseId"
      >
        <template slot="title">
          <el-tag type="primary"> 新建测试用例 </el-tag>
        </template>
        <test-case-item @flash="flash" :info="testCaseInfo"></test-case-item>
      </el-collapse-item>
      <el-collapse-item
        v-for="(testCaseInfo, index) in testCaseInfoList"
        :name="testCaseInfo.caseId"
        :key="testCaseInfo.caseId"
      >
        <template slot="title">
          <h3 class="caseTitle">{{ testCaseInfo.title}}</h3>
          <el-tag class="caseTitle" type="info" >{{ testCaseInfo.language }}</el-tag>
        </template>
        <test-case-item @flash="flash" :info="testCaseInfo"></test-case-item>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import TestCaseItem from "./testCaseItem.vue";

export default {
  data() {
    return {
      testCaseQuery: {},
      testCaseInfo: {
        title: "新增 测试",
        caseId: null,
        inUse: false,
        language: "python",
        input: "1,2,3",
        content: "备注...",
        code: "~~",
        createrId: "232",
        state: "01",
        isUse: true,
      },
      testCaseInfoList: [
        {
          title: "java 测试",
          caseId: "2323",
          inUse: true,
          language: "python",
          input: "1,2,3",
          content: "备注...",
          code: "java~~",
          createrId: "232",
          state: "01",
          isUse: true,
          isError: false,
          debugInfo: "",
        },
      ],

      activeNames: ["2323", "23233"],
    };
  },
  components: {
    TestCaseItem,
  },
  created() {
    this.getCaseList();
  },
  methods: {
    //todo 请求testCase的接口
    handleChange(val) {
      console.log(val);
    },
    getCaseList() {
      this.$store
        .dispatch("TestCaseList", this.testCaseQuery)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.testCaseInfoList = result.data.data;
            for (let item of this.testCaseInfoList) {
              item.isError = false;
              item.debugInfo = "";
              if (item.state === "01") {
                item.inUse = true;
              } else {
                item.inUse = false;
              }
            }
          } else if (status == 401) {
            this.$router.push({
              path: "/",
            });
          } else {
            alert(result.data.msg);
          }
        })
        .catch((err) => {
          return false;
        });
    },
    flash() {
      this.getCaseList();
    },
  },
};
</script>

<style>
.caseTitle{
  margin: 10px;
}
</style>