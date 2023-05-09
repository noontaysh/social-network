import axios from "axios";

const instance = axios.create({
    baseURL: `https://newsapi.org/v2/`,
    headers: {
        'X-Api-Key': '6090ae440749470f8387724f8c8588bc'
    },
})

export const newsApi = {
    getAllNews() {
        return instance
            .get(`everything?q=victory`)
            .then(response => response)
    }
}