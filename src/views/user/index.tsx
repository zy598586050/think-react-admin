import React from 'react'
import { Form, Button, Input } from 'antd'
import { useAntdTable } from 'ahooks'
import ButtonSearch from '../../components/ButtonSearch'

const User = () => {
    const [form] = Form.useForm()
    const onSearch = () => {
        console.log('搜索')
    }
    return <>
        <ButtonSearch
            leftButton={(
                <Button type='primary'>创建用户</Button>
            )}
            rightInput={(
                <Input placeholder='请输入部门名称'/>
            )}
            seniorForm={(
                <Form form={form} layout="inline">
                    <Form.Item></Form.Item>
                </Form>
            )}
            onSearch={onSearch}
        ></ButtonSearch>
    </>
}

export default User
