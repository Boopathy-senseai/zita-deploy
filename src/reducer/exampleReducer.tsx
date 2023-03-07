import { createSlice } from '@reduxjs/toolkit';
import { exampleMiddleWare } from './exampleMidleWare';
import { ExampleState } from './exampleTypes';

const initialState: ExampleState = {
  isLoading: false,
  error: '',
  data: { userId: 0, id: 0, title: '', completed: false },
};

const exampleReducer = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(exampleMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(exampleMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(exampleMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const exampleReducers = exampleReducer.reducer;
