import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {newsApi} from "../../api/newsApi";
import axios from "axios";

const initialState = {
    entities: [],
    status: 'idle',
    error: null,
    totalResults: 0,
    pageSize: 6,
}

export const fetchNews = createAsyncThunk('news/fetchNews', /**
 @param rejectWithValue {function}
 @param currentPage {number}
 @param getState {function}
 @param signal {object}
 */
async (currentPage, {rejectWithValue, getState, signal}) => {
    try {
        const pageSize = getState().news.pageSize
        const source = axios.CancelToken.source()
        signal.addEventListener('abort', () => {
            source.cancel()
        })
        return await newsApi.getAllNews(currentPage, pageSize, {
            cancelToken: source.token
        })
    } catch (e) {
        return rejectWithValue(e.message)
    }
})

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchNews.pending]: (state, action) => {
            state.status = 'pending'
        },
        [fetchNews.fulfilled]: (state, action) => {
            state.entities = action.payload.articles
            state.totalResults = action.payload.totalResults
            state.status = 'success'
        },
        [fetchNews.rejected]: (state, action) => {
            state.error = action.payload.message
            state.status = action.payload.status
        }
    }
})

export const getNews = (state) => state.news.entities
export const getNewsError = (state) => state.news.error
export const getNewsStatus = (state) => state.news.status
export const getPageSize = (state) => state.news.pageSize
export const getTotalResults = (state) => state.news.totalResults

export default newsSlice.reducer