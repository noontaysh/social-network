import React from 'react';

const ProfileExcerpt = (props) => {
    return (
        <div>
            <img src={props.photos.large || 'https://www.w3schools.com/howto/img_avatar.png'} alt=""/>
            <div>
                <h1>{props.fullName}</h1>
                <p>{props.aboutMe || props.userStatus}</p>
                <p>Looking for a job: {props.lookingForAJob ? 'yes' : 'no'}</p>
            </div>
        </div>
    );
};

export default ProfileExcerpt;