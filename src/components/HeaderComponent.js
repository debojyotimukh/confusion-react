import React from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";

const Header = () => {
  return (
    <React.Fragment>
      <Navbar dark>
        <Container>
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </Container>
      </Navbar>
      <div className="jumbotron">
        <Container>
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Ristorante con Fusion</h1>
              <p>
                We take inspiration from the World's best cuisines, and create a
                unique fusion experience. Our lipsmacking creations will tickle
                your culinary senses!
              </p>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Header;
