import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonState, error, isFetching } from './common';
import { MovieData } from '../common/types';
import { toggleSnackbar } from './snackReducer';

const apiKey = process.env.REACT_APP_MOVIE_DB_APIKey;

const url = `http://localhost:4000/latest_movies?api_key=${apiKey}`;

export type apiState = CommonState & {
  list: MovieData[];
};

const initialState: apiState = {
  isFetching: false,
  error: null,
  list: [],
};

type ResponseData = {
  page?: number;
  results: MovieData[];
  total_results?: number;
  total_pages?: number;
};

export const fetchList = createAsyncThunk('list/get', async (_, { dispatch }) => {
  try {
    debugger;
    const response = await axios.get<ResponseData>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 0) {
      dispatch(toggleSnackbar(true));
      const responseDataOnError: ResponseData = { results: [] };
      return responseDataOnError;
    } else throw error;
  }
});

export const slice = createSlice({
  name: 'apiReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, isFetching)
      .addCase(fetchList.rejected, error)
      .addCase(fetchList.fulfilled, (state, action) => {
        state.list = action.payload.results;
        state.isFetching = false;
      });
  },
});

export default slice.reducer;
