import React from "react";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Series from "./series/Series";
import Movies from "./movies/Movies";
import DetailsMovies from "./movies/DetailsMovies";
import DetailsSeries from "./series/DetailsSeries";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="bg-black text-white ">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/series" element={<Series />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/details/:id" element={<DetailsMovies />} />
        <Route path="/series/details/:id" element={<DetailsSeries />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
