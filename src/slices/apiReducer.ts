import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommonState, error, isFetching } from './common';
import { MovieData } from '../common/types';

const apiKey = '92b418e837b833be308bbfb1fb2aca1e';

const url = `http://localhost:4000/latest_movies?api_key=${apiKey}`;

export type apiState = CommonState & {
  list: MovieData[]
}

const initialState: apiState = {
  isFetching: false,
  error: null,
  list: []
}

type ResponseData = {
  page?: number,
  results: MovieData[],
  total_results?: number,
  total_pages?: number
}

export const fetchList = createAsyncThunk(
  'list/get',
  async () => {
    try {
      const response = await axios.get<ResponseData>(url);
      return response.data
    } catch (error) {
      throw error;
    }
  }
)

export const slice = createSlice({
  name: 'apiReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchList.pending, isFetching)
      .addCase(fetchList.rejected, error)
      .addCase(fetchList.fulfilled, (state, action) => {
        state.list = action.payload.results;
        state.isFetching = false;
      });
  }
})

export default slice.reducer;