import React from 'react';
import './UsersExcerpt.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchFollow, fetchUnFollow, getIsFollowing} from "./usersSlice.js";

const UsersExcerpt = (props) => {
    const dispatch = useDispatch()

    const isFollowing = useSelector(getIsFollowing)

    return (
        <>
        <NavLink to={`/profile/${props.id}`} className={'users-excerpt'}>
            <img src={props.photos.large || 'https://www.w3schools.com/howto/img_avatar.png'} alt="user-photo"/>
            <div className={'users-excerpt__content'}>
                <h3>{props.name}</h3>
                <p>{props.status !== null && props.status.length >= 25 ? `${props.status.substring(0, 25)}...` : props.status}</p>
            </div>

        </NavLink>
            {props.followed ? <button disabled={isFollowing} onClick={() => dispatch(fetchUnFollow(props.id))}>Unfollow</button> :
                <button disabled={isFollowing} onClick={() => dispatch(fetchFollow(props.id))} >Follow</button>}
        </>
    );
};

export default UsersExcerpt;