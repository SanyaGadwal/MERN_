import React, { useState } from "react";
import { data } from "../restApi.json";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal"; // Assuming you are using Bootstrap modal
import Cart from "../Pages/Cart/Cart"; // Update with the correct path to Cart.js
 // Assuming you have a Cart component



const Navbar = () => {
  const [show, setShow] = useState(false);
  const [cartView, setCartView] = useState(false); // Initialize cartView state
  
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="logo">HOME</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {data[0].navbarLinks.map((element) => (
              <ScrollLink
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                key={element.id}
              >
                {element.title}
              </ScrollLink>
            ))}
            
          </div>

          <button className="menuBtn">OUR MENU</button>
        </div>



        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>

        {localStorage.getItem("token") ? (
          <div>
            <RouterLink to="/myOrder" className="login">My Orders</RouterLink>
          </div>
        ) : null}

        {!localStorage.getItem("token") ? (
          <div className="beforeEntry">
            <RouterLink to="/login" className="login">Login</RouterLink>
            <RouterLink to="/join" className="join">Join</RouterLink>
            <RouterLink to="/createuser" className="signUp">SignUp</RouterLink>
          </div>
        ) : (
          <div>
            <div className="login" onClick={() => setCartView(true)}>
              Retailer's Cart {" "}
              <Badge pill bg="danger">2</Badge>
            </div>
            
            {cartView ? (
              <Modal show={cartView} onHide={() => setCartView(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Cart /> {/* Render your Cart component here */}
                </Modal.Body>
              </Modal>
            ) : null}
            
            <div className="login" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
