import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchNews, getNews, getNewsError, getNewsStatus, getPageSize, getTotalResults} from "./newsSlice.js";
import NewsExcerpt from "./NewsExcerpt.jsx";
import Paginator from "../../components/paginator/Paginator.jsx";

const News = () => {
    const dispatch = useDispatch()

    const [content, setContent] = useState(<></>)

    const [currentPage, setCurrentPage] = useState(1)

    const news = useSelector(getNews)
    const error = useSelector(getNewsError)
    const status = useSelector(getNewsStatus)

    const totalResults = useSelector(getTotalResults)
    const pageSize = useSelector(getPageSize)

    useEffect(() => {
        const promise = dispatch(fetchNews(currentPage))
        return () => {
            promise.abort()
        }
    }, [dispatch, currentPage])

    useEffect(() => {
        if (status === 'pending') {
            setContent(<p>Loading...</p>)
        } else if (status === 'success') {
            setContent(news !== undefined && news.map(item => {
                return <NewsExcerpt key={item.title} {...item} />
            }))
        } else if (status === 'failed') {
            setContent(<p>{error}</p>)
        }
    }, [status])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className={'flex justify-center flex-wrap'}>
            <div className={'mb-5'}>
                <Paginator totalCount={totalResults} paginate={paginate} pageSize={pageSize} currentPage={currentPage} />
            </div>
            <div className={'flex flex-wrap justify-center w-screen'}>
                {content}
            </div>
            <div className={'mb-5'}>
                <Paginator totalCount={totalResults} paginate={paginate} pageSize={pageSize} currentPage={currentPage} />
            </div>
        </div>
    );
};

export default News;