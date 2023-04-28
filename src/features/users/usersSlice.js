import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersAPI} from "../../api/api.js";
import {act} from "react-dom/test-utils";
import axios from "axios";
import {updateArrayObject} from "../../utilities/objectHelpers.js";

const initialState = {
    users: [],
    status: 'idle',
    error: null,
    totalCount: 0,
    pageSize: 6,
    isFollowing: false
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', /**
 @param data {object}
 @param thunkAPI {object}
 @param signal {object}
 */
async (data, {signal, thunkAPI}) => {
    try {
        const {currentPage, pageSize} = data
        const source = axios.CancelToken.source()
        signal.addEventListener('abort', () => {
            source.cancel()
        })
        return await usersAPI.getUsers(currentPage, pageSize, {
            cancelToken: source.token
        })
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
}
)

export const fetchFollow = createAsyncThunk('users/fetchFollow', /**
 @param userId {string}
 @param rejectWithValue {function}
 */
async (userId, {rejectWithValue}) => {
    try {
        const response = await usersAPI.followUser(userId)
        if (response.data.resultCode === 0) {
            return userId
        } else {
            return rejectWithValue(response.data.messages[0])
        }

    } catch (e) {
        return rejectWithValue(e)
    }
}
)

export const fetchUnFollow = createAsyncThunk('users/fetchUnFollow', /**
     @param userId {string}
     @param rejectWithValue {function}
     */
    async (userId, {rejectWithValue}) => {
        try {
            const response = await usersAPI.unFollowUser(userId)
            if (response.data.resultCode === 0) {
                return userId
            } else {
                return rejectWithValue(response.data.messages[0])
            }
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = 'pending'
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users = action.payload.items
            state.totalCount = action.payload.totalCount
            state.status = 'success'
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        [fetchFollow.pending]: (state, action) => {
            state.isFollowing = true
        },
        [fetchUnFollow.pending]: (state, action) => {
            state.isFollowing = true
        },
        [fetchFollow.fulfilled]: (state, action) => {
            state.isFollowing = false
            state.users = updateArrayObject(JSON.parse(JSON.stringify(state.users)), action.payload, 'id', {followed: true})
        },
        [fetchUnFollow.fulfilled]: (state, action) => {
            state.isFollowing = false
            state.users = updateArrayObject(JSON.parse(JSON.stringify(state.users)), action.payload, 'id', {followed: false})
        }
    }
})

export const getUsers = (state) => state.users.users
export const getUsersStatus = (state) => state.users.status
export const getUserError = (state) => state.users.error
export const getTotalCount = (state) => state.users.totalCount
export const getCurrentPage = (state) => state.users.currentPage
export const getPageSize = (state) => state.users.pageSize
export const getIsFollowing = (state) => state.users.isFollowing

export default usersSlice.reducer