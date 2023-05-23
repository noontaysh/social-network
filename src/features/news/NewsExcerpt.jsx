import React from 'react';

const NewsExcerpt = (props) => {
    return (
        <div className={'bg-black/[.5] p-4 rounded-lg m-5 w-1/4 overflow-hidden break-words cursor-pointer shadow-xl h-max'}>
            <img className={'w-full h-auto object-cover object-center mb-2'} src={props.urlToImage} alt=""/>
            <h1 className={'text-sm font-medium text-white mb-4'}>{props.title}</h1>
            <div>
            {props.description}
            </div>
        </div>
    );
};

export default NewsExcerpt;