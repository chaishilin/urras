import Vue from "vue";
import Vuex from "vuex"
import user from '@/store/modules/user'
import program from '@/store/modules/program'
import programTemplate from '@/store/modules/programTemplate'
import testCase from '@/store/modules/testCase'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,//使用user.js 中的action
        program,
        programTemplate,
        testCase,
    }
})

export default store