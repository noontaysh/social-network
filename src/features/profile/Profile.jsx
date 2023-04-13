import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchProfile, getProfileData, getProfileError, getProfileStatus} from "./profileSlice.js";
import ProfileExcerpt from "./ProfileExcerpt.jsx";

const Profile = () => {
    const dispatch = useDispatch()
    const {userId} = useParams()

    const [content, setContent] = useState(<p>Loading...</p>)

    const data = useSelector(getProfileData)
    const status = useSelector(getProfileStatus)
    const error = useSelector(getProfileError)

    useEffect(() => {
        dispatch(fetchProfile(userId))
    }, [userId, dispatch])

    useEffect(() => {
        if(status === 'pending') {
            setContent(<p>Loading...</p>)
        } else if(status === 'success') {
           setContent(<ProfileExcerpt {...data} />)
        } else if (status === 'failed') {
            setContent(<p>{error}</p>)
        }
    }, [status])


    return (
        <div>
            {content}
        </div>
    );
};

export default Profile;