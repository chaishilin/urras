import Vue from "vue";
import Vuex from "vuex"
import user from '@/store/modules/user'
import program from '@/store/modules/program'
import programTemplate from '@/store/modules/programTemplate'
import dataType from '@/store/modules/dataType'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,//使用user.js 中的action
        program,
        programTemplate,
        dataType,
    }
})

export default store