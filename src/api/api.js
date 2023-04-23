import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": 'c1565f70-477b-447d-ae64-6c6f04430c0b' // to use, register https://social-network.samuraijs.com, then go to settings and generate your apі-key, which must be inserted here
    }
})

export const profileAPI = {
    getProfile(userId) {
        return instance
            .get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance
            .get(`profile/status/${userId}`)
            .then(response => response.data)
    }
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, config) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`, config)
            .then(response => response.data)
    }
}

export const authAPI = {
    login(email, password, rememberMe = false, captcha = null) {
        return instance
            .post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response)
    },
    getAuth() {
        return instance
            .get(`auth/me`)
            .then(response => response)
    },
    logOut() {
        return instance
            .delete(`auth/login`)
            .then(response => response)
    },
    getCaptchaUrl() {
        return instance
            .get(`security/get-captcha-url`)
            .then(response => response.data.url)

    }
}