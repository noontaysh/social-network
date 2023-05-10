import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchNews, getNews, getNewsError, getNewsStatus} from "./newsSlice.js";
import NewsExcerpt from "./NewsExcerpt.jsx";

const News = () => {
    const dispatch = useDispatch()

    const [content, setContent] = useState(<></>)

    const news = useSelector(getNews)
    const error = useSelector(getNewsError)
    const status = useSelector(getNewsStatus)

    useEffect(() => {
        dispatch(fetchNews())
    }, [dispatch])

    useEffect(() => {
        if (status === 'pending') {
            setContent(<p>Loading...</p>)
        } else if (status === 'success') {
            setContent(news !== undefined && news.map(item => {
                return <NewsExcerpt key={item.title} {...item} />
            }))
        }
    }, [status])


    return (
        <div>
            {content}
        </div>
    );
};

export default News;