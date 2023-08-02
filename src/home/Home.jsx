import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllDataMovies } from "../systemRudex/MoviesSlice";
import Slider from "react-slick";
import { getAllDataSeries } from "../systemRudex/SeriesSlice";
import Card from "react-bootstrap/Card";

import { Rating } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { dataMovies, datatopmovies, loading } = useSelector(
    (e) => e.dataMovies
  );
  const { data, datatopseries } = useSelector((e) => e.seriesdata);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDataMovies());
    dispatch(getAllDataSeries());
  }, []);
  // const settings = {
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  // };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navegitly = useNavigate();

  const goToDetailsMovie = (e) => {
    navegitly(`/movies/details/${e}`, {
      state: { path: window.location.href },
    });
  };

  const goToDetailsSeries = (e) => {
    navegitly(`/series/details/${e}`, {
      state: { path: window.location.href },
    });
  };

  return (
    <div className="text-white">
      <h1 className="text-info text-center mb-2 mt-5 pt-3">Home</h1>
      <div className="container mb-5 p-5">
        <h1 className="text-primary mb-5">MOVIES</h1>
        {loading ? (
          <div className="d-flex justify-content-center">
            <InfinitySpin width="200" color="#0000ff" />
          </div>
        ) : (
          <Slider {...settings}>
            {dataMovies.map((e, index) => (
              <div key={index} className="d-flex justify-content-around">
                <img
                  style={{ width: "80%" }}
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.poster_path}`}
                  alt=""
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
      <div className="container mb-5 p-5">
        <h1 className="text-primary mb-5">SERIES</h1>
        {loading ? (
          <div className="d-flex justify-content-center">
            <InfinitySpin width="200" color="#0000ff" />
          </div>
        ) : (
          <Slider {...settings} className="">
            {data.map((e, index) => (
              <div key={index} className="d-flex justify-content-around">
                <img
                  style={{ width: "80%" }}
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.poster_path}`}
                  alt=""
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
      <div className="container">
        <h1 className="text-primary mb-5">TOP MOVIES</h1>
        {loading ? (
          <div className="d-flex justify-content-center">
            <InfinitySpin width="200" color="#0000ff" />
          </div>
        ) : (
          <div className="d-flex  justify-content-around flex-wrap">
            {datatopmovies.map((e, index) => (
              <div className="mb-5" key={index}>
                <Card
                  style={{ width: "18rem" }}
                  className="bg-dark text-white "
                >
                  <Card.Img
                    variant="top"
                    src={
                      e.poster_path
                        ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.poster_path}`
                        : `https://www.bevi.com/static/files/0/ecommerce-default-product.png`
                    }
                  />
                  <Card.Body>
                    <Card.Title>{e.original_title}</Card.Title>
                    <Card.Text>
                      Rating:
                      <span>
                        <Rating
                          name="half-rating-read"
                          defaultValue={e.vote_average / 2}
                          precision={0.25}
                          readOnly
                        />
                      </span>
                    </Card.Text>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="outline-info"
                        onClick={() => goToDetailsMovie(e.id)}
                      >
                        Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container">
        <h1 className="text-primary mb-5">TOP SERIES</h1>
        {loading ? (
          <div className="d-flex justify-content-center">
            <InfinitySpin width="200" color="#0000ff" />
          </div>
        ) : (
          <div className="d-flex  justify-content-around flex-wrap">
            {datatopseries.map((e, index) => (
              <div className="mb-5" key={index}>
                <Card
                  style={{ width: "18rem" }}
                  className="bg-dark text-white "
                >
                  <Card.Img
                    variant="top"
                    src={
                      e.poster_path
                        ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.poster_path}`
                        : `https://www.bevi.com/static/files/0/ecommerce-default-product.png`
                    }
                  />
                  <Card.Body>
                    <Card.Title>{e.original_name}</Card.Title>
                    <Card.Text>
                      Rating:
                      <span>
                        <Rating
                          name="half-rating-read"
                          defaultValue={e.vote_average / 2}
                          precision={0.25}
                          readOnly
                        />
                      </span>
                    </Card.Text>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="outline-info"
                        onClick={() => goToDetailsSeries(e.id)}
                      >
                        Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
