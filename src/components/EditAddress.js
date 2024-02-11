import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditAddress() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [addressForm, setAddressForm] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [editAddressIndex, setEditAddressIndex] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [updatedLocation, setUpdatedLocation] = useState([]);
  const useremail = localStorage.getItem("userEmail");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://backend-k4dp.onrender.com/api/userdata', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 'email':useremail }),
        });
      
        if (response.ok) {
          const users = await response.json();
          if (users) {
            setUserData(users);
            setUpdatedUser(users);
            setAddresses(users.location || []);
          } else {
            console.error("User with email not found");
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, [useremail]);

  const handleSaveClick = async () => {
    try {
      
      console.log(updatedLocation);
      const response = await fetch('https://backend-k4dp.onrender.com/api/user', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({'email':useremail, location:updatedLocation}),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setUserData(updatedUserData);
        toast.success("Data has been saved successfully.")
        setIsEditing(false);
      } else {
        toast.error("Failed to update data!!!!")
        console.error("Failed to update user data");
      }
    } catch (error) {
      toast.error("Error on fetching data!!!!")
      console.error("Error updating user data:", error);
    }
  };

  const handleAddressChange = ({ target: { name, value } }) => {
    setAddressForm(value);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    let newAddress = addressForm;

    if (editAddressIndex !== null) {
      const newAddresses = [...addresses];
      newAddresses[editAddressIndex] = newAddress;
      setAddresses(newAddresses);
      setUpdatedLocation(newAddresses);
    } else {
      const newLocationArray = [addressForm];
      setAddresses([...addresses, newLocationArray]);
      setUpdatedLocation([...addresses, ...newLocationArray]);
    }

    setAddressForm("");
    setEditAddressIndex(null);
    setIsAddingAddress(false);
  };

  const toggleAddAddress = () => {
    setIsAddingAddress(!isAddingAddress);
    setAddressForm("");
    setEditAddressIndex(null);
  };

  const editAddress = async (index) => {
    setAddressForm(addresses[index]);
    setEditAddressIndex(index);
    setIsEditing(true);
    setIsAddingAddress(true);
  };

  const deleteAddress = async (index) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
    setUpdatedLocation(newAddresses);
  };

  const renderAddressForm = () => {
    if (isAddingAddress || isEditing) {
      return (
        <form onSubmit={handleAddressSubmit}>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={addressForm}
              onChange={handleAddressChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editAddressIndex !== null ? "Update Address" : "Add Address"}
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2 mx-2"
            onClick={toggleAddAddress}
          >
            Cancel
          </button>
        </form>
      );
    } else {
      return (
        <div className="text-center font-weight-bold px-2 py-0 rounded">
          <button
            type="button"
            className="btn bg-danger text-light fs-2 btn-lg rounded"
            onClick={toggleAddAddress}
          >
            +
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <ul className="row">
        {addresses.map((address, index) => (
          <div className="col-md-6" key={index}>
            <div className="card mb-3 ">
              <div className="card-body">
                <h5 className="card-title">Address {index + 1}</h5>
                <p className="card-text text-capitalize">{address}</p>
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-primary mx-3 rounded"
                    onClick={() => editAddress(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning mx-3 rounded"
                    onClick={() => deleteAddress(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <h2>{renderAddressForm()}</h2>

      <button className="btn btn-primary my-2" onClick={handleSaveClick}>
        Save
      </button>
      <ToastContainer position="top-center" />
    </div>
  );
}
