import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { navigation } from "../../constants";
import { LoginButton, LoginModal } from "../login/Login";

const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const showLoginForm = () => setLoginModalOpen(!isLoginModalOpen);

  return (
    <>
      <Navbar dark expand="md">
        <NavbarToggler onClick={() => setNavOpen(!isNavOpen)} />
        <Logo />
        <PageNavigation collapse={isNavOpen} />
        <LoginButton onClick={showLoginForm} />
      </Navbar>
      <BrandName />
      <LoginModal isOpen={isLoginModalOpen} toggler={showLoginForm} />
    </>
  );
};

export default Header;

const Logo = () => {
  return (
    <NavbarBrand className="mr-auto" href="/">
      <img src="logo.png" height="30" width="41" alt="Ristorante Con Fusion" />
    </NavbarBrand>
  );
};

const BrandName = () => {
  return (
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
  );
};

const PageNavigation = ({ collapse }) => {
  return (
    <Collapse navbar isOpen={collapse}>
      <Nav navbar>
        {navigation.map((page) => (
          <NavItem key={page.to}>
            <NavLink tag={Link} to={page.to}>
              <span className={`fa ${page.icon} fa-lg`}></span> {page.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Collapse>
  );
};
