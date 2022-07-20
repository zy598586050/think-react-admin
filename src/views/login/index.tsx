import React from 'react'
import { Button, Card, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../store/module/user'
import api from '../../api'
import './index.scss'

const Login = () => {
    const dispatch = useDispatch()
    // 登录
    const onSubmit = (event: any) => {
        api.login(event).then(result => {
            console.log(result)
            const { data } = result
            dispatch(setUserInfo({
                name: data.name,
                avatar: data.avatar,
                token: data.token,
                auth_array: data.auth_array,
                menu_tree: data.menu_tree
            }))
            window.location.replace('/welcome')
        })
    }

    return <div className='page-box'>
        <Card className="form-card">
            <h1 className='title'>Think-React-Admin</h1>
            <Form
                onFinish={onSubmit}
            >
                <Form.Item
                    name="account"
                    rules={[{required: true, message: '请输入用户名'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: '请输入密码'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Button className='login-btn' type='primary' htmlType='submit'>登录</Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
}

export default Login