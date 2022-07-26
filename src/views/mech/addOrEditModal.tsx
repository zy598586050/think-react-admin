import React from 'react'
import { Button, Form, Modal, Cascader, Input } from 'antd'
import { ModalProps } from './interface'

const Index = (props: ModalProps) => {
    const { title, visible, onCancel, mechList } = props
    const [form] = Form.useForm()
    // 提交
    const submit = () => {
        console.log(form.getFieldsValue())
    }
    return <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        footer={[
            <Button type='ghost' onClick={onCancel}>取消</Button>,
            <Button type='primary' onClick={submit}>确定</Button>
        ]}
        width={ 500 }
    >
        <Form form={form} layout="inline">
            <Form.Item
                label="上级部门"
                name="pid"
            >
                <Cascader
                    options={mechList}
                    expandTrigger="hover"
                    displayRender={(labels) => labels[labels.length - 1]}
                    placeholder="请选择上级部门"
                    changeOnSelect
                    fieldNames={{
                        label: 'name',
                        value: 'id'
                    }}
                    style={{ width: 150 }}
                />
            </Form.Item>
            <Form.Item
                label="部门名称"
                name="name"
            >
                <Input placeholder='请输入部门名称'/>
            </Form.Item>
            <Form.Item
                label="部门编码"
                name="code"
            >
                <Input placeholder='请输入部门编码'/>
            </Form.Item>
            <Form.Item
                label="部门电话"
                name="phone"
            >
                <Input placeholder='请输入部门电话'/>
            </Form.Item>
        </Form>
    </Modal>
}

export default Index
