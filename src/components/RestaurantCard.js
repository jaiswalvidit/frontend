import React from "react";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, restaurantName, areaName, Rating, cuisines, availability, DeliveryTime } = resData;

  // Create a set of unique cuisine categories
  const uniqueCuisineCategories = [...new Set(cuisines.map((cuisine) => cuisine.category))];

  return (
    <div className="card m-3 bg-dark text-white rounded-3 shadow-sm"
      style={{
        maxWidth: "600px",
        borderRadius: "15px",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <img className="card-img-top rounded-3"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600,h_400/${cloudinaryImageId}`}
        alt={restaurantName}
        style={{
          maxHeight: "4700px",
          maxWidth: "670px",
          height: "auto",
          borderRadius: "15px 15px 0 0",
        }}
      />

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h6 className="card-title text-secondary fs-5">{restaurantName} - ({areaName})</h6>
          <span className={`bg-${availability ? "success" : "danger"} text-white rounded p-2 text-center`} style={{ whiteSpace: "nowrap" }}>
            {Rating} <span className="text-white">*</span>
          </span>
        </div>
        <p className="card-text text-truncate text-light fs-6" style={{ maxHeight: "80px" }}>
          
          {uniqueCuisineCategories.join(", ")}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <p>
            {availability ? (
              <button className="btn btn-success text-light" disabled>Open</button>
            ) : (
              <button className="btn btn-danger text-light" disabled>Closed</button>
            )}
          </p>
          <p>{DeliveryTime} min</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;



