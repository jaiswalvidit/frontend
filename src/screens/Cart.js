import React from 'react';
import trash from '../assets/trash.svg';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { IMAGE_URL } from '../constants';
import { loadStripe } from '@stripe/stripe-js';
export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const userEmail = localStorage.getItem('userEmail');
  const body = {
    products: data,
    email: userEmail,
    order_date: new Date().toDateString(),
    
  };
  
  const handlePayment = async () => {
    try {
      
   
      const stripe = await loadStripe(
        "pk_test_51NtSqvSA9hxVLxKfUkTY1DACH1qBGcxaVJv1kwSTyfof4OlGiYkI6kcIswyhdjdAaJ4NfHlKKvgxF3QmE5mVYgWP00wdcBfQGp"
      );

      const response = await fetch('https://backend-k4dp.onrender.com/api/create-checkout-session', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Server response error: ' + response.status);
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        throw new Error('Stripe redirect error: ' + result.error.message);
      }
    } catch (error) {
      console.error('An error occurred during payment:', error);
      // Display an error message to the user or handle it as needed
    }
  };

  if (data.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h1 className="text-danger">Your Cart is Empty!</h1>
      </div>
    );
  }

  const totalPrice = data.reduce((total, food) => total + food.price * food.qty, 0);
  const totalItems = data.reduce((total, food) => total + food.qty, 0);

  return (
    <div className="container mt-2">
    <h1 className="text-center text-primary mb-4">Your Cart</h1>
    <div className="table-responsive">
      <table className="table table-hover table-striped text-center"> {/* Added 'text-center' class */}
        <thead className="bg-primary text-light fs-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Amount</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={food.cloudinaryImageId}>
              <th scope="row">{index + 1}</th>
              <td>{food.Name}</td>
              <td>{food.qty}</td>
              <td>Rs. {(food.price * food.qty) }</td>
              <td>
                <img
                  className="card-img-top rounded"
                  src={`${IMAGE_URL}${food.cloudinaryImageId || 'defaultImageId'}`}
                  alt="Food"
                  style={{ height: '80px', width: '100px', objectFit: 'cover' }}
                />
              </td>
              <td>
                <button type="button" className="btn p-0">
                  <img
                    src={trash}
                    alt="delete"
                    onClick={() => dispatch({ type: 'REMOVE', index: index })}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="d-flex justify-content-between fs-4 fw-bold"> {/* Added 'fw-bold' class */}
      <div>Total Items: {totalItems}</div>
      <div>Total Price: Rs. {totalPrice }/-</div>
    </div>
    <div className="text-center mt-4">
      <button className="btn btn-success btn-lg" onClick={handlePayment}>
        Proceed to Checkout
      </button>
    </div>
  </div>
);
}