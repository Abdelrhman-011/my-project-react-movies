import React from "react";

const Footer = () => {
  return (
    <div className="w-100 bg-dark d-flex flex-column justify-content-around align-items-center">
      <p>
        @2023<span className="fs-2 text text-primary">React Movies</span>,All
        Right Reseved
      </p>
      <div
        className="d-flex justify-content-around w-50"
        style={{ color: "deepskyblue" }}
      >
        <p>About Us</p>
        <p>Terms of Use</p>
        <p>Privacy</p>
      </div>
    </div>
  );
};

export default Footer;
