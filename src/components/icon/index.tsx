import React from 'react'
import * as Icons from '@ant-design/icons'

interface IProps {
    style?: any;
    name: string;
}

const Icon = (props: IProps) => {
    return React.createElement(
        // @ts-ignore
        Icons[props.name],
        {
            style: {...props.style}
        }
    )
}

export default Icon