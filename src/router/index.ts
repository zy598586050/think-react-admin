import React from 'react'
import storage from '../utils/localStorage'
import api from '../api'

interface RouterMeta {
    title: string;
    icon?: string;
}

export interface IRoute {
    path: string;
    meta: RouterMeta;
    component?: any;
    isAuth?: boolean;
    children?: IRoute[];
    hidden?: boolean;
}

const router: IRoute[] = [
    {
        path: '/',
        meta: {
            title: '主应用'
        },
        component: React.lazy(() => import('../layout/index')),
        children: [
            {
                path: '/welcome',
                meta: {
                    title: '欢迎页'
                },
                hidden: true,
                component: React.lazy(() => import('../views/home/index'))
            },
            {
                path: '/404',
                meta: {
                    title: '404'
                },
                hidden: true,
                component: React.lazy(() => import('../views/home/404'))
            }
        ]
    },
    {
        path: 'login',
        meta: {
            title: '登录'
        },
        isAuth: false, // 代表不进行权限校验
        component: React.lazy(() => import('../views/login/index'))
    }
]

// 动态路由
const loadAsyncRoutes = async () => {
    const token = storage.getItem('token')
    if (token) {
        try {
            const result = await api.getMenuAuth()
            storage.setItem('auth_array', result.data.auth_array)
            storage.setItem('menu_tree', result.data.menu_tree)
            const getMenuAuth = result.data.menu_tree
            // 递归加载component
            const deep = (item: any) => {
                return item.map((v: any) => {
                    let url = `../views/${v.component ?? '../components/outlet'}`
                    const obj: any = {
                        path: v.path,
                        meta: v.meta,
                        component: React.lazy(() => import(/* @vite-ignore */url)),
                    }
                    if (v.children && v.children.length > 0) {
                        obj['children'] = deep(v.children)
                    }
                    return obj
                })
            }
            getMenuAuth && deep(getMenuAuth).forEach((v: any) => {
                router[0].children?.push(v)
            })
        } catch (error) {
            console.log(error)
        }
    }
}
await loadAsyncRoutes()

export default router