import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import "./additem.css"; // Ensure this CSS file contains the styles described below

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    cloudinaryImageId: "",
    category: "",
    parentName: "",
    rating: "",
    cost: "",
    availability: false,
    description: "",
  });

  const [parentOptions, setParentOptions] = useState([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("https://backend-k4dp.onrender.com/api/auth/restaurants");
        const data = await response.json();
        const restaurantNames = data.map(restaurant => restaurant.restaurantName);
        setParentOptions(restaurantNames);
      } catch (error) {
        console.error("Error fetching restaurant names:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      console.error("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch("https://backend-k4dp.onrender.com/api/auth/createItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        console.error(`Request failed with status ${response.status}`);
        return;
      }

      const json = await response.json();
      console.log("Item added:", json);
      alert("Item added successfully!");

      // Clear the form
      setFormData({
        itemName: "",
        cloudinaryImageId: "",
        category: "",
        parentName: "",
        rating: "",
        cost: "",
        availability: false,
        description: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center mb-4">Add Item</h1>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Item Name"
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Image ID"
                  type="text"
                  name="cloudinaryImageId"
                  value={formData.cloudinaryImageId}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Cost"
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  margin="normal"
                />
                <TextField
                  label="Category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Restaurant</InputLabel>
                  <Select
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select a restaurant</MenuItem>
                    {parentOptions.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Rating"
                  type="number"
                  name="rating"
                  value={formData.rating}
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
                  />}
                  label="Availability"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleOutline />}
                  fullWidth
                  style={{ marginTop: '1rem' }}
                >
                  Add Item
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;
