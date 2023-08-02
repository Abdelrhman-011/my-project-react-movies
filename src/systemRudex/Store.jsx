import { configureStore } from "@reduxjs/toolkit";
import { dataMovies } from "./MoviesSlice";
import { seriesdata } from "./SeriesSlice";
import { pagemovies } from "./PageMoviesSlice";
import { pageseries } from "./PageSeriseSlice";
import { detailsMovies } from "./PageDetailsMoviesSlice";
import { detailsSeries } from "./PageDetailsSeriesSlice";
import { SerachData } from "./SerachSlice";

export const store = configureStore({
  reducer: {
    dataMovies,
    seriesdata,
    pagemovies,
    pageseries,
    detailsMovies,
    detailsSeries,
    SerachData,
  },
});
