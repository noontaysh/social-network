import './App.scss'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Profile from "./features/profile/Profile.jsx";
import Header from "./components/header/Header.jsx";
import Users from "./features/users/Users.jsx";
import LoginForm from "./features/auth/LoginForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAuthenticated, getAuthStatus} from "./features/auth/authSlice.js";
import News from "./features/news/News.jsx";

function App() {
    const dispatch= useDispatch()

    const isAuth = useSelector(getAuthStatus)

    useEffect(() => {
        dispatch(getAuthenticated())
    }, [])

    return (
        <div className={'bg-indigo-400 h-screen'}>
            <BrowserRouter>
                <Header/>
                <div className="w-full max-w-7xl overflow-hidden mx-auto my-0 px-4">
                <Routes>
                    <Route path={'/profile/:userId'} element={ isAuth ?
                        <Profile/> : <Navigate to={`/auth`} />
                    }/>
                    <Route path={'/profile'} element={isAuth ? <Profile/> : <Navigate to={`/auth`}/>}/>
                    <Route path={'/users'} element={isAuth ? <Users/> : <Navigate to={`/auth`}/>}/>
                    <Route path={'/auth'} element={ isAuth ? <Navigate to={'/profile'} /> : <LoginForm/>}/>
                    <Route path={'/news'} element={<News />} />
                </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
