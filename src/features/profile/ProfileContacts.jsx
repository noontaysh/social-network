import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

const ProfileContacts = ({title, value}) => {
    const convertToIcon = {
        'facebook': <FacebookIcon />,
        'website': <WebAssetIcon />,
        'vk': '',
        'twitter': <TwitterIcon />,
        'instagram': <InstagramIcon />,
        'youtube': <YouTubeIcon />,
        'github': <GitHubIcon />,
        'mainLink': <LinkIcon />
    }
    return (
        <div className={value && 'mr-1'}>
            {value && <a className={'cursor-pointer'} href={value} target='_blank'>{convertToIcon[title]}</a>}
        </div>
    );
};

export default ProfileContacts;