import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllDataPageDetailsSeries = createAsyncThunk(
  "getAllDataPageDetailsMovies",
  async (id, thunkapi) => {
    const { rejectWithValue } = thunkapi;

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${id}`,
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
export const getAllDataPageDetailsSeriescasting = createAsyncThunk(
  "getAllDataPageDetailsMoviescasting",
  async (id, thunkapi) => {
    const { rejectWithValue } = thunkapi;

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${id}/credits`,
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

export const getAllDataPageDetailsSeriesTriler = createAsyncThunk(
  "getAllDataPageDetailsSeriesTriler",
  async (id, thunkapi) => {
    const { rejectWithValue } = thunkapi;

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${id}/videos`,
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

const pageDetailsSeriesSlice = createSlice({
  name: "pageDetailsMovise",
  initialState: {
    details: {},
    loading: false,
    casting: [],
    crow: [],
    Trailer: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDataPageDetailsSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDataPageDetailsSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.details = action.payload;
    });
    builder.addCase(getAllDataPageDetailsSeries.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllDataPageDetailsSeriescasting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllDataPageDetailsSeriescasting.fulfilled,
      (state, action) => {
        state.loading = false;
        state.casting = action.payload.cast;
        state.crow = action.payload.crew;
      }
    );
    builder.addCase(getAllDataPageDetailsSeriescasting.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getAllDataPageDetailsSeriesTriler.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllDataPageDetailsSeriesTriler.fulfilled,
      (state, action) => {
        state.loading = false;
        state.Trailer = action.payload.results.filter((e, r) => {
          return r < 1;
        });
      }
    );
    builder.addCase(getAllDataPageDetailsSeriesTriler.rejected, (state) => {
      state.loading = true;
    });
  },
});

export const detailsSeries = pageDetailsSeriesSlice.reducer;
