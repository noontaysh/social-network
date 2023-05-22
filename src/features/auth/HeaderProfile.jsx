import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAuthStatus, getCustomerId, getLoggedOut, getUserLogin} from "./authSlice.js";

const HeaderProfile = () => {
    const dispatch = useDispatch()

    const login = useSelector(getUserLogin)
    const isAuth = useSelector(getAuthStatus)
    const userId = useSelector(getCustomerId)

    const signOut = () => {
        dispatch(getLoggedOut())
    }

    return (
        <div className={'flex justify-between'}>
            <div className={'pr-1'}>
                <div className={'text-base'}>{login}</div>
                <img src="" alt=""/>
            </div>
            
            {isAuth && <button onClick={signOut} className={'text-sm tracking-wide px-1 py-1 bg-rose-700 rounded-sm uppercase rotate-[270deg] hover:rotate-0 ease-in-out duration-300'}>sign out</button>}
        </div>
    );
};

export default HeaderProfile;