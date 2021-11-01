import Vue from "vue";
import Vuex from "vuex"
import user from '@/store/modules/user'
import program from '@/store/modules/program'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,//使用user.js 中的action
        program
    }
})

export default store