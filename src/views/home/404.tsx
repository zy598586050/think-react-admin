import React from 'react'
import { useNavigate } from 'react-router-dom'
import i404 from '../../assets/images/404.png'
import cloud from '../../assets/images/404_cloud.png'
import './404.scss'

const Index = () => {
    const navigate = useNavigate()
    return <div className="wscn-http404-container">
        <div className="wscn-http404">
            <div className="pic-404">
                <img className="pic-404__parent" src={i404} alt="404"/>
                <img className="pic-404__child left" src={cloud} alt="404"/>
                <img className="pic-404__child mid" src={cloud}  alt="404"/>
                <img className="pic-404__child right" src={cloud}  alt="404"/>
            </div>
            <div className="bullshit">
                <div className="bullshit__oops">OOPS!</div>
                <div className="bullshit__info">All rights reserved
                    <a style={{color: '#20a0ff'}} href="http://www.think-js.cn" target="_blank">ThinkJS</a>
                </div>
                <div className="bullshit__headline">站长说进不去这个页面...</div>
                <div className="bullshit__info">请检查您输入的网址是否正确，或点击下方按钮返回首页。</div>
                <span className="bullshit__return-home" onClick={() => {
                    navigate('/')
                }}>回到首页</span>
            </div>
        </div>
    </div>
}

export default Index