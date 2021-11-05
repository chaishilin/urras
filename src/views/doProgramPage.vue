<template>
  <div class="doProgram">
    <AppHeader></AppHeader>
    <div class="left-box">
      <div>
        <span>接口标题</span>
        <el-input v-model="programInfo.title" placeholder="接口标题"></el-input>
      </div>
      <div>
        <quill-editor
          ref="myTextEditor"
          v-model="programInfo.content"
          :options="editorOption"
          style="height: 600px; margin-bottom: 10px"
        ></quill-editor>
      </div>
    </div>
    <div class="right-box">
      <span>接口输入</span>
      <el-input
        class="el-input"
        v-model="programInfo.input"
        placeholder="接口输入"
      ></el-input>
      <br />
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
      <el-button type="primary" @click="runCode" v-loading="getOutput"
        >运行</el-button
      >
      <el-button type="primary" @click="saveCode" v-loading="getSave"
        >保存</el-button
      ><el-button type="primary" @click="programList"
        >返回</el-button
      ><el-button type="primary" @click="deleteProgram"
        >删除</el-button
      >
      <br />
      <div class="output">
        <div v-if="getOutput">正在获得运行结果...</div>
        <div v-for="item in programInfo.outputList">
          <div v-if="item != ''">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import AppHeader from "@/components/appHeader.vue";

// 我这里引入的是js语言文件
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/javascript/javascript.js";

// 编辑的主题文件
import "codemirror/theme/dracula.css";
//编辑器代码高亮css文件
import "codemirror/addon/hint/show-hint.css";
import appHeader from '../components/appHeader.vue';
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
      getSave: false,
      editorOption: {},
      programInfo: {
        language: "java",
        code: "public int yourFunction(int a,int b){\n        //示例：求数字区间[a,b]的和\n        int sum = 0;\n        for(int i = a;i<=b;i++){\n            sum += i;\n        }\n        return sum;\n    }\n",
        createrId: localStorage.getItem("userid"),
        title: "这是个模板",
        content: "输入接口描述...",
        state: "",
        publicState: "",
        input: "1 10",
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
  components: {
    codemirror,
    AppHeader,
  },
  mounted() {
    if (this.$route.query.hasOwnProperty("programId")) {
      //console.log(this.$route.query.programId);
      let newProgramInfo = {
        programId: this.$route.query.programId,
        createrId:localStorage.getItem("userId"),
      };
      this.$store
        .dispatch("ProgramList", newProgramInfo)
        .then((result) => {
          let status = result.data.code;
          //console.log(result.data);
          if (status == 200) {
            if (result.data.data.length != 0) {
              this.programInfo = result.data.data[0];
            }
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
    }
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

    saveCode() {
      this.getSave = true;
      this.programInfo.outputList = [];
      this.$store
        .dispatch("SaveProgram", this.programInfo)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
          } else {
            this.$message.error("调用失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {
          this.getSave = false;
        });
    },

    programList() {
      this.$router.push({
        path: "/programListPage",
      });
    },
    deleteProgram() {
      this.getSave = true;
      this.programInfo.outputList = [];
      this.$store
        .dispatch("DeleteProgram", this.programInfo.programId)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.programList();
          } else {
            this.$message.error("删除失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {
          this.getSave = false;
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
  font-size: 15px;
  border: 10px solid white;
}
.el-radio-group {
  width: 30%;
  border: 10px solid white;
}
.el-radio /deep/ .el-radio__label {
  font-size: 15px !important;
}
.el-button {
  border: 10px solid white;
}
.left-box,
.right-box {
  position: absolute;
  width: 45%;
  height: 100%;
}
.left-box {
  background: white;
  border: 10px solid white;
}
.right-box {
  background: white;
  border: 10px solid white;

  left: 50%;
}
</style>
