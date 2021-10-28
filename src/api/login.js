import request from '@/utils/request'
export function login(username, password) {
    //登录接口
    return request({
        url: '/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

