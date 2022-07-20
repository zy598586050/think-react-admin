import axios from "axios"
import { message, Modal } from 'antd'
import config from "../config"
import storage from './localStorage'
import { setUserInfo } from '../store/module/user'
import store from '../store'

const service = axios.create({
    baseURL: config.baseUrl,
    timeout: 8000
})

// 请求拦截
service.interceptors.request.use(config => {
    const headers = config.headers
    const token = storage.getItem('token')
    // @ts-ignore
    if(!headers?.Authorization) headers['Authorization'] = `Bearer ${token}`
    return config
},error => {
    return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(response => {
    const data = response.data
    return data
},error => {
    if(error && error.response && error.response.data){
        if(error.response.data.errorCode === 30001){
            Modal.warning({
                title: 'Token已过期，请重新登录。',
                okText: '确定',
                onOk: () => {
                    store.dispatch(setUserInfo({
                        name: '',
                        avatar: '',
                        token: '',
                        auth_array: '',
                        menu_tree: ''
                    }))
                    location.replace('/login')
                }
            })
        }else{
            message.error(error.response.data.msg)
        }
    }
    return Promise.reject(error)
})

/**
 * 请求核心
 */
const request = (options: any) => {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    let customUrl = options.customUrl
    let isMock = config.mock;
    if (typeof options.mock != 'undefined') {
        isMock = options.mock;
    }
    if (config.env === 'production') {
        service.defaults.baseURL = config.baseUrl
    } else {
        service.defaults.baseURL = customUrl ? customUrl : (isMock ? config.mockUrl : config.baseUrl)
    }
    return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item: string) => {
    // @ts-ignore
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})

export default request