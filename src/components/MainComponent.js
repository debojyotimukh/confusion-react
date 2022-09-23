import React, { Component } from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import DishDetail from "./DishDetailComponent";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <Container>
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </Container>
        </Navbar>
        <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        ></DishDetail>
      </div>
    );
  }
}

export default Main;
