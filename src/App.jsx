import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import About from "./modules/about/About";
import Footer from "./modules/common/Footer";
import Header from "./modules/common/Header";
import Contact from "./modules/contact/Contact";
import Home from "./modules/home/Home";
import DishDetail from "./modules/menu/DishDetail";
import Menu from "./modules/menu/Menu";

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
