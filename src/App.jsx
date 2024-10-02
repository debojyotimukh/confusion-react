import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./modules/common/Footer";
import Header from "./modules/common/Header";
import Home from "./modules/home/Home";
import About from "./modules/about/About";
import Menu from "./modules/menu/Menu";
import DishDetail from "./modules/menu/DishDetail";
import Contact from "./modules/contact/Contact";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const App = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <Header />
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          <Route exact path="*" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/aboutus" element={<About />} />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/menu/:dishId" element={<DishDetail />} />
          <Route exact path="/contactus" element={<Contact />} />
        </Routes>
      </CSSTransition>
      <Footer />
    </TransitionGroup>
  );
};

export default App;
