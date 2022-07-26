import React, { useState } from 'react'
import { Form, Button, Input, Table, Popconfirm, message } from 'antd'
import ButtonSearch from '../../components/ButtonSearch'
import api from '../../api'
import { arrayToTree } from '../../utils/tools'
import { useAntdTable } from 'ahooks'
import { PageProps, SearchProps } from './interface'
import AddOrEditModal from './addOrEditModal'

const Mech = () => {
    const [form] = Form.useForm()
    const [mechList, setMechList] = useState()

    // 是否显示新增编辑弹窗
    const [isShowModal, setIsShowModal] = useState(false)

    // 获取表格数据
    const getTableData = ({ current, pageSize }: PageProps, searchForm: SearchProps) => {
        return api.getMechList(searchForm).then(result => {
            setMechList(arrayToTree(result.data))
            return ({
                total: 10000,
                list: arrayToTree(result.data)
            })
        })
    }

    // 配置动态表格
    const { tableProps, search } = useAntdTable(getTableData, {
        defaultPageSize: 10000,
        form,
    })

    // 搜索
    const { submit } = search

    // 删除部门
    const deleteMech = (id: string) => {
        api.deleteMech({id}).then(() => {
            message.success('删除成功')
        })
    }

    return <>
        {/* 创建编辑弹窗 */}
        <AddOrEditModal
            title="新增部门"
            visible={isShowModal}
            mechList={mechList}
            onCancel={() => setIsShowModal(false)}
        >
        </AddOrEditModal>

        {/* 顶部搜索栏 */}
        <ButtonSearch
            leftButton={(
                <Button type='primary' onClick={() => setIsShowModal(true)}>新增部门</Button>
            )}
            rightButton={(
                <>
                    <Form form={form} layout="inline">
                        <Form.Item
                            name="mechName"
                        >
                            <Input placeholder='请输入部门名称' />
                        </Form.Item>
                    </Form>
                    <Button type='ghost'
                        onClick={submit}
                    >搜索</Button>
                </>
            )}
            seniorForm={(
                <Form form={form} layout="inline">
                    <Form.Item
                        label="部门名称"
                        name="mechName"
                    >
                        <Input placeholder='请输入部门' />
                    </Form.Item>
                    <Form.Item
                        label="部门编码"
                        name="mechCode"
                    >
                        <Input placeholder='请输入部门编码' />
                    </Form.Item>
                    <Form.Item
                        label="部门电话"
                        name="mechPhone"
                    >
                        <Input placeholder='请输入部门电话' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' onClick={submit}>搜索</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type='ghost' onClick={() => {
                            form.resetFields()
                        }}>清空筛选条件</Button>
                    </Form.Item>
                </Form>
            )}
        ></ButtonSearch>
        {/* 表格部分 */}
        <Table
            columns={[
                {
                    title: '部门名称',
                    dataIndex: 'name',
                    align: 'left',
                    width: 60
                },
                {
                    title: '部门编码',
                    dataIndex: 'code',
                    align: 'center',
                    width: 40
                },
                {
                    title: '部门电话',
                    dataIndex: 'phone',
                    align: 'center',
                    width: 40
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 40,
                    render: (text, obj) => (
                        <>
                            <Button type='primary'>编辑</Button>
                            <Popconfirm
                                title="您确定要删除该部门吗？"
                                cancelText="取消"
                                okText="确定"
                                onConfirm={() => deleteMech(obj.id)}
                            >
                                <Button type='primary' danger style={{ marginLeft: 15 }}>删除</Button>
                            </Popconfirm>
                        </>
                    )
                }
            ]}
            bordered
            style={{ marginTop: 25 }}
            rowKey='id'
            {...tableProps}
            pagination={false}
            defaultExpandAllRows
        />
    </>
}

export default Mech
