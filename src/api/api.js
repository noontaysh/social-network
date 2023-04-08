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
    }
}