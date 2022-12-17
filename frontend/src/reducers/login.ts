import { createSlice } from '@reduxjs/toolkit'

export interface LoginState {
    logged: boolean,
    isLoading: boolean,
    data: {
        id: number,
        is_staff: boolean,
        first_name: string,
        last_name: string,
        email: string,
        points: number,
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
        is_staff: false,
        first_name: '',
        last_name: '',
        email: '',
        points: 0,
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
        },
        addPoints: (state, action) => {
            state.data.points += action.payload
        },
        purchase: state => {
            state.data.points = state.data.points - 1
        }
    }
})

export const { login, logout, purchase, addPoints } = loginSlice.actions

export default loginSlice.reducer