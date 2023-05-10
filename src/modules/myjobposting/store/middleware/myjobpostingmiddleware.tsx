import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MYJOBPOSTING, MYJOBPOSTINGDATA } from "../../../../actions/actions";
import { myjobpostapi, myjobpostdataapi } from "../../../../routes/apiRoutes";
import { MyJobPostingPayload } from "../../myJobPostingTypes";

export const myJobPostingInitalMiddleWare = createAsyncThunk(
  MYJOBPOSTING,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(myjobpostapi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const myJobPostingDataMiddleWare = createAsyncThunk(
  MYJOBPOSTINGDATA,
  async (
    { jobTitle, jobId, postedOn, jobType, location, page }: MyJobPostingPayload,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(myjobpostdataapi, {
        params: {
          job_title: jobTitle,
          job_id: jobId,
          posted_on: postedOn,
          jd_status: jobType,
          location,
          page,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
