import React, {useState} from 'react';
import StatusEditForm from "./StatusEditForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getPhotoError, updatePhoto} from "./profileSlice.js";
import ProfileContacts from "./ProfileContacts.jsx";
import ProfileEditForm from "./ProfileEditForm.jsx";

const ProfileExcerpt = (props) => {
    const dispatch = useDispatch()

    const photoError = useSelector(getPhotoError)

    const [isEditing, setIsEditing] = useState(false)

    const onPhotoChange = (e) => {
        e.target.files.length && dispatch(updatePhoto(e.target.files[0]))
    }

    return (
        <div>
            <img src={props.photos.large || 'https://www.w3schools.com/howto/img_avatar.png'} alt=""/>
            <div>
                {props.isOwner && <input type="file" onChange={onPhotoChange}/>} {photoError}
            </div>
            {isEditing ? <ProfileEditForm {...props} setIsEditing={setIsEditing}/> : <ProfileData {...props} setIsEditing={setIsEditing} isEditing={isEditing} /> }
        </div>
    );
};

const ProfileData = ({isEditing, setIsEditing, ...props}) => {
    return (
        <>
            <div>
                <h1>{props.fullName}</h1>
                <StatusEditForm userStatus={props.userStatus} isOwner={props.isOwner} />
                <p>{props.aboutMe && `Bio: ${props.aboutMe}`}</p>
                <p>{props.lookingForAJobDescription && `Skills: ${props.lookingForAJobDescription}`}</p>
                <p>Looking for a job: {props.lookingForAJob ? 'yes' : 'no'}</p>
            </div>
            {Object.keys(props.contacts).map(key => {
                return <ProfileContacts key={key} title={key} value={props.contacts[key]}/>
            })}
            {props.isOwner && <button onClick={() => setIsEditing(true)}>Edit</button>}
        </>
    )
}

export default ProfileExcerpt;