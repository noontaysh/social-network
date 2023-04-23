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
     @param rejectWithValue {function}
     @param dispatch {function}
     */
    async (data, {dispatch, rejectWithValue}) => {
        try {
            const {email, password, rememberMe, captcha = null} = data
            const response = await authAPI.login(email, password, rememberMe, captcha)
            //12789121278912+
            if (response.data.resultCode === 0) {
                dispatch(getAuthenticated())
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(fetchCaptcha())
                }

                return rejectWithValue(response.data.messages[0])
            }
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const getAuthenticated = createAsyncThunk('auth/getAuthenticated', /**
     @param thunkAPI {object}
     @param _ {undefined}
     */
    async (_, {rejectWithValue}) => {
        try {
            const response = await authAPI.getAuth()
            if (response.data.resultCode === 0) {
                return response.data.data
            } else {
                return rejectWithValue(response.data.messages[0])
            }
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const getLoggedOut = createAsyncThunk('auth/getLoggedOut', /**
     @param rejectWithValue {function}
     @param _ {undefined}
     */
    async (_, {rejectWithValue}) => {
        try {
            const response = await authAPI.logOut()
            return response.data.resultCode === 0 ? response.data.data : rejectWithValue(response.data.messages[0])
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const fetchCaptcha = createAsyncThunk('auth/fetchCaptcha', /**
 @param rejectWithValue {function}
 @param _ {undefined}
 */
async(_, {rejectWithValue}) => {
        try {
            return await authAPI.getCaptchaUrl()
        } catch (e) {
            rejectWithValue(e)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [getAuthenticated.pending]: (state, action) => {
            state.status = 'pending'
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
        },
        [getLogged.rejected]: (state, action) => {
            state.error = action.payload
        },
        [getLoggedOut.fulfilled]: (state, action) => {
            state.userId = null
            state.login = null
            state.email = null
            state.isAuth = false
            state.error = null
            state.captchaUrl = null
        },
        [fetchCaptcha.fulfilled]: (state, action) => {
            state.captchaUrl = action.payload
        }
    }
})

export const getAuthStatus = (state) => state.auth.isAuth
export const getCustomerId = (state) => state.auth.userId
export const getAuthenticationError = (state) => state.auth.error
export const getCaptchaUrl = (state) => state.auth.captchaUrl
export const getUserLogin = (state) => state.auth.login

export default authSlice.reducer