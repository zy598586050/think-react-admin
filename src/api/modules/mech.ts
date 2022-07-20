import request from "../../utils/request";

export interface createOrEditMechParams {
    pid: string;
    name: string;
    code: string;
    phone: string;
    id?: string;
}

export interface deleteMechParams {
    id: string
}

export default {
    // 获取部门列表
    getMechList(params = {}){
        return request({
            url: '/mech_list',
            method: 'post',
            data: params,
        })
    },
    // 新增/编辑部门
    createOrEditMech(params: createOrEditMechParams){
        return request({
            url: '/mech_create_or_edit',
            method: 'post',
            data: params,
        })
    },
    // 删除部门
    deleteMech(params: deleteMechParams){
        return request({
            url: '/mech_delete',
            method: 'post',
            data: params,
        })
    }
}