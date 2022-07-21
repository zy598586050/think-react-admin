import React, { useEffect, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Layout } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './header'
import Menu from './menu'
import './index.css'

const { Sider, Content } = Layout

const Index = () => {
    // 控制菜单折叠
    const app = useSelector((state: any) => state.app)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/welcome')
        }
    }, [location])
    return <Layout>
        {/* 左侧菜单 */}
        <Sider className='sider' trigger={null} collapsible collapsed={app.collapsed}>
            <div className='logo-title'>
                TRA
            </div>
            {/* 菜单栏 */}
            <Menu />
        </Sider>
        {/* 右侧内容 */}
        <Layout className='site-layout'>
            {/* 顶部导航 */}
            <Header />
            {/* 内容区 */}
            <Content className='site-layout-background'>
                <TransitionGroup>
                    <Outlet/>
                </TransitionGroup>
            </Content>
        </Layout>
    </Layout>
}

export default Index