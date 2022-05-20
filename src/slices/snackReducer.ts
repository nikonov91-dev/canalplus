import { createSlice } from "@reduxjs/toolkit";

const initialState:{value:boolean} = {value: false};

export const slice = createSlice({
  name: 'snackReducer',
  initialState,
  reducers: {
    toggleSnackbar: (state, action) => {
      state.value = action.payload;
      debugger
    },
  }
})

export const { toggleSnackbar } = slice.actions;

export default slice.reducer;