import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllDataSerierpage = createAsyncThunk(
  "getAllDataSerierpage",
  async (id, thunkapi) => {
    const { rejectWithValue } = thunkapi;

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/tv/popular",
      params: { language: "en-US", page: id },
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

const pageSeriesSlice = createSlice({
  name: "pageSeriesSlice",
  initialState: { datapagesreies: [], loading: false, count: 1 },
  reducers: {
    firstpageseries: (state) => {
      state.count = 1;
    },
    decremantpageseries: (state) => {
      if (state.count > 1) {
        state.count -= 1;
      }
    },
    incremantpageseries: (state) => {
      if (state.count < 500) {
        state.count += 1;
      }
    },
    endpageseries: (state) => {
      state.count = 500;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDataSerierpage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDataSerierpage.fulfilled, (state, action) => {
      state.loading = false;
      state.datapagesreies = action.payload.results;
    });
    builder.addCase(getAllDataSerierpage.rejected, (state) => {
      state.loading = true;
    });
  },
});

export const pageseries = pageSeriesSlice.reducer;
export const {
  endpageseries,
  incremantpageseries,
  decremantpageseries,
  firstpageseries,
} = pageSeriesSlice.actions;
