import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllDataSeries = createAsyncThunk(
  "getAllDataSeries",
  async (id, ThunkApi) => {
    const { rejectWithValue } = ThunkApi;
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/tv",
      params: {
        include_adult: "false",
        include_null_first_air_dates: "false",
        language: "en-US",
        page: "1",
        sort_by: "popularity.desc",
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

const seriesSlice = createSlice({
  name: "seriesSlice",
  initialState: { data: [], loading: false, datatopseries: [] },
  extraReducers: (builder) => {
    builder.addCase(getAllDataSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDataSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.results;
      state.datatopseries = action.payload.results.filter(
        (e) => e.vote_average > 4
      );
    });
    builder.addCase(getAllDataSeries.rejected, (state) => {
      state.loading = true;
    });
  },
});

export const seriesdata = seriesSlice.reducer;
