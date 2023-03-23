import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LIST } from '../actions/actions';

export const exampleMiddleWare = createAsyncThunk(
  LIST,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1',
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
