import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Profile from "./features/profile/Profile.jsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
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
