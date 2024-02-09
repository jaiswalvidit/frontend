import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-2">
      <div className="">
        <div className="row">
          <div className="col">
            <h5><Link to="/contact" className="text-light text-decoration-none">
                  <i className="fab fa-facebook-f"></i> Contact Us
                </Link></h5>
            <p>Email: info@foodapp.com</p>
          </div>
          <div className="col">
            <p>&copy; {new Date().getFullYear()} FoodApp</p>
          </div>
          <div className="col">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light">
                  <i className="fab fa-facebook-f"></i> Facebook
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light">
                  <i className="fab fa-instagram"></i> Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
