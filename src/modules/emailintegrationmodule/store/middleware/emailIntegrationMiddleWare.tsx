import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_EMAIL } from '../../../../actions/actions';
import { maillist } from '../../../../routes/apiRoutes';

export const getEmail = createAsyncThunk(GET_EMAIL, async () => {
  try {
    const { data } = await axios.get(maillist, {});
    return data;
  } catch (error) {
    const typedError = error as Error;
    return typedError;
  }
});
