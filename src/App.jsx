import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Profile from "./features/profile/Profile.jsx";
import Header from "./components/header/Header.jsx";
import './common/Container.scss'

function App() {
    return (
        <div className="App container">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={'/profile/:userId'} element={
                        <Profile/>
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
