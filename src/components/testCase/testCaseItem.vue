<template>
  <div class="testCaseItem">
    <el-form :model="info" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="语言">
        <el-input v-model="info.language"></el-input>
      </el-form-item>
      <el-form-item label="接口输入">
        <el-input v-model="info.input"></el-input>
      </el-form-item>
      <el-form-item label="测试代码">
        <codemirror
          class="code-mirror"
          v-model:value="info.code"
          :options="cmOptions"
        >
        </codemirror>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="info.content"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button">
          <el-button type="primary" @click="saveCase(info, true)"
            >保存</el-button
          >
        </div>
        <div class="button">
          <el-button type="warning" v-if="info.caseId != null" @click="deleteCase">删除</el-button>
        </div>
        <div class="button">
          <el-tag type="success">启用</el-tag>
          <el-switch v-model="inUse" @change="enbaleTestCase"></el-switch>
        </div>
      </el-form-item>
      <el-form-item v-if="info.isError">
        <div class="debugInfo">
          <div v-for="item in info.debugInfoList">
            <div v-if="item != ''">{{ item }}</div>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";

// 我这里引入的是js语言文件
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/javascript/javascript.js";

// 编辑的主题文件
import "codemirror/theme/dracula.css";
//编辑器代码高亮css文件
import "codemirror/addon/hint/show-hint.css";
//代码折叠文件
require("codemirror/addon/fold/foldcode.js");
require("codemirror/addon/fold/foldgutter.js");
require("codemirror/addon/edit/matchbrackets.js");
require("codemirror/addon/fold/brace-fold.js");
//选中行高亮文件
require("codemirror/addon/selection/active-line.js");
//缩进文件
require("codemirror/addon/fold/indent-fold.js");
//代码只能提示
require("codemirror/addon/hint/show-hint.js");
require("codemirror/addon/hint/anyword-hint.js");
//addon文件夹放的是Code Mirror的功能插件
require("codemirror/addon/fold/comment-fold.js");
require("codemirror/mode/clike/clike.js");

export default {
  data() {
    return {
      inUse: false,
      testCaseInfo: {
        title: "python 测试",
        caseId: "2323",
        inUse: true,
        language: "python",
        input: "1,2,3",
        content: "备注...",
        code: "python something def so是mething",
        createrId: "232",
      },
      cmOptions: {
        // 编辑器设置
        tabSize: 4, //tab大小
        mode: "text/x-java", //编辑器模式支持文件
        theme: "dracula", //编辑器主题
        lineNumbers: true, //编辑器行号
        line: true,
        dragDrop: true, //拖拽
        lineWrapping: true, //代码折叠
        matchBrackets: true, //括号匹配
        // autofocus: true,//自动聚焦
        indentWithTabs: true, //首行缩进
        smartIndent: true,
        extraKeys: { Ctrl: "autocomplete" }, //ctrl唤起智能提示
        // more codemirror options, 更多 codemirror 的高级配置...
        hintOptions: {
          tables: {
            users: ["name", "score", "birthDate"],
            countries: ["name", "population", "size"],
          },
        },
      },
    };
  },
  components: {
    codemirror,
  },
  props: {
    info: this.testCaseInfo, //testCaseInfo是默认值，vue组件的传参
  },
  created() {
    this.inUse = this.info.inUse;
  },
  methods: {
    deleteCase() {
      this.$store
        .dispatch("DeleteTestCase", this.info)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.$emit('flash'); //刷新该组件
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
    saveCase(testCaseInfo, sendMsg) {
      this.$store
        .dispatch("SaveTestCase", testCaseInfo)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            if(testCaseInfo.caseId === null){
              //如果id为空，则其实为新增Case，此时需要刷新，重新加载case列表
               this.$emit('flash'); //刷新该组件
            }
            if (sendMsg == true) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
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
    onSubmit() {
      console.log("submit!");
    },
    enbaleTestCase() {
      if (this.inUse === false) {
        this.info.state = "02";
        this.saveCase(this.info, false);
        this.$message({
          message: "取消启用成功",
          type: "success",
        });
        return;
      }
      var IsEnable = false;
      var debugInfo = "";
      this.info.isError = IsEnable;
      this.$store
        .dispatch("EnableTestCase", this.info)
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
            this.info.isError = true;
            this.info.debugInfo = "报错信息\n" + debugInfo;
            this.info.debugInfoList = this.info.debugInfo.split("\n");
            this.inUse = false; //假如运行失败，如何将inUse的值设为false
            this.$forceUpdate(); //强制刷新该组件
          }
        });
    },
  },
};
</script>

<style>
.testCaseItem {
  padding: auto;
  border: 10px solid rgb(175, 202, 191);
}
.code-mirror {
  text-align: left;
  font-size: 20px;
  border: 10px solid white;
}
.button {
  display: inline-block;
  margin-inline: 50px;
}
.debugInfo {
  font-size: 16px;
  border: 1px solid rgb(36, 26, 175);
  color: red;
}
</style>