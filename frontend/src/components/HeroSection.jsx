import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const HeroSection = () => {
  return (
    <section className="heroSection" id="heroSection">
      <Navbar />
      <div className="container-fluid">
      <img src="./hero2.png" alt="he" className="bg"/>
      <img src="./logo.png" alt="logo" className="lg"/>
      <h1 class="gd">Gadwal Brothers</h1>
      <h2 class="slogan">#HarGharModern</h2>
      <Link to="/aboutus" className="abt">About Us</Link>
      </div>
    </section>
  );
};

export default HeroSection;
