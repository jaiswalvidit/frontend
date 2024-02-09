import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div  style={{ background: "rgba(255, 255, 0, 0.1)" }}>
      <div className="container py-5">
        <h1 className="text-center text-primary">Contact Us</h1>
        <p className="lead text-center mb-4">
          If you have any questions, feedback, or need assistance, feel free to
          reach out to us. We're here to help!
        </p>

        <div className="row">
          <div className="col-md-6">
            <div className="card bg-light mb-4">
              <div className="card-body">
                <h2 className="text-primary mb-3">Contact Information</h2>
                <p className="mb-2">
                  Email: <Link to="mailto:contact@fstfood.com">contact@fstfood.com</Link>
                </p>
                <p className="mb-2">
                  Phone: <Link to="tel:+123456789">+123 456 789</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-light mb-4">
              <div className="card-body">
                <h2 className="text-primary mb-3">Visit Us</h2>
                <address className="mb-0">
                  FstFood Headquarters <br />
                  123 Main Street <br />
                  City, Country
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
