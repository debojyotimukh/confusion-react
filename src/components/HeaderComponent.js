import { React, Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class Header extends Component {
  usernameRef;
  passwordRef;
  rememberRef;

  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleLogin(event) {
    this.toggleModal();
    alert(
      "User: " +
        this.usernameRef.value +
        " Password: " +
        this.passwordRef.value +
        " isRember: " +
        this.rememberRef.checked
    );
    event.preventDefault();
  }

  render() {
    const RenderLoginForm = () => {
      return (
        <Form onSubmit={this.handleLogin}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              innerRef={(input) => (this.usernameRef = input)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              innerRef={(input) => (this.passwordRef = input)}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="remember"
                innerRef={(input) => (this.rememberRef = input)}
              />
              Remember me
            </Label>
          </FormGroup>
          <Button type="submit" value="submit" color="primary">
            Login
          </Button>
        </Form>
      );
    };

    return (
      <div>
        <Navbar dark expand="md">
          <NavbarToggler onClick={this.toggleNav} />
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="logo.png"
              height="30"
              width="41"
              alt="Ristorante Con Fusion"
            />
          </NavbarBrand>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink tag={Link} to="/home">
                  <span className="fa fa-home fa-lg"></span> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/aboutus">
                  <span className="fa fa-info fa-lg"></span> About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/menu">
                  <span className="fa fa-list fa-lg"></span> Menu
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/contactus">
                  <span className="fa fa-address-card fa-lg"></span> Contact Us
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button outline onClick={this.toggleModal}>
                <span className="fa fa-sign-in fa-lg"> Login</span>
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
        <div className="jumbotron">
          <Container>
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </Container>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
            <ModalBody>
              <RenderLoginForm />
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Header;
