import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import { LOG_URL } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const authToken = localStorage.getItem("authToken");
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/auth/login");
  };

  const dropdownItemStyles = {
    backgroundColor: "transparent",
    color: "white",
    outline: "none",
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fs-5" style={{ backgroundColor: "rgba(0, 0, 0, 1.0)" }}>
        <div className="container-fluid">
           <Link className="navbar-brand border bg-white rounded-circle" to="/">
            <img src={LOG_URL} alt="Food Space" style={{ maxWidth: "50px", height: "auto", marginRight: "5px" }} />
          </Link> 
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto  mx-2 px-3">
              {[
                { path: "/", label: "Home" },
                { path: "/addItem", label: "Add Item" },
                { path: "/addrestaurant", label: "Add Restaurant" },
                { path: "/display", label: "Menu" },
                { path: "/about", label: "About" },
              ].map((item) => (
                <li className="nav-item px-2 " key={item.path}>
                  <Link className={`nav-link px-2${location.pathname === item.path ? "active" : ""}`} to={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="nav-item dropdown">
                {authToken ? (
                  <>
                    <Link className={`nav-link navbar-dark dropdown-toggle ${location.pathname.startsWith("/dashboard/profile") ? "active" : ""}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <FontAwesomeIcon icon={faUser} className="me-1" />
                      {userEmail}
                    </Link>
                    <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                      {[
                        { path: "/dashboard/profile", label: "Profile" },
                        { path: "/myorder", label: "Orders" },
                      ].map((item) => (
                        <Link className={`dropdown-item ${location.pathname === item.path ? "active" : ""}`} to={item.path} key={item.path} style={dropdownItemStyles}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <Link className={`nav-link dropdown-toggle ${location.pathname.startsWith("/auth") ? "active" : ""}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <FontAwesomeIcon icon={faUser} className="me-1" />
                      User
                    </Link>
                    <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                      {[
                        { path: "/auth/login", label: "Login" },
                        { path: "/auth/createuser", label: "Signup" },
                      ].map((item) => (
                        <Link className={`dropdown-item ${location.pathname === item.path ? "active" : ""}`} to={item.path} key={item.path} style={dropdownItemStyles}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </li>
            </ul>

            <div className="d-flex  justify-content-center align-items-center">
              {authToken ? (
                <button className="btn bg-white text-success mx-1" onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link className={`btn bg-danger text-white mx-1 ${location.pathname === "/auth/login" ? "active" : ""}`} to="/auth/login">Login</Link>
                  <Link className={`btn bg-danger text-white mx-1 ${location.pathname === "/auth/createuser" ? "active" : ""}`} to="/auth/createuser">Signup</Link>
                </>
              )}
              <div className="">
                <button className="btn bg-danger text-white mx-1" onClick={loadCart}>
                  <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
                  Cart
                  {data.length !== 0 && (
                    <Badge pill bg="danger">{data.length}</Badge>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {cartView && (
        <Modal show={cartView} onHide={() => setCartView(false)} dialogClassName="custom-modal-dialog modal-lg">
          <Modal.Header closeButton className="bg-warning">
            <Modal.Title className="text-danger">My Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-light">
            <Cart />
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <button type="button" className="btn btn-primary">Save changes</button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
