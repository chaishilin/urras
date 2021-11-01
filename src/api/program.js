import request from '@/utils/request'
export function doProgram(input,code,language) {
    //远程运行程序接口
    return request({
        url: '/doRemoteProgram',
        method: 'post',
        data: {
            input,
            code,
            language
        }
    })
}