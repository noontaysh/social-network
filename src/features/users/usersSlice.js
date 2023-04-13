import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersAPI} from "../../api/api.js";
import {act} from "react-dom/test-utils";

const initialState = {
    users: [],
    status: 'idle',
    error: null,
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', /**
 @param data {object}
 @param thunkAPI {object}
 */
async (data, thunkAPI) => {
    const {currentPage, pageSize} = data
    try {
        return await usersAPI.getUsers(currentPage, pageSize)
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
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
        }
    }
})

export const getUsers = (state) => state.users.users
export const getUsersStatus = (state) => state.users.status
export const getUserError = (state) => state.users.error
export const getTotalCount = (state) => state.users.totalCount
export const getCurrentPage = (state) => state.users.currentPage

export default usersSlice.reducer