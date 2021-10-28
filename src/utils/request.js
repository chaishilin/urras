import axios from "axios";
import baseUrl from '../api/baseUrl'
//baseUrl = "/"
//创建axios实例
const service = axios.create({
    baseURL:baseUrl,
    timeout:15000,
})

export default service