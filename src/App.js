import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./modules/common/Footer";
import Header from "./modules/common/Header";
import Home from "./modules/home/Home";
import About from "./modules/about/About";
import Menu from "./modules/menu/Menu";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/aboutus" element={<About />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/menu/:dishId" element={() => <div></div>} />
        <Route exact path="/contactus" element={() => <div></div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
