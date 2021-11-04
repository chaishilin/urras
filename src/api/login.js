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

export function logout() {
    //退出登录接口
    return request({
        url: '/logout',
        method: 'post'
    })
}

