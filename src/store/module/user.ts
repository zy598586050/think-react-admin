import { createSlice } from '@reduxjs/toolkit'
import storage from '../../utils/localStorage'

const { actions, reducer: UserReducer } = createSlice({
    name: 'user',
    initialState: {
        name: storage.getItem('name') || '',
        avatar: storage.getItem('avatar') || '',
        token: storage.getItem('token') || '',
        auth_array: storage.getItem('auth_array') || '',
        menu_tree: storage.getItem('menu_tree') || ''
    },
    reducers: {
        setUserInfo(state, action) {
            state.name = action.payload.name
            state.avatar = action.payload.avatar
            state.token = action.payload.token
            state.auth_array = action.payload.auth_array
            state.menu_tree = action.payload.menu_tree
            storage.setItem('name', action.payload.name)
            storage.setItem('avatar', action.payload.avatar)
            storage.setItem('token', action.payload.token)
            storage.setItem('auth_array', action.payload.auth_array)
            storage.setItem('menu_tree', action.payload.menu_tree)
        },
    }
})

export const { setUserInfo } = actions
export default UserReducer