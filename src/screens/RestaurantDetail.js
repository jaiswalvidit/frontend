import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FoodDataCard from "../components/FoodDataCard";
import { IMAGE_URL } from "../constants";

export default function RestaurantDetail() {
  const { _id } = useParams();

  const [item, setItem] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [catItem, setCatItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(
          `https://backend-k4dp.onrender.com/api/auth/addRestaurant/${_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const dataArray = Array.isArray(data) ? data : [data];
          setRestaurant(dataArray[0]);
          setItem(dataArray[0].lists);
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRestaurantData();
  }, [_id]);

  useEffect(() => {
    if (item) {
      const AllCatVal = [
        ...new Set(item.map((curelm) => curelm.category)),
        "all",
      ];
      setCatItem(AllCatVal);
    }
  }, [item]);

  const handleClick = (category) => {
    console.log("Button clicked for category:", category);
    setSelectedCategory(category);
  };

  const filteredItems =
    selectedCategory === "all"
      ? item
      : item?.filter((el) => el.category === selectedCategory);

  return (
    <div className="container-fluid my-3" style={{ fontFamily: "'Roboto', sans-serif", color: "#333" }}>
    {restaurant ? (
      <div className="card p-4" style={{ backgroundColor: "#FFF7EF" }}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="mb-3 fs-3" style={{ color: "#FF6B6B" }}>{restaurant.restaurantName}</h1>
            <p className="mb-2">
              <strong>Rating:</strong> {restaurant.Rating}
            </p>
            <p className="mb-2">
              <strong>Availability:</strong>{" "}
              <span className={restaurant.availability ? "text-success" : "text-danger"}>
                {restaurant.availability ? "Open" : "Closed"}
              </span>
            </p>
            <p>
              <strong>Cuisines:</strong> {catItem.slice(0, -1).join(", ")}
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              className="img-fluid rounded"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_200/${restaurant.cloudinaryImageId}`}
              alt={restaurant.restaurantName}
            />
          </div>
        </div>
      </div>
    ) : (
      <p>Loading restaurant details...</p>
    )}

      {item && catItem && catItem.length > 1 ? (
        <div className="mt-4">
          <div className="fs-2 text-danger mb-3">MENU</div>

          <div className="mb-3 text-center">
            {catItem.map((category) => (
              <button
                key={category}
                onClick={() => handleClick(category)}
                className={`btn btn-outline-primary mx-2 px-3 ${
                  selectedCategory === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="row">
            {filteredItems.map((list) => (
              <div key={list._id} className="col-md-4 mb-4">
                <FoodDataCard
                  foodItem={list}
                  url={`${IMAGE_URL}${list.cloudinaryImageID}`}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading food items...</p>
      )}
    </div>
  );
}
