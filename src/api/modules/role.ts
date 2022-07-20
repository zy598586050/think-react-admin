import request from "../../utils/request";

export interface createOrEditRoleParams {
    name: string;
    remarks: string;
    auth_ids: string;
    id?: string;
}

export interface deleteRoleParams {
    id: string;
}

export default {
    // 获取角色列表
    getRoleList(params = {}){
        return request({
            url: '/role_list',
            method: 'post',
            data: params,
        })
    },
    // 新增/编辑角色
    createOrEditRole(params: createOrEditRoleParams){
        return request({
            url: '/role_create_or_edit',
            method: 'post',
            data: params,
        })
    },
    // 删除角色
    deleteRole(params: deleteRoleParams){
        return request({
            url: '/role_delete',
            method: 'post',
            data: params,
        })
    }
}