import "./App.css";
import { Navbar, NavbarBrand, Container } from "reactstrap";

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <Container>
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
