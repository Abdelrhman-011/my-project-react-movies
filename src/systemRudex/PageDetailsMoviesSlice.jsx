import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllDataPageDetailsMovies = createAsyncThunk(
  "getAllDataPageDetailsMovies",
  async (id, thunkapi) => {
    const { rejectWithValue } = thunkapi;

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: { language: "en-US" },
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
export const getAllDataPageDetailsMoviescasting = createAsyncThunk(
  "getAllDataPageDetailsMoviescasting",
  async (id, thunkapi) => {
    const { rejectWithValue } = thunkapi;

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      params: { language: "en-US" },
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
export const getAllDataTrailer = createAsyncThunk(
  "getAllDataTrailer",
  async (id, thunkapi) => {
    const { rejectWithValue } = thunkapi;

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/videos`,
      params: { language: "en-US" },
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

const pageDetailsMoviseSlice = createSlice({
  name: "pageDetailsMovise",
  initialState: {
    details: {},
    loading: false,
    casting: [],
    crow: [],
    Trailer: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDataPageDetailsMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDataPageDetailsMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.details = action.payload;
    });
    builder.addCase(getAllDataPageDetailsMovies.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllDataPageDetailsMoviescasting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllDataPageDetailsMoviescasting.fulfilled,
      (state, action) => {
        state.loading = false;
        state.casting = action.payload.cast;
        state.crow = action.payload.crew;
      }
    );
    builder.addCase(getAllDataPageDetailsMoviescasting.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllDataTrailer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDataTrailer.fulfilled, (state, action) => {
      state.loading = false;
      state.Trailer = action.payload.results.filter((e, r) => {
        return r < 1;
      });
    });
    builder.addCase(getAllDataTrailer.rejected, (state) => {
      state.loading = true;
    });
  },
});

export const detailsMovies = pageDetailsMoviseSlice.reducer;
