import React, { useState} from 'react';
import StatusEditForm from "./StatusEditForm.jsx";
import {useDispatch} from "react-redux";
import {updatePhoto} from "./profileSlice.js";

const ProfileExcerpt = (props) => {
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false)

    const onPhotoChange = (e) => {
        e.target.files.length && dispatch(updatePhoto(e.target.files[0]))
    }

    return (
        <div>
            <img src={props.photos.large || 'https://www.w3schools.com/howto/img_avatar.png'} alt=""/>
            <div>
            {props.isOwner && <input type="file" onChange={onPhotoChange}/>}
            </div>
            <div>
                <h1>{props.fullName}</h1>
                {isEditing ? <StatusEditForm setIsEditing={setIsEditing} /> : <p onDoubleClick={() => props.isOwner && setIsEditing(true)}>{props.userStatus || '-----'}</p>}
                <p>Looking for a job: {props.lookingForAJob ? 'yes' : 'no'}</p>
            </div>
        </div>
    );
};

export default ProfileExcerpt;