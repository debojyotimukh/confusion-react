import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import "../../App.css";

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <div className="row justify-content-center">
          <Links />
          <Contact />
          <Social />
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <p>© Copyright 2022 Ristorante Con Fusion</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

const Links = () => {
  return (
    <div className="col-4 offset-1 col-sm-2">
      <h5>Links</h5>
      <ul className="list-unstyled">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/aboutus">About Us</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/contactus">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="col-7 col-sm-5">
      <h5>Our Address</h5>
      <address>
        121, Clear Water Bay Road
        <br />
        Clear Water Bay, Kowloon
        <br />
        HONG KONG
        <br />
        <i className="fa fa-phone fa-lg"></i> +852 1234 5678
        <br />
        <i className="fa fa-fax fa-lg"></i> +852 8765 4321
        <br />
        <i className="fa fa-envelope fa-lg"></i>{" "}
        <a href="mailto:confusion@food.net">confusion@food.net</a>
      </address>
    </div>
  );
};

const Social = () => {
  return (
    <div className="col-12 col-sm-4 align-self-center">
      <div className="text-center">
        <a
          className="btn btn-social-icon btn-facebook"
          href="http://www.facebook.com/profile.php?id="
        >
          <i className="fa fa-facebook"></i>
        </a>
        <a
          className="btn btn-social-icon btn-linkedin"
          href="http://www.linkedin.com/in/"
        >
          <i className="fa fa-linkedin"></i>
        </a>
        <a
          className="btn btn-social-icon btn-twitter"
          href="http://twitter.com/"
        >
          <i className="fa fa-twitter"></i>
        </a>
        <a
          className="btn btn-social-icon btn-google"
          href="http://youtube.com/"
        >
          <i className="fa fa-youtube"></i>
        </a>
        <a className="btn btn-social-icon" href="mailto:">
          <i className="fa fa-envelope-o"></i>
        </a>
      </div>
    </div>
  );
};
