import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchUsers,
    getCurrentPage,
    getPageSize,
    getTotalCount,
    getUserError,
    getUsers,
    getUsersStatus
} from "./usersSlice.js";
import UsersExcerpt from "./UsersExcerpt.jsx";

const Users = () => {
    const dispatch = useDispatch()

    const [content, setContent] = useState(<p>Loading...</p>)

    const users = useSelector(getUsers)
    const status = useSelector(getUsersStatus)
    const error = useSelector(getUserError)

    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)

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
    }, [status])

    return (
        <div>
            {content}
        </div>
    );
};

export default Users;