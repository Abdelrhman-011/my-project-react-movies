import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllDataPageMovies = createAsyncThunk(
  "getAllDataPageMovies",
  async (id, ThunkApi) => {
    const { rejectWithValue } = ThunkApi;
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: id,
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

const pageMoviesSlice = createSlice({
  name: "pageMoviesSlice",
  initialState: { datapagemovies: [], loading: false, count: 1 },
  reducers: {
    incremantpagemovies: (state) => {
      if (state.count < 500) {
        state.count += 1;
      }
    },
    decremantpagemovies: (state) => {
      if (state.count > 1) {
        state.count -= 1;
      }
    },
    firstpagemovies: (state) => {
      state.count = 1;
    },
    endpagemovies: (state) => {
      state.count = 500;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDataPageMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDataPageMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.datapagemovies = action.payload.results;
    });
    builder.addCase(getAllDataPageMovies.rejected, (state) => {
      state.loading = true;
    });
  },
});

export const pagemovies = pageMoviesSlice.reducer;
export const {
  incremantpagemovies,
  decremantpagemovies,
  firstpagemovies,
  endpagemovies,
} = pageMoviesSlice.actions;
