import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Payment Canceled</h1>
      <p className="lead">Your payment has been canceled. You can go back to the home page or try again.</p>
      
      {/* Button to go back to the home page for retry */}
      <Link to="/" className="btn btn-primary my-3">Back to Home</Link>
    </div>
  );
}
