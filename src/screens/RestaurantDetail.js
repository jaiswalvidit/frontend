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
    <div>
      {restaurant ? (
        <div className="card-fluid mx-auto my-3 p-4 bg-dark d-flex justify-content-center border-radius-10">
        <div className="row align-items-center">
          <div className="col-md-6 text-left">
            <h1 className="mb-3 fs-1 text-danger">{restaurant.restaurantName}</h1>
            <p className="mb-2  text-success">
              <strong>Rating:</strong> {restaurant.Rating}
              
            </p>
            <p className="mb-2 text-success">
              <strong >Availability:</strong>{" "}
              <span className={restaurant.availability ? "text-success" : "text-danger"}>
                {restaurant.availability ? "Open" : "Closed"}
              </span>
            </p>
            <p>
              <div className="text-success">
              <strong className="">Cuisines:</strong> {catItem.slice(0, -1).join(", ")}</div>
            </p>
          </div>
          <div className="col-md-6 text-md-right">
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
        <div>
          <div className="mt-4 fs-1 bolder text-italic text-secondary mx-2 mb-3">MENU</div>

          <div className="mb-3 text-center">
            
           
            {catItem.map((category) => (
              <button
                key={category}
                onClick={() => handleClick(category)}
                className={`btn btn-outline-primary mr-2 mx-2 px-2  ${
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
