import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchFollow, fetchUnFollow, getIsFollowing} from "./usersSlice.js";

const UsersExcerpt = (props) => {
    const dispatch = useDispatch()

    const isFollowing = useSelector(getIsFollowing)

    return (
        <div className={'w-2/12 m-4 overflow-hidden break-words cursor-pointer border-2 rounded-md shadow-lg text-center'}>
        <NavLink className={''} to={`/profile/${props.id}`} >
            <img className={'w-full h-auto object-cover object-center'} src={props.photos.large || 'https://www.w3schools.com/howto/img_avatar.png'} alt="user-photo"/>
            <div className={'p-4'}>
                <h3 className={'text-xl font-medium leading-8 text-white'}>{props.name}</h3>
                <p>{props.status !== null && props.status.length >= 25 ? `${props.status.substring(0, 25)}...` : props.status}</p>
            </div>

        </NavLink>
            {props.followed ? <button className={'mb-4 p-2 px-4 bg-cyan-700 rounded-lg ease-linear duration-200 hover:opacity-70'} disabled={isFollowing} onClick={() => dispatch(fetchUnFollow(props.id))}>Unfollow</button> :
                <button className={'mb-4 p-2 px-4 bg-cyan-700 rounded-lg ease-linear duration-200 hover:opacity-70'} disabled={isFollowing} onClick={() => dispatch(fetchFollow(props.id))} >Follow</button>}
        </div>
    );
};

export default UsersExcerpt;