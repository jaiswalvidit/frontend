import React from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  // Example order details (you can replace these with your actual data)
 

  return (
    <div className="container text-center mt-5" style={{background: "rgba(255, 255, 0, 0.1)"}}>
      <h1 className="display-4">Thank You for Ordering!</h1>
      <p className="lead">Your order has been successfully placed.</p>
      

      
      <Link to="/" className="btn btn-primary mt-3 my-2 ">Back to Home</Link>
    </div>
  );
}
