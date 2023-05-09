import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {newsApi} from "../../api/newsApi";

const initialState = {
    entities: [],
    status: 'idle',
    error: null,
    totalResults: 0,
}

export const fetchNews = createAsyncThunk('news/fetchNews', /**
 @param rejectWithValue {function}
 @param _ {undefined}
 */
async (_, {rejectWithValue}) => {
    try {
        const response = await newsApi.getAllNews()
        return response.data
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
            state.status = action.payload.status
        },
        [fetchNews.rejected]: (state, action) => {
            state.error = action.payload.message
            state.status = action.payload.status
        }
    }
})

export default newsSlice.reducer