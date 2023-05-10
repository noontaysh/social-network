import React, {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {
    fetchProfile,
    fetchStatus,
    getProfileData,
    getProfileError,
    getProfileStatus,
    getUserStatus
} from "./profileSlice.js";
import ProfileExcerpt from "./ProfileExcerpt.jsx";
import {getCustomerId} from "../auth/authSlice.js";

const Profile = () => {
    const dispatch = useDispatch()
    const {userId} = useParams()

    const [content, setContent] = useState(<p></p>)

    const data = useSelector(getProfileData, shallowEqual)
    const status = useSelector(getProfileStatus)
    const error = useSelector(getProfileError)
    const userStatus = useSelector(getUserStatus)
    const customerId = useSelector(getCustomerId)

    useEffect(() => {
        dispatch(fetchProfile(userId || customerId))
        dispatch(fetchStatus(userId || customerId))
    }, [userId, dispatch])

    useEffect(() => {
        if(status === 'pending') {
            setContent(<p>Loading...</p>)
        } else if(status === 'success') {
           setContent(<ProfileExcerpt {...data} userStatus={userStatus} isOwner={!userId} />)
        } else if (status === 'failed') {
            setContent(<p>{error}</p>)
        }
    }, [status, userStatus, data])

    return (
        <div>
            {content}
        </div>
    );
};

export default Profile;