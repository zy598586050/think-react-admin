import React, { useEffect, useState } from 'react'
import { Layout, Dropdown, Menu, Modal, Input, Button, Form, Breadcrumb } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { openOrClose } from '../../store/module/app'
import { setUserInfo } from '../../store/module/user'
import './index.scss'

interface IBC {
    name: string;
    path: string;
    type: number;
}

const Header = () => {
    const [form1] = Form.useForm()
    const app = useSelector((state: any) => state.app)
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [isShowEditPass, setIsShowEditPass] = useState<boolean>(false)
    const [breadCrumb, setBreadCrumb] = useState<IBC[]>([])
    // 折叠菜单
    const toggle = () => {
        dispatch(openOrClose(!app.collapsed))
    }
    // 关闭修改密码弹窗
    const closePass = () => {
        setIsShowEditPass(false)
        form1.setFieldsValue({
            resetText: ''
        })
    }
    // 修改密码提交
    const resetSubmit = () => {
        form1.validateFields().then(result => {
            console.log(result)
            closePass()
        })
    }
    // 退出登录
    const logout = () => {
        dispatch(setUserInfo({
            name: '',
            avatar: '',
            token: '',
            auth_array: '',
            menu_tree: ''
        }))
        navigate('/login')
    }
    // 动态递归获取面包屑
    const getBreadCrumb = () => {
        const bcArr = location.pathname.split('/')
        const arr: IBC[] = []
        const deep = (item: any) => {
            item.forEach((v: any) => {
                if (bcArr.indexOf(v.name) >= 0) {
                    arr.push({
                        name: v.meta.title,
                        path: v.path,
                        type: v.type,
                    })
                }
                if (v.children && v.children.length > 0) {
                    deep(v.children)
                }
            })
        }
        deep(user.menu_tree)
        setBreadCrumb(arr)
    }
    // 监听路由变化
    useEffect(() => {
        getBreadCrumb()
    }, [location])
    return <Layout.Header className='header'>
        <Modal
            title='重置密码'
            visible={isShowEditPass}
            onCancel={closePass}
            footer={<>
                <Button type='ghost' onClick={closePass}>取消</Button>
                <Button type='primary' onClick={resetSubmit}>确定</Button>
            </>}
        >
            <Form form={form1}>
                <Form.Item
                    name='resetText'
                    rules={[
                        { required: true, message: '密码不能为空' },
                        { validator: (rule, value, fn) => {
                            if (/^[\w_\.\-]{1,18}$/.test(value)) {
                                fn()
                            } else {
                                fn('密码格式不正确')
                            }
                        } }
                    ]}
                >
                    <Input placeholder='请输入新密码' />
                </Form.Item>
            </Form>
        </Modal>
        <div className='header-left'>
            { app.collapsed ? <MenuUnfoldOutlined onClick={toggle} className='trigger'/> :
            <MenuFoldOutlined onClick={toggle} className='trigger'/> }
            {/* 面包屑 */}
            <Breadcrumb className='breadcrumb'>
                <Breadcrumb.Item className='item'>首页</Breadcrumb.Item>
                {
                    breadCrumb.map((item, index) => (
                        <Breadcrumb.Item key={index} className='item'>{item.name}</Breadcrumb.Item>
                    ))
                }
            </Breadcrumb>
        </div>
        <div>
            <Dropdown overlay={
                <Menu items={[
                    {
                        key: 1,
                        label: <div onClick={() => setIsShowEditPass(true)}>修改密码</div>
                    },
                    {
                        key: 2,
                        label: <div onClick={() => {
                            Modal.confirm({
                                title: '您确定要退出登录？',
                                closable: true,
                                okText: '确定',
                                cancelText: '取消',
                                onOk: () => logout()
                            })
                        }}>退出登录</div>
                    }
                ]}/>
            } placement='bottom'>
                <div className="nav-right-box">
                    <img className="avatar" src={user.avatar}/>
                    <span className="user-name">{user.name}</span>
                </div>
            </Dropdown>
        </div>
    </Layout.Header>
}

export default Header