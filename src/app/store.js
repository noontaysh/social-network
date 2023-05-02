import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice.js";
import usersReducer from "../features/users/usersSlice.js";
import authReducer from '../features/auth/authSlice.js'

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        users: usersReducer,
        auth: authReducer,
    },
})

window._store_ = store