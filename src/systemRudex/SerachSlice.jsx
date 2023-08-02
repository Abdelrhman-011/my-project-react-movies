import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataSerach = createAsyncThunk(
  "getDataSerach",
  async (id, ThunkApi) => {
    const { rejectWithValue } = ThunkApi;

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      params: {
        query: id,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDM5MGRkNDFjM2I2Zjg1ZTdmZjYyZGJhYWVlOWM5YiIsInN1YiI6IjY0ODZlZGY0ZDJiMjA5MDEwYzFhMzIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7mNWWhgoMepwm-9Vne1086dAaXla3i8mo9-OueEvUJw",
      },
    };

    try {
      const respones = await axios(options);
      const data = respones.data;
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const serachSlice = createSlice({
  name: "serachSlice",
  initialState: { requestSerach: [], loading: false },
  extraReducers: (builder) => {
    builder.addCase(getDataSerach.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDataSerach.fulfilled, (state, action) => {
      state.loading = false;
      state.requestSerach = action.payload.results.filter((e, r) => {
        return r < 4;
      });
    });
    builder.addCase(getDataSerach.rejected, (state) => {
      state.loading = true;
    });
  },
});

export const SerachData = serachSlice.reducer;
