import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice.js";
import usersReducer from "../features/users/usersSlice.js";
import authReducer from '../features/auth/authSlice.js'
import newsReducer from '../features/news/newsSlice.js'

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        users: usersReducer,
        auth: authReducer,
        news: newsReducer,
    },
})

window._store_ = store