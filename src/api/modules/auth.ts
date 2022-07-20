import request from "../../utils/request"

export interface deleteAuthParams {
    id: number;
}

export interface createOrEditAuthParams {
    type: number;
    pid: string;
    name: string;
    icon: string;
    auth_name: string;
    router_name: string;
    router_url: string;
    component_url: string;
    sort: string;
    id?: string;
}

export default {
    // 获取权限列表
    getAuthList(params = {}){
        return request({
            url: '/auth_list',
            method: 'post',
            data: params,
        })
    },
    // 新增/编辑权限
    createOrEditAuth(params: createOrEditAuthParams){
        return request({
            url: '/auth_create_or_edit',
            method: 'post',
            data: params,
        })
    },
    // 删除权限
    deleteAuth(params: deleteAuthParams){
        return request({
            url: '/auth_delete',
            method: 'post',
            data: params,
        })
    }
}