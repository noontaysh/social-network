import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
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

const Profile = () => {
    const dispatch = useDispatch()
    const {userId} = useParams()

    const [content, setContent] = useState(<p>Loading...</p>)

    const data = useSelector(getProfileData)
    const status = useSelector(getProfileStatus)
    const error = useSelector(getProfileError)
    const userStatus = useSelector(getUserStatus)

    useEffect(() => {
        dispatch(fetchProfile(userId))
        dispatch(fetchStatus(userId))
    }, [userId, dispatch])

    useEffect(() => {
        if(status === 'pending') {
            setContent(<p>Loading...</p>)
        } else if(status === 'success') {
           setContent(<ProfileExcerpt {...data} userStatus={userStatus} />)
        } else if (status === 'failed') {
            setContent(<p>{error}</p>)
        }
    }, [status, userStatus])

    return (
        <div>
            {content}
        </div>
    );
};

export default Profile;