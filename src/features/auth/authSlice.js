import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/api.js";

const initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    status: 'idle',
    error: null,
    captchaUrl: null
}

export const getLogged = createAsyncThunk('auth/getLogged', /**
     @param data {object}
     @param thunkAPI {object}
     @param dispatch {function}
     */
    async (data, {dispatch, thunkAPI}) => {
        try {
            const {email, password, rememberMe, captcha = null} = data
            const response = await authAPI.login(email, password, rememberMe, captcha)
            //12789121278912+
            if (response.data.resultCode === 0) {
                dispatch(getAuthenticated())
            }
            return response.data.messages
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getAuthenticated = createAsyncThunk('auth/getAuthenticated', /**
     @param thunkAPI {object}
     */
    async (thunkAPI) => {
        try {
            const response = await authAPI.getAuth()
            if(response.data.resultCode === 0) {
                return response.data.data
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [getAuthenticated.pending]: (state, action) => {
            state.status = 'idle'
        },
        [getAuthenticated.fulfilled]: (state, action) => {
            state.status = 'success'
            state.email = action.payload.email
            state.userId = action.payload.id
            state.login = action.payload.login
            state.isAuth = true
        },
        [getAuthenticated.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        [getLogged.fulfilled]: (state, action) => {
            state.error = action.payload
        }
    }
})

export const getAuthStatus = (state) => state.auth.isAuth
export const getCustomerId = (state) => state.auth.userId

export default authSlice.reducer