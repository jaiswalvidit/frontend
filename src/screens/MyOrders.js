import React, { useEffect, useState } from 'react';
import { IMAGE_URL } from '../constants';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({ email: '', products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');

      const response = await fetch(`https://backend-k4dp.onrender.com/api/myOrderData?email=${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrderData(data.orderData[0] || { email: '', products: [] });
      } else {
        console.error('Fetch failed with status:', response.status);
        setError('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const handleDeleteOrder = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');

      const response = await fetch(`https://backend-k4dp.onrender.com/api/myOrderData/${userEmail}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setOrderData({ email: '', products: [] });
      } else {
        console.error('Delete failed with status:', response.status);
        setError('Failed to delete order');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const userEmail = localStorage.getItem('userEmail');

      const response = await fetch(`https://backend-k4dp.onrender.com/api/myOrderData/${userEmail}/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        // Refresh the order data after successful product deletion
        fetchMyOrder();
      } else {
        console.error('Delete failed with status:', response.status);
        setError('Failed to delete product');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    }
  };

  // Styles (unchanged from your provided code)
  const cardStyle = {
    backgroundColor: '#343a40',
    color: 'white',
    padding: '1rem',
    borderRadius: '10px',
    margin: '2px',
  };

  const productCardStyle = {
    backgroundColor: '#ffc107',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const dateStyle = {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  };

  return (
    <div style={{ background: 'rgba(255, 255, 0, 0.1)' }}>
      <div className="container my-2">
        <div className="row">
          <div className="col-12">
            {loading ? (
              <div className='text-secondary fs-3'>Loading...</div>
            ) : (
              <>
                {error ? (
                  <div>Order Something First</div>
                ) : (
                  <ul className="list-unstyled">
                    {orderData.products && orderData.products.length === 0 ? (
                      <li>No product added</li>
                    ) : (
                      orderData.products.map((productGroup, index) => (
                        <li key={index} className="mb-4">
                          <div className="m-2 p-2" style={cardStyle}>
                            {productGroup[0].Order_date && (
                              <div style={dateStyle} className="fs-4">
                                Date: {new Date(productGroup[0].Order_date).toLocaleDateString()} Time:{' '}
                                {new Date(productGroup[0].Order_date).toLocaleTimeString()}
                              </div>
                            )}
                            <ul className="list-unstyled m-3">
                              {productGroup.slice(1).map((product, subIndex) => (
                                <li key={subIndex} className="mb-3">
                                  <div className="rpw" style={productCardStyle}>
                                    <div className="text-start fs-6 col-9">
                                      <p className="text-success font-weight-bold mb-0">
                                        <strong>Name: {product.Name}</strong>
                                      </p>
                                      <p className="text-danger mb-0">
                                        <strong>Price: ₹{product.price}/-</strong>
                                      </p>
                                      <p className="text-dark mb-0">
                                        <strong>Quantity: {product.qty}</strong>
                                      </p>
                                      <p className="text-secondary fs-8 mb-0 ">
                                        {product.description}
                                      </p>
                                    </div>
                                    <div className="text-end col-3 rounded">
                                      <img
                                        src={`${IMAGE_URL}${product.imageId || 'defaultImageId'}`}
                                        alt={`Product ${product.Name}`}
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                        className="img-fluid rounded text-center "
                                      />
                                    </div>
                                  </div>
                                 
                                </li>
                              ))}
                            </ul>
                            <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      if (window.confirm('Are you sure you want to delete this product?')) {
                                        handleDeleteProduct(productGroup[0].Order_date);
                                      }
                                    }}
                                  >
                                    Delete Product
                                  </button>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                )}
                {orderData.products && orderData.products.length > 0 && (
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this order?')) {
                        handleDeleteOrder();
                      }
                    }}
                  >
                    Delete Order
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
