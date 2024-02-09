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
  const useremail = localStorage.getItem("userEmail");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://backend-k4dp.onrender.com/api/userdata', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const users = await response.json();
          const filteredUser = users.find((user) => user.email === useremail);

          if (filteredUser) {
            setUserData(filteredUser);
            setUpdatedUser(filteredUser);
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
      const response = await fetch('https://backend-k4dp.onrender.com/api/userdata', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setUserData(updatedUserData);
        setIsEditing(false);
        toast.success("Data updated successfully....");
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      toast.error("Some error has occured...");
      console.error("Error updating user data:", error);
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "orders":
        return <MyOrder />;
      case "favorites":
        return <div>Favorites content goes here.</div>;
      case "about":
        return <About />;
        case "address":
          return <EditAddress/>;
          case "review":
            return <Review/>;
      default:
        return null;
    }
  };

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setUpdatedUser(userData);
  };

  return (
    <div className="" style={{ minHeight: "100vh" ,background: "rgba(255, 255, 0, 0.1)" }}>
      <div className="container-fluid bg-danger text-light fs-2 py-3 ">
        <div className="row">
          
          <div className="col-10 px-5">
            <p className="text-capitalize fw-bold"> {userData?.name}</p>
            <p className="fs-5  ">
              {userData?.email}  &nbsp;&nbsp;&nbsp;&nbsp; {userData?.phone} 
            </p>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
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

      <div className="container mt-2">
        <div className="row ">
          <div className="col-md-3">
            <div className="card align-middle">
              
                
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
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={updatedUser.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={updatedUser.phone || ""}
                  onChange={handleInputChange}
                />
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
