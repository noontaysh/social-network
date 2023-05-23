import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchUsers,
    getPageSize,
    getTotalCount,
    getUserError,
    getUsers,
    getUsersStatus
} from "./usersSlice.js";
import UsersExcerpt from "./UsersExcerpt.jsx";
import Paginator from "../../components/paginator/Paginator.jsx";

const Users = () => {
    const dispatch = useDispatch()

    const [content, setContent] = useState(<p>Loading...</p>)
    const [currentPage, setCurrentPage] = useState(1)

    const users = useSelector(getUsers)
    const status = useSelector(getUsersStatus)
    const error = useSelector(getUserError)

    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)

    useEffect(() => {
        const promise = dispatch(fetchUsers({currentPage, pageSize}))
        return () => {
            promise.abort()
        }
    }, [dispatch, currentPage, pageSize])

    useEffect(() => {
        if (status === 'pending') {
            setContent(<p>Content is loading right now</p>)
        } else if (status === 'success') {
            setContent(users !== undefined && users.map(user => {
                return <UsersExcerpt key={user.id} {...user} />
            }))
        } else if (status === 'failed') {
            setContent(<p>{error}</p>)
        }
    }, [status, users])

    const paginate = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className={'h-screen'}>
            <div className={'flex flex-wrap justify-center'}>
                <div className={'mb-4'}>
                    <Paginator totalCount={totalCount} paginate={paginate} pageSize={pageSize} currentPage={currentPage}/>
                </div>
                <div className={'flex flex-wrap justify-center'}>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Users;