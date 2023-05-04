import React from 'react';

const ProfileContacts = ({title, value}) => {
    return (
        <div>
            {value && `${title}: ${value}`}
        </div>
    );
};

export default ProfileContacts;