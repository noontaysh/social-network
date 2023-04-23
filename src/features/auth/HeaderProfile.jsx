import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAuthStatus, getLoggedOut, getUserLogin} from "./authSlice.js";

const HeaderProfile = () => {
    const dispatch = useDispatch()

    const login = useSelector(getUserLogin)
    const isAuth = useSelector(getAuthStatus)

    const logOut = () => {
        dispatch(getLoggedOut())
    }

    return (
        <div>
            <div>{login}</div>
            {isAuth && <button onClick={logOut}>log out</button>}
        </div>
    );
};

export default HeaderProfile;