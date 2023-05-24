import React from 'react';

const ErrorPage = () => {
    return (
        <div className={'h-screen'}>
            <div className={'w-full bg-black/[0.4] h-1/4 rounded-sm'}>
                <h1 className={'text-2xl p-14 text-white tracking-wider'}>Looks like the page you're trying to enter to doesn't exist.</h1>
            </div>
        </div>
    );
};

export default ErrorPage;