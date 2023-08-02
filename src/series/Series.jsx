import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decremantpageseries,
  endpageseries,
  firstpageseries,
  getAllDataSerierpage,
  incremantpageseries,
} from "../systemRudex/PageSeriseSlice";
import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

const Series = () => {
  const { datapagesreies, loading, count } = useSelector((e) => e.pageseries);
  const disbatch = useDispatch();

  useEffect(() => {
    disbatch(getAllDataSerierpage(count));
  }, [count]);

  const navegitly = useNavigate();

  const goToDetails = (e) => {
    navegitly(`/series/details/${e}`, {
      state: { path: window.location.href },
    });
  };

  return (
    <div className="mt-5">
      <div className="text-info text-center mb-5">
        <h1 className="mb-3 pt-3">Series</h1>
        <h4>
          PAGE NUMPER <span className="text-white">{count}</span> FROM 500
        </h4>
      </div>
      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <InfinitySpin width="200" color="#0000ff" />
          </div>
        ) : (
          <div className="d-flex  justify-content-around flex-wrap">
            {datapagesreies.map((e, index) => (
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
                        onClick={() => goToDetails(e.id)}
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
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First onClick={() => disbatch(firstpageseries())} />
          <Pagination.Prev onClick={() => disbatch(decremantpageseries())} />

          <Pagination.Item active>{count}</Pagination.Item>

          <Pagination.Next onClick={() => disbatch(incremantpageseries())} />
          <Pagination.Last onClick={() => disbatch(endpageseries())} />
        </Pagination>
      </div>
    </div>
  );
};

export default Series;
