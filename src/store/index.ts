import { configureStore } from '@reduxjs/toolkit'
import App from './module/app'
import User from './module/user'

export default configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        app: App,
        user: User
    }
})