import { doProgram,saveProgram,programList } from "../../api/program"

const program = {
    actions: {
        //远程运行程序
        DoProgram({ commit }, programInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                //doProgram(programInfo.input,programInfo.code,programInfo.language).then((responce) => {
                doProgram(programInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //保存程序
        SaveProgram({ commit }, programInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                //doProgram(programInfo.input,programInfo.code,programInfo.language).then((responce) => {
                saveProgram(programInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //获得程序列表
        ProgramList({ commit }, programInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                programList(programInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        }
    }
}
export default program