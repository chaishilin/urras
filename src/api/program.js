import request from '@/utils/request'
export function doProgram(params) {
    //远程运行程序接口
    return request({
        url: '/doRemoteProgram',
        method: 'post',
        data: params
    })
}
export function saveProgram(params) {
    //远程运行程序接口
    return request({
        url: '/saveProgram',
        method: 'post',
        data: params
    })
}