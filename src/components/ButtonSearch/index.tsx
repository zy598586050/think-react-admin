import React, { useState } from 'react'
import { Button, Card } from 'antd'
import './index.scss'

interface Iprops {
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
    seniorForm?: React.ReactNode;
}

const Index = (props: Iprops) => {
    const { leftButton, rightButton, seniorForm } = props
    const [isShowForm, setIsShowForm] = useState(false)
    return <>
        <div className='button-search-box'>
            <div className='button-search-left'>
                {leftButton || null}
            </div>
            <div className='button-search-right'>
                {
                    isShowForm ? null : <>
                        {rightButton || null}
                        <Button type='primary' style={{ marginLeft: 15 }} onClick={() => {
                            setIsShowForm(true)
                        }}>高级搜索</Button>
                    </>
                }
            </div>
        </div>
        {
            isShowForm ? <Card style={{
                marginTop: 20
            }}>
                <div className='senior-search-top'>
                    <div>高级搜索</div>
                    <Button type='link' onClick={() => {
                        setIsShowForm(false)
                    }}>收起</Button>
                </div>
                <div>
                    {seniorForm || null}
                </div>
            </Card> : null
        }
    </>
}

export default Index
