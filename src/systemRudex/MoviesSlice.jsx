import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllDataMovies = createAsyncThunk(
  "getAllDataMovies",
  async (id, ThunkApi) => {
    const { rejectWithValue } = ThunkApi;
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
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
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const moviesSlice = createSlice({
  name: "moviesSlice",
  initialState: { dataMovies: [], loading: false, datatopmovies: [] },
  extraReducers: (builder) => {
    builder.addCase(getAllDataMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDataMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.dataMovies = action.payload.results;
      state.datatopmovies = action.payload.results.filter(
        (e) => e.vote_average > 6.5
      );
    });
    builder.addCase(getAllDataMovies.rejected, (state, action) => {
      state.loading = true;
    });
  },
});

export const dataMovies = moviesSlice.reducer;
