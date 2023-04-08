import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {profileAPI} from "../../api/api.js";

const initialState = {
    profileData: null,
    status: 'idle',
    error: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProfile.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'success'
                state.profileData = action.payload
            })
    }
})

export const fetchProfile = createAsyncThunk('profile/fetchProfile', /** @param userId {number} */ async(userId) => {
    try {
        return await profileAPI.getProfile(userId)
    } catch (e) {
        return e.message
    }
} )

export default profileSlice.reducer