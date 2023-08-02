import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDataSerach } from "./systemRudex/SerachSlice";
import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import {
  getAllDataPageDetailsMovies,
  getAllDataPageDetailsMoviescasting,
  getAllDataTrailer,
} from "./systemRudex/PageDetailsMoviesSlice";
import {
  getAllDataPageDetailsSeries,
  getAllDataPageDetailsSeriescasting,
} from "./systemRudex/PageDetailsSeriesSlice";

const Header = () => {
  const [serach, setserach] = useState("");
  const { requestSerach, loading } = useSelector((e) => e.SerachData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataSerach(serach));
  }, [serach]);

  const navegitly = useNavigate();

  const goDetails = (e) => {
    if (e.media_type === "movie") {
      navegitly(`/movies/details/${e.id}`);
      dispatch(getAllDataPageDetailsMovies(e.id));
      dispatch(getAllDataPageDetailsMoviescasting(e.id));
      dispatch(getAllDataTrailer(e.id));
    } else {
      navegitly(`/series/details/${e.id}`);
      dispatch(getAllDataPageDetailsSeries(e.id));
      dispatch(getAllDataPageDetailsSeriescasting(e.id));
    }
    setserach(" ");
  };

  return (
    <div className="mb-5  fixed-top" style={{ zIndex: 100000 }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="">
        <Container fluid>
          <Navbar.Brand href="#">React Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                HOME
              </Nav.Link>
              <Nav.Link as={Link} to="/movies">
                MOVIES
              </Nav.Link>
              <Nav.Link as={Link} to="/series">
                SERIES
              </Nav.Link>
            </Nav>
            <Form className=" d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={serach}
                onChange={(e) => setserach(e.currentTarget.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {serach === " " ? (
        ""
      ) : (
        <div className="">
          <div
            className="position-relative w-100 d-flex"
            style={{ zIndex: "30000" }}
          >
            <div className="position-absolute top-0 end-0 w-100  d-flex justify-content-end me-3">
              <div className="z-3 rounded-3  border border-light bg-black">
                <div className="container">
                  <div
                    className=""
                    style={{ cursor: "pointer", listStyle: "none" }}
                  >
                    {requestSerach.map((e) => (
                      <div
                        key={e.id}
                        className="d-flex justify-content-between mt-2"
                        onClick={() => goDetails(e)}
                      >
                        <ul className="mt-5">
                          <li style={{ listStyle: "none" }}>
                            <Stack direction="row" spacing={2}>
                              <Avatar
                                alt="Remy Sharp"
                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.poster_path}`}
                                sx={{ width: 46, height: 46 }}
                              />
                            </Stack>
                          </li>
                        </ul>
                        <ul className="mt-5">
                          <li
                            className="text-light ms-3"
                            style={{ listStyle: "none" }}
                          >
                            {e.media_type === "movie"
                              ? `${e.original_title}`
                              : `${e.original_name}`}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
