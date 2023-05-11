import React from 'react';

const NewsExcerpt = (props) => {
    return (
        <div>
            <img src={props.urlToImage} alt=""/>
            <h1>{props.title}</h1>
            <div>
            {props.description}
            </div>
        </div>
    );
};

export default NewsExcerpt;