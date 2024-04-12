import React, { useState } from 'react';
import './Restaurant.css';
import { TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    areaName: '',
    Rating: '',
    DeliveryTime: '',
    availability: false,
    cloudinaryImageId: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your submission logic here
  };
  return (
    <div className="container" style={{margin:"10px 0px"}}>
   <div className="row justify-content-center align-items-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h1 className="text-center mb-4">Register a restaurant</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Restaurant Name"
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Area Name"
              type="text"
              name="areaName"
              value={formData.areaName}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Image URL"
              type="text"
              name="cloudinaryImageId"
              value={formData.cloudinaryImageId}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Rating"
              type="text"
              name="Rating"
              value={formData.Rating}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Delivery Time"
              type="text"
              name="DeliveryTime"
              value={formData.DeliveryTime}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <FormControlLabel
              control={<Checkbox
                checked={formData.availability}
                onChange={handleChange}
                name="availability"
                color="primary"
              />}
              label="Availability"
            />
            <div className="text-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutline />}
                className="mt-3"
              >
                Add Restaurant
              </Button>
            </div>
          </form>
        </div>
      </div>
      </div></div>
      </div>
   
  );
};

export default AddRestaurantForm;
