import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import {profileAPI} from "../../api/api.js";
import {act} from "react-dom/test-utils";

const initialState = {
    profileData: {},
    status: 'idle',
    error: null,
    userStatus: '',
}

export const fetchProfile = createAsyncThunk('profile/fetchProfile', /**
 @param userId {string}
 @param rejectWithValue {function}
 */
async (userId, {rejectWithValue}) => {
    try {
        return await profileAPI.getProfile(userId)
    } catch (e) {
        return rejectWithValue(e.message)
    }
})

export const fetchStatus = createAsyncThunk('profile/fetchStatus', /**
 @param userId {string}
 @param rejectWithValue {function}
 */
async (userId, {rejectWithValue}) => {
    try {
        return await profileAPI.getStatus(userId)
    } catch (e) {
        return rejectWithValue(e.message)
    }
})

export const postStatus = createAsyncThunk('profile/postStatus', /**
 @param status {string}
 @param rejectWithValue {function}
 */
async (status, {rejectWithValue}) => {
    try {
        return await profileAPI.postStatus(status)
    } catch (e) {
        return rejectWithValue(e.message)
    }
})

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProfile.pending]: (state, action) => {
            state.status = 'pending'
        },
        [fetchProfile.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        [fetchProfile.fulfilled]: (state, action) => {
            state.status = 'success'
            state.profileData = action.payload
        },
        [fetchStatus.pending]: (state, action) => {
            state.userStatus = ''
        },
        [fetchStatus.fulfilled]: (state, action) => {
            state.userStatus = action.payload
        },
        [fetchStatus.rejected]: (state, action) => {
            state.userStatus = action.payload
        },
    }
})


export const getProfileData = (state) => state.profile.profileData
export const getProfileStatus = (state) => state.profile.status
export const getProfileError = (state) => state.profile.error
export const getUserStatus = (state) => state.profile.userStatus

export default profileSlice.reducer