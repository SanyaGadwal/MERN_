import React, { useState, useEffect } from "react";
import { data } from "../restApi.json";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const [show, setShow] = useState(false);
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

        <div className="hamburger" onClick={()=> setShow(!show)}>
                <GiHamburgerMenu/>
        </div>
        <div>
<RouterLink to="/login" className="login">Login</RouterLink>
</div>
<div>
<RouterLink to="/createuser" className="login">SignUp</RouterLink>
</div>
      </nav>
    </>
  );
};

export default Navbar;
