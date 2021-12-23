import request from '@/utils/request'

export function updateTestCase(params) {
    //更新模板测试案例接口
    return request({
        url: '/testCase/save',
        method: 'post',
        data: params
    })
}
export function testCaseList(params) {
    //查询模板测试案例列表
    return request({
        url: '/testCase/list',
        method: 'post',
        data: params
    })
}

export function deleteTestCase(params) {
    //删除模板测试案例
    return request({
        url: '/testCase/delete',
        method: 'post',
        data: params,
    })
}

export function enableTestCase(params) {
    //应用模板测试案例
    return request({
        url: '/testCase/enable',
        method: 'post',
        data: params,
    })
}
