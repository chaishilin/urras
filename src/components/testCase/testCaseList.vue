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
        <test-case-item :info="testCaseInfo"></test-case-item>
      </el-collapse-item>
      <el-collapse-item
        v-for="(testCaseInfo, index) in testCaseInfoList"
        :name="testCaseInfo.caseId"
        :key="testCaseInfo.caseId"
      >
        <template slot="title">
          <el-tag type="info">{{ testCaseInfo.title }}</el-tag>
          <div class="switch">
            <el-tag type="success">启用</el-tag>
            <el-switch
              v-model="testCaseInfo.inUse"
              @change="enbaleTestCase(testCaseInfo, index)"
            ></el-switch>
          </div>
        </template>
        <!-- vue 中 父组件绑定的值，传递给子组件后，该值的更新无法引起子组件更新。 -->
        <test-case-item
          :info="testCaseInfo"
          :key="new Date().getTime()"
        ></test-case-item>
        <div class="debugInfo">
          <div  v-if="testCaseInfo.isError" v-for="item in testCaseInfo.debugInfoList">
          <div v-if="item != ''">{{ item }}</div>
        </div>
        </div>
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
        inUse: true,
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
  methods: {
    //todo 请求testCase的接口
    handleChange(val) {
      console.log(val);
    },
    enbaleTestCase(testCaseInfo, index) {
      if (testCaseInfo.inUse === false) {
        return;
      }
      var IsEnable = false;
      var debugInfo = "";
      this.testCaseInfoList[index].isError = IsEnable;
      this.$store
        .dispatch("EnableTestCase", testCaseInfo)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            IsEnable = true;
            this.$message({
              message: "启用成功",
              type: "success",
            });
          } else if (status == 401) {
            this.$router.push({
              path: "/",
            });
          } else {
            debugInfo = result.data.msg;
            this.$message({
              message: "启用失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "启用失败",
            type: "error",
          });
        })
        .finally(() => {
          if (IsEnable == false) {
            this.testCaseInfoList[index].isError = true;
            this.testCaseInfoList[index].debugInfo = "报错信息\n" + debugInfo;
            this.testCaseInfoList[index].debugInfoList = this.testCaseInfoList[index].debugInfo.split("\n");;
            this.testCaseInfoList[index].inUse = false; //假如运行失败，如何将inUse的值设为false
            this.$forceUpdate(); //强制刷新该组件
          }
        });
    },
    saveCase(testCaseInfo) {
      this.$store
        .dispatch("SaveTestCase", testCaseInfo)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.msg = result.data.msg;
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
  },
};
</script>

<style>
.switch {
  position: fixed;
  left: 85%;
}
.debugInfo{
  font-size: 20px;
}
</style>