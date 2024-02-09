import React, { useState, useEffect } from "react";
import "./additem.css";

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    cloudinaryImageId: "",
    category: "",
    parentName: "",
    Rating: "",
    cost: "",
    availability: false, 
    description: "",
  });

  const [parentOptions, setParentOptions] = useState([]);
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          "https://backend-k4dp.onrender.com/api/auth/addrestaurant"
        );
        const data = await response.json();
        const restaurantNames = data.map(
          (restaurant) => restaurant.restaurantName
        );
        setParentOptions(restaurantNames);
      } catch (error) {
        console.error("Error fetching restaurant names:", error.message);
      }
    };

    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      console.error("User not authenticated. Please log in.");
      return;
    }
    console.log(formData);

    try {
      const response = await fetch(
        "https://backend-k4dp.onrender.com/api/auth/createItem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      console.log(response);
      console.log(authToken);
      if (!response.ok) {
        console.error(`Request failed with status ${response.status}`);
        return;
      }

      const json = await response.json();
      console.log("API Response:", json);

      setFormData({
        itemName: "",
        cloudinaryImageId: "",
        category: "",
        parentName: "",
        Rating: "",
        cost: "",
        availability: "",
        description: "",
      });

      alert("Form filled successfully");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const {
    itemName,
    cloudinaryImageId,
    category,
  
    Rating,
    cost,
    
    description,
  } = formData;

  return (
    <div className="container-fluid my-5  mx-auto text-center d-flex justify-content-center">
      <div className="card text-secondary">
        <div className="card-body">
          <h1 className="text-center mb-4">Add Item</h1>
          <form onSubmit={handleSubmit}>
            <div className="form mb-3 ">
              <input
                type="text"
                className="text-box"
                name="itemName"
                placeholder=""
                value={itemName}
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className="form-label">
                Item Name
              </label>
            </div>
            <div className="form mb-3 ">
              <input
                type="text"
                className="text-box"
                name="cloudinaryImageId"
                value={cloudinaryImageId}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className="form-label">
                Image
              </label>
            </div>

            <div className="form mb-3 ">
              {/* <label htmlFor="cost" className="form-label">Cost:</label> */}
              <input
                type="text"
                className="text-box"
                name="cost"
                value={cost}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className="form-label">
                Cost
              </label>
            </div>

            <div className="form mb-3 ">
              {/* <label htmlFor="description" className="form-label">Description:</label> */}
              <input
                type="textarea"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder=""
                className="text-box"
                required
              />
              <label htmlFor="name" className="form-label">
                Description
              </label>
            </div>

            <div className="form mb-3 ">
              {/* <label htmlFor="category" className="form-label">Category:</label> */}
              <input
                type="text"
                name="category"
                value={category}
                onChange={handleChange}
                placeholder=""
                autoComplete="off"
                className="text-box"
                required
              />
              <label htmlFor="name" className="form-label">
                Category
              </label>
            </div>

            <div className="mb-3">
            <select
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className="text-box"
              placeholder=''
              required
            >
              <option value="" disabled>
                 
              </option>
              {parentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label htmlFor="name" className="form-label">
              Restaurant
            </label>
          </div>

            <div className="form">
              <input
                type="number"
                name="Rating"
                value={Rating}
                placeholder=""
                onChange={handleChange}
                className="text-box"
                required
              />
              <label htmlFor="name" className="form-label">
                Rating
              </label>
            </div>

            
              <div className="">
              <label className='text-secondary fs-4 mx-2'>Availability:</label>
              <div className="form-check">
                <input
                  className=""
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
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;
