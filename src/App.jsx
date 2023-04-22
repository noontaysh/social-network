import './App.scss'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Profile from "./features/profile/Profile.jsx";
import Header from "./components/header/Header.jsx";
import './common/Container.scss'
import Users from "./features/users/Users.jsx";
import LoginForm from "./features/auth/LoginForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAuthenticated, getAuthStatus} from "./features/auth/authSlice.js";

function App() {
    const dispatch= useDispatch()

    const isAuth = useSelector(getAuthStatus)

    useEffect(() => {
        dispatch(getAuthenticated())
    }, [])

    return (
        <div className="App container">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={'/profile/:userId'} element={ isAuth ?
                        <Profile/> : <Navigate to={`/auth`} />
                    }/>
                    <Route path={'/profile'} element={isAuth ? <Profile/> : <Navigate to={`/auth`}/>}/>
                    <Route path={'/users'} element={isAuth ? <Users/> : <Navigate to={`/auth`}/>}/>
                    <Route path={'/auth'} element={ isAuth ? <Navigate to={'/profile'} /> :
                        <LoginForm/>
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
