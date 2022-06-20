import './sass/main.scss'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Favorites from './pages/Favorites';
import Detail from './pages/Detail';
import PageNotFound from './pages/PageNotFound';

import Contact from "./pages/Contact";

function App() {
  return (

    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/recipes" element={<Recipes />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/pagenotfound" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;