import React, { useState, useEffect } from "react";
import MyOrder from "../screens/MyOrders";
import About from "./about";
import EditAddress from "./EditAddress";
import Review from "./Review";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [selectedOption, setSelectedOption] = useState("orders");
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchData = async () => {
      console.log(email);
      try {
        const response = await fetch('https://backend-k4dp.onrender.com/api/userdata', {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email}),
        });
          console.log(response);
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);

          if (userData) {
            setUserData(userData);
            setUpdatedUser(userData);
          } else {
            console.error("User with email not found");
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  },[email]);

  const handleSaveClick = async () => {
    try {
      const response = await fetch('https://backend-k4dp.onrender.com/api/user', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({'email':email,'name':updatedUser.name,'phone':updatedUser.phone}),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        console.log(updatedUserData);

        setUserData(updatedUserData.Data);
        setIsEditing(false);
        toast.success("Data updated successfully.");
      } else {
        console.error("Failed to update user data");
        toast.error("Failed to update user data.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("An error occurred while updating user data.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "orders":
        return <MyOrder />;
      case "about":
        return <About />;
      case "address":
        return <EditAddress />;
      case "review":
        return <Review />;
      default:
        return null;
    }
  };

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setUpdatedUser(userData); // Reset updatedUser to userData
  };

  return (
    <div className="container-fluid p-0" style={{ background: "rgba(255, 255, 0, 0.1)" }}>
      <div className="bg-danger text-light py-3 ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-8">
              <p className="text-capitalize fw-bold mb-0 fs-2  text-primary">{userData?.name}</p>
              <p className="fs-4" style={{ fontFamily: "italic" }}>{userData?.email} &nbsp;&nbsp;&nbsp;&nbsp; {userData?.phone}</p>

            </div>
            <div className="col-4 text-center">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={openEditModal}
              >
                EDIT PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-2">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <ul className="list-group">
                <li
                  className={`list-group-item ${
                    selectedOption === "orders" ? "active" : ""
                  }`}
                  onClick={() => setSelectedOption("orders")}
                >
                  Orders
                </li>
                <li
                  className={`list-group-item ${
                    selectedOption === "about" ? "active" : ""
                  }`}
                  onClick={() => setSelectedOption("about")}
                >
                  About
                </li>
                <li
                  className={`list-group-item ${
                    selectedOption === "address" ? "active" : ""
                  }`}
                  onClick={() => setSelectedOption("address")}
                >
                  Address
                </li>
                <li
                  className={`list-group-item ${
                    selectedOption === "review" ? "active" : ""
                  }`}
                  onClick={() => setSelectedOption("review")}
                >
                  Comments
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">{renderContent()}</div>
        </div>
      </div>

      <div
        className={`modal ${isEditing ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: isEditing ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center">Edit Profile</h5>
              <button type="button" className="close" onClick={closeEditModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div>
            <div className="form mb-3 mx-2 ">
                  <input
                    type="text"
                    className="text-box"
                    id="name"
                    name="name"
                    value={updatedUser.name}
                    onChange={handleInputChange}
                    placeholder=''
                    required
                  />
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                </div>

                <div className="form mb-3 mx-2 ">
                  <input
                    type="text"
                    className="text-box"
                    id="phone"
                    name="phone"
                    value={updatedUser.phone}
                    onChange={handleInputChange}
                    placeholder=''
                    required
                  />
                  <label htmlFor="name" className="form-label">
                    Phone
                  </label>
                </div>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeEditModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveClick}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Profile;
