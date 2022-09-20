import "./App.css";
import { Navbar, NavbarBrand, Container } from "reactstrap";
import Menu from "./components/MenuComponent";
import { DISHES } from "./shared/dishes";

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <Container>
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </Container>
      </Navbar>
      <Menu dishes={DISHES} />
    </div>
  );
}

export default App;
