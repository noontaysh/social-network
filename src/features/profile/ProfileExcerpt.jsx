import React, {useState} from 'react';
import StatusEditForm from "./StatusEditForm.jsx";

const ProfileExcerpt = (props) => {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div>
            <img src={props.photos.large || 'https://www.w3schools.com/howto/img_avatar.png'} alt=""/>
            <div>
                <h1>{props.fullName}</h1>
                {isEditing ? <StatusEditForm setIsEditing={setIsEditing} /> : <p onDoubleClick={() => setIsEditing(true)}>{props.userStatus || '-----'}</p>}
                <p>Looking for a job: {props.lookingForAJob ? 'yes' : 'no'}</p>
            </div>
        </div>
    );
};

export default ProfileExcerpt;