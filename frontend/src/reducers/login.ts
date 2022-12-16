import { createSlice } from '@reduxjs/toolkit'

export interface LoginState {
    logged: boolean,
    isLoading: boolean,
    data: {
        id: number,
        type: string,
        first_name: string,
        last_name: string,
        email: string,
        abilities: string[]
    },
    tokens: {
        access: string,
        refresh: string
    }
}

const initialState: LoginState = {
    logged: false,
    isLoading: true,
    data: {
        id: -1,
        type: '',
        first_name: '',
        last_name: '',
        email: '',
        abilities: []
    },
    tokens: {
        access: '',
        refresh: ''
    }
} 

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.logged = true
            state.data = action.payload.data
            state.tokens = action.payload.tokens
            state.isLoading = false
        },
        logout: state => {
            state.logged = false
            state.data = {
                ...initialState.data
            }
            state.tokens = {
                ...initialState.tokens
            }
            state.isLoading = false
        }
    }
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer