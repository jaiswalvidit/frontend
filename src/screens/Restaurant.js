import React, { useState } from 'react';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Restaurant.css';

const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    areaName: '',
    Rating: '',
    DeliveryTime: '',
    availability: false,  // Set default value to false for the checkbox
    cloudinaryImageId: '',
  });
  const authToken = (localStorage.getItem('authToken'));
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      console.error('User not authenticated. Please log in.');
      return;
    }
    console.log(formData);
    try {
      const response = await fetch('https://backend-k4dp.onrender.com/api/auth/addRestaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (!response.ok) {
        console.error(`Request failed with status ${response.status}`);
        return;
      }

      const json = await response.json();
      console.log('API Response:', json);

      alert('Form filled successfully');

      setFormData({
        restaurantName: '',
        areaName: '',
        Rating: '',
        DeliveryTime: '',
        availability: false,  // Reset checkbox to false after submission
        cloudinaryImageId: '',
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container my-5 mx-auto text-center  d-flex justify-content-center">
     
       
    <div className="card text-secondary">
      <div className="card-body">
        <h1 className="text-center mb-4">Register Restaurant</h1>
        <form onSubmit={handleSubmit}>
            <div className="form mb-3">
              <input
                type="text"
                className="text-box"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                placeholder=''
                onChange={handleChange}
                required
              />
               <label htmlFor="name" className="form-label">
                     Name
                  </label>
            </div>

            <div className="form mb-3">
              <input
                type="text"
                className="text-box"
                id="areaName"
                name="areaName"
                value={formData.areaName}
                placeholder=''
                onChange={handleChange}
                required
              />
               <label htmlFor="name" className="form-label">
                    Areaname
                  </label>
            </div>

            <div className="form mb-3">
              <input
                type="text"
                className="text-box"
                id="cloudinaryImageId"
                name="cloudinaryImageId"
                placeholder=''
                autoComplete='off'
                value={formData.cloudinaryImageId}
                onChange={handleChange}
                required
              />
               <label htmlFor="name" className="form-label">
                    Image
                  </label>
            </div>

            <div className="form mb-3">
              <input
                type="text"
                className="text-box"
                id="Rating"
                name="Rating"
                value={formData.Rating}
                placeholder=''
                onChange={handleChange}
                required
              />
               <label htmlFor="name" className="form-label">
                    Rating
                  </label>
            </div>

            <div className="form mb-3">
              <input
                type="text"
                className="text-box"
                id="DeliveryTime"
                name="DeliveryTime"
                placeholder=''
                value={formData.DeliveryTime}
                onChange={handleChange}
                required
              />
               <label htmlFor="name" className="form-label">
                    Time
                  </label>
            </div>

            <div className="form mb-3 d-flex md-6 ">
              <label className=''>Availability:</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="availability"
                  id="availabilityCheckbox"
                  onChange={handleChange}
                  value="true"
                />
               True           
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Add Restaurant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurantForm;
