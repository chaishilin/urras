import {enableTestCase,updateTestCase,testCaseList,deleteTestCase} from "../../api/testCase"

const testCase = {
    actions: {
        //保存程序模板
        SaveTestCase({ commit }, testCaseInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                updateTestCase(testCaseInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //获得程序模板列表
        TestCaseList({ commit }, testCaseInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                testCaseList(testCaseInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //删除程序
        DeleteTestCase({ commit }, testCaseInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                deleteTestCase(testCaseInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        //测试程序模板
        EnableTestCase({ commit }, testCaseInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            return new Promise((resolve, reject) => {
                //封装一个promise
                enableTestCase(testCaseInfo).then((responce) => {
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        }
    }
}
export default testCase