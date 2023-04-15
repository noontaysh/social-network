import React from 'react';
import './UsersExcerpt.scss'
import {NavLink} from "react-router-dom";

const UsersExcerpt = (props) => {
    return (
        <NavLink to={`/profile/${props.id}`} className={'users-excerpt'}>
            <img src={props.photos.large || 'https://www.w3schools.com/howto/img_avatar.png'} alt="user-photo"/>
            <div className={'users-excerpt__content'}>
                <h3>{props.name}</h3>
                <p>{props.status !== null && props.status.length >= 25 ? `${props.status.substring(0, 25)}...` : props.status}</p>
            </div>
        </NavLink>
    );
};

export default UsersExcerpt;