import { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import About from "./app/about/About";
import Footer from "./app/common/Footer";
import Header from "./app/common/Header";
import Contact from "./app/contact/Contact";
import Home from "./app/home/Home";
import DishDetail from "./app/menu/DishDetail";
import Menu from "./app/menu/Menu";

const App = () => {
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="page"
          timeout={300}
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>
            <Routes location={location}>
              <Route path="*" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/aboutus" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/:dishId" element={<DishDetail />} />
              <Route path="/contactus" element={<Contact />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  );
};

export default App;
