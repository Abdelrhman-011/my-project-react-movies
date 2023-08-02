import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAllDataPageDetailsSeries,
  getAllDataPageDetailsSeriesTriler,
  getAllDataPageDetailsSeriescasting,
} from "../systemRudex/PageDetailsSeriesSlice";
import { FaHandPointRight } from "react-icons/fa";
import { FaHandPointLeft } from "react-icons/fa";
import { AiFillFileAdd, AiOutlineStar } from "react-icons/ai";
import { FcStart } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import { InfinitySpin } from "react-loader-spinner";
import "../movies/styledetailsmovies.css";
import { Card, Modal } from "react-bootstrap";

const DetailsSeries = () => {
  const { id } = useParams();
  const { details, loading, casting, crow, Trailer } = useSelector(
    (e) => e.detailsSeries
  );
  const disputch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    disputch(getAllDataPageDetailsSeries(id));
    disputch(getAllDataPageDetailsSeriescasting(id));
    disputch(getAllDataPageDetailsSeriesTriler(id));
  }, [id]);

  const navgitly = useNavigate();

  const handelback = () => {
    navgitly(-1);
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <InfinitySpin width="200" color="#0000ff" />
        </div>
      ) : (
        <div>
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${details.poster_path})`,
            }}
            className="perantdiv"
          >
            <div className="container mt-5">
              <div className="row">
                <h1 className=" text-info w-100 text-center mb-5 zedindex mt-3">
                  Series - Details
                </h1>
                <div className="col-lg-5 col-md-5 col-sm-12 d-flex justify-content-center  zedindex">
                  <img
                    className="w-75"
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${details.poster_path}`}
                    alt=""
                  />
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12 d-flex flex-column align-items-start zedindex">
                  <h1>{details.original_name}</h1>
                  <p className="mb-3">
                    {details.first_air_date} ({details.original_language}){"  "}
                    <FaHandPointRight className="text-warning" />{" "}
                    {details.genres &&
                      details.genres.map((e, r) => (
                        <span key={r}>{e.name},</span>
                      ))}
                    <FaHandPointLeft className="text-warning" />
                  </p>
                  {details.overview !== "" && (
                    <p>
                      <span className="text-primary fw-bold fs-3 text">
                        Overview :
                      </span>{" "}
                      {details.overview}
                    </p>
                  )}

                  {casting.length !== 0 && (
                    <>
                      <h3 className="text-primary">Casting :</h3>
                      <div className="d-flex justify-content-around w-100">
                        {casting
                          .filter((e, r) => r < 2)
                          .map((e, r) => (
                            <div key={r}>
                              <h4>{e.name}</h4>
                              <p className="text-warning">
                                {e.known_for_department}
                              </p>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                  {crow.length !== 0 && (
                    <div className="d-flex justify-content-around w-100">
                      {crow
                        .filter((e, r) => r < 3)
                        .map((e, r) => (
                          <div key={r}>
                            <h4>{e.name}</h4>
                            <p className="text-warning">
                              {e.known_for_department}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}

                  <div className="d-flex justify-content-around w-100">
                    <div className="d-flex flex-column align-items-center">
                      <AiFillFileAdd className="text-success" />
                      <p>addto watchlist</p>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <AiOutlineStar className="text-warning" />
                      <p>Rate Movie</p>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <FcStart onClick={handleShow} />
                      <p>Play trailer</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center w-100 mb-5">
                    <Button variant="success" onClick={handelback}>
                      Back
                    </Button>
                  </div>
                  <>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                      className="mt-5"
                      style={{ zIndex: "20000" }}
                    >
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>
                        <div
                          className="w-100 bg-black"
                          style={{ height: "50vh" }}
                        >
                          {Trailer.length === 0 ? (
                            details.homepage == "" ? (
                              <div className="w-100 d-flex justify-content-center align-items-center h-100">
                                <h1 className="text-info">Not Found Trailer</h1>
                              </div>
                            ) : (
                              <div className="w-100 d-flex justify-content-center align-items-center h-100">
                                <Button
                                  variant="outline-info"
                                  as={Link}
                                  to={`${details.homepage}`}
                                >
                                  <h1>Go To Home Page</h1>
                                </Button>
                              </div>
                            )
                          ) : (
                            Trailer.map((e) => (
                              <iframe
                                key={e.id}
                                className="embed-responsive-item w-100"
                                style={{ height: "100%" }}
                                src={`https://www.youtube.com/embed/${e.key}`}
                              ></iframe>
                            ))
                          )}
                        </div>
                      </Modal.Body>
                    </Modal>
                  </>
                </div>
              </div>
            </div>
          </div>
          {casting.length !== 0 && (
            <div className="container mt-5">
              <h3 className="text-info mb-3">Casting</h3>
              <div className="d-flex col-12 flex-nowrap overflow-auto gap-2 mb-5">
                {casting.map((e, r) => (
                  <Card
                    style={{ width: "10rem" }}
                    className="bg-dark text-light col-lg-3 col-md-3 col-sm-4 col-7"
                    key={r}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        e.profile_path === null
                          ? `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
                          : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.profile_path}`
                      }
                    />
                    <Card.Body>
                      <Card.Title>{e.name}</Card.Title>
                      <Card.Text>{e.character}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {crow.length !== 0 && (
            <div className="container mt-5">
              <h3 className="text-info mb-3">Prodaction</h3>
              <div className="d-flex col-12 flex-nowrap overflow-auto gap-2 mb-5">
                {crow.map((e, r) => (
                  <Card
                    style={{ width: "10rem" }}
                    className="bg-dark text-light col-lg-3 col-md-3 col-sm-4 col-7"
                    key={r}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        e.profile_path === null
                          ? `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
                          : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.profile_path}`
                      }
                    />
                    <Card.Body>
                      <Card.Title>{e.name}</Card.Title>
                      <Card.Text className="text-warning">{e.job}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DetailsSeries;
