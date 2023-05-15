import React from 'react';
import {NavLink} from "react-router-dom";
import HeaderProfile from "../../features/auth/HeaderProfile.jsx";

const Header = () => {
    return (
        <header className={'flex py-2 px-80 justify-between items-center bg-indigo-700 mb-4'}>
            <img src="https://cryptologos.cc/logos/aave-aave-logo.png" alt="logo" className={'w-14 h-auto'}/>
            <div className={'flex'}>
                {[
                    ['Profile', '/profile'],
                    ['Users', '/users'],
                    ['Messages', '/dialogs'],
                    ['News', '/news'],
                ].map(([title, url]) => (
                    <NavLink to={url} className={(navData) => (navData.isActive ? 'mr-20 text-white ease-linear duration-200' :
                        'mr-20 text-slate-300 ease-linear duration-200 hover:scale-110 hover:text-white')}
                    >
                        <p className={'font-medium text-base tracking-wide leading-7'}>{title}</p>
                    </NavLink>
                ))}
                <HeaderProfile />
            </div>
        </header>
    );
};

export default Header;