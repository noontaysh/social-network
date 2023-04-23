import React from 'react';
import {NavLink} from "react-router-dom";
import './Header.scss'
import HeaderProfile from "../../features/auth/HeaderProfile.jsx";

const Header = () => {
    return (
        <header>
            <img src="https://cryptologos.cc/logos/aave-aave-logo.png" alt=""/>
            <div className={'header__content'}>
                <NavLink to={'/profile'} className={(navData) => (navData.isActive ? 'link__active' : '')}>
                    <p>Profile</p>
                </NavLink>
                <NavLink to={'/users'} className={(navData) => (navData.isActive ? 'link__active' : '')}>
                    <p>Users</p>
                </NavLink>
                <NavLink to={'/dialogs'} className={(navData) => (navData.isActive ? 'link__active' : '')}>
                    <p>Messages</p>
                </NavLink>
                <NavLink to={'/news'} className={(navData) => (navData.isActive ? 'link__active' : '')}>
                    <p>News</p>
                </NavLink>
                <HeaderProfile />
            </div>
        </header>
    );
};

export default Header;