import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice.js";
import usersReducer from "../features/users/usersSlice.js";

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        users: usersReducer,
    }
})

window._store_ = store