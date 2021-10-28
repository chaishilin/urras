import { login } from "../../api/login"

const user = {
    actions: {
        //登录
        Login({ commit }, userInfo) {//定义Login方法，在组件中使用this.$store.dispatch("Login")调用
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                //封装一个promise
                login(username, userInfo.password).then((responce) => {
                    commit('')//提交一个mutation，通知状态改变
                    resolve(responce)//将结果封装进resolve
                }).catch((err) => {
                    reject(err)
                });
            })
        },
    }
}
export default user