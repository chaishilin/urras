<template>
  <div class="doProgram">
    <el-input
      class="el-input"
      v-model="programInfo.input"
      placeholder="接口输入"
    ></el-input>
    <el-radio-group v-model="programInfo.language">
      <el-radio label="java">java</el-radio>
      <el-radio label="python">python</el-radio>
      <el-radio label="golang">golang</el-radio>
    </el-radio-group>
    <codemirror
      class="code-mirror"
      v-model:value="programInfo.code"
      :options="cmOptions"
    >
    </codemirror>

    <br />
    <el-button type="primary" @click="runCode" v-loading="getOutput"
      >运行</el-button
    >
    <br />
    <div class="output">
      <div v-if="getOutput">正在获得运行结果...</div>
      <div v-for="item in programInfo.outputList">
        <div v-if="item != ''">{{ item }}</div>
      </div>
    </div>
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
      getOutput: false,
      programInfo: {
        input: "",
        code: 'public int yourFunction(int a,int b){\n        //示例：求数字区间[a,b]的和\n        int sum = 0;\n        for(int i = a;i<=b;i++){\n            sum += i;\n        }\n        return sum;\n    }\n',
        language: "java",
        output: "",
        outputList: [],
      },
      info: "",
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
  component: {
    codemirror,
  },
  methods: {
    runCode() {
      this.getOutput = true;
      this.programInfo.outputList = [];
      this.$store
        .dispatch("DoProgram", this.programInfo)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: "调用成功",
              type: "success",
            });
            this.programInfo.output = result.data.data.result;
            this.programInfo.outputList = this.programInfo.output.split("\n");
          } else {
            this.$message.error("调用失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {
          this.getOutput = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
.msg {
  color: tan;
}
.output {
  color: #2d7091;
  background: #ebf7fd;
  font-size: 20px;
  text-align: center;
}
.code-mirror {
  text-align: left;
  font-size: 20px;
  border: 10px solid white;
}

.el-input {
  width: 30%;
  font-size: 20px;
  border: 10px solid white;
}
.el-radio-group {
  width: 30%;
  border: 10px solid white;
}
.el-radio /deep/ .el-radio__label {
  font-size: 25px !important;
}
.el-button {
  border: 10px solid white;
}
</style>
