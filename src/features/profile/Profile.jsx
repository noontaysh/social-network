import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchProfile, getProfileData, getProfileError, getProfileStatus} from "./profileSlice.js";
import ProfileExcerpt from "./ProfileExcerpt.jsx";

const Profile = () => {
    const dispatch = useDispatch()
    const {userId} = useParams()

    const data = useSelector(getProfileData)
    const status = useSelector(getProfileStatus)
    const error = useSelector(getProfileError)

    useEffect(() => {
        dispatch(fetchProfile(userId))
    }, [userId, dispatch])

    let content
    if(status === 'pending') {
        content = <p>Loading...</p>
    } else if(status === 'success') {
        content = <ProfileExcerpt {...data} />
    } else if (status === 'failed') {
        content = error
    }

    return (
        <div>
            {content}
        </div>
    );
};

export default Profile;