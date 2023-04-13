import React from 'react';

const UsersExcerpt = (props) => {
    return (
        <div>
            <img src={props.photos.small || 'https://www.w3schools.com/howto/img_avatar.png'} alt="user-photo"/>
            <h3>{props.name}</h3>
            <p>{props.status}</p>
        </div>
    );
};

export default UsersExcerpt;