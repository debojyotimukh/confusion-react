import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";

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
    const HomePage = () => {
      return <Home />;
    };

    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={HomePage} />
          <Route
            exact
            path="/menu"
            element={() => <Menu dishes={this.state.dishes} />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
