import { createSlice } from '@reduxjs/toolkit'; 
import { SearchingReducerState } from '../../comparativeTypes';
import { comparativesearchingdatamiddleware } from '../middleware/comparativemiddleware';

const ComparativesearchingdataState: SearchingReducerState = {
  isLoading: false,
  error: '',
  data:[{
    "candidate_id":0,
   "stage_name": "",
   "stage_color": "",
   "first_name": "",
   "last_name":"",
   "email":"",
   "profile_image":"",
}],
};

const ComparativesearchingdataReducer = createSlice({
  name: 'candidate_searching',
  initialState: ComparativesearchingdataState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(comparativesearchingdatamiddleware.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(comparativesearchingdatamiddleware.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(comparativesearchingdatamiddleware.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const ComparativesearchingdataReducers = ComparativesearchingdataReducer.reducer;