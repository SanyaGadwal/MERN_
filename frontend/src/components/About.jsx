import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">OUR FOUNDING JOURNEY</h1>
              
              <p>The only thing we're serious about is food.</p>
            </div>
            <p className="mid">
            The company was founded in 1998 in Indore by one of the Gadwal Brothers,
Mr. Mahendra Gadwal who have since been joined by the other brother,
Mr. Devendra Gadwal. "The Modern Bread" has been the company's first
and still one of its most significant clients. Since then, the company's primary
objective has been to provide customers with high-quality breads and bakery goods.
            </p>
            <Link to={"/"}>
              Explore Menu{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
