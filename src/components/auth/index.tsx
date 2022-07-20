import React, { ReactNode } from 'react'
import storage from '../../utils/localStorage'
import { Navigate } from 'react-router-dom'

interface Props {
    children: ReactNode
}

const Auth = ({ children }: Props) => {
    if (storage.getItem('token')) {
        return <>{children}</>
    } else {
        return <Navigate to='/login'/>
    }
}

export default Auth