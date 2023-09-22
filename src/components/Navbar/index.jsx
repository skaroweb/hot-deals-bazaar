import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";

const Navbar = () => {
  return (
    <>
      <div className="nav-holder">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {/* <NavLink
                to="/"
                className="nav-opener text-center hidden visible-sm"
              >
                <i className="fa fa-bars"></i>
              </NavLink> */}
              <nav id="nav">
                <ul className="list-unstyled">
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>

                  <li>
                    <NavLink to="/blog">Blog</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
