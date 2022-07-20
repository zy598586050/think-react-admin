import request from "../../utils/request";

export interface loginParams {
    account: string;
    password: string;
}

export interface resetParams {
    id: string;
    password: string;
}

export interface getUserByMechParams {
    mech_id: string;
    current: string;
    size: string;
}

export interface createOrEditUserParams {
    name: string;
    account: string;
    mech_id: string;
    role_id: string;
    id?: string;
}

export interface deleteUserParams {
    id: string;
}

export default {
    // 登录
    login(params: loginParams){
        return request({
            url: '/login',
            method: 'post',
            data: params,
        })
    },
    // 修改密码
    reset(params: resetParams){
        return request({
            url: '/reset',
            method: 'post',
            data: params,
        })
    },
    // 获取用户菜单和权限列表
    getMenuAuth(params = {}){
        return request({
            url: '/get_menu_auth',
            method: 'post',
            data: params,
        })
    },
    // 根据部门查用户列表
    getUserByMech(params: getUserByMechParams){
        return request({
            url: '/get_user_by_mech',
            method: 'post',
            data: params,
        })
    },
    // 新增或编辑用户
    createOrEditUser(params: createOrEditUserParams){
        return request({
            url: '/user_create_or_edit',
            method: 'post',
            data: params,
        })
    },
    // 删除用户
    deleteUser(params: deleteUserParams){
        return request({
            url: '/user_delete',
            method: 'post',
            data: params,
        })
    }
}