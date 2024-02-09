import React, { useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { IMAGE_URL } from "../constants";

function FoodDataCard({ foodItem }) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const authToken = (localStorage.getItem('authToken'));
  const fixedPrice = foodItem.cost;
  const [qty, setQty] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const finalPrice = qty * fixedPrice;

  const handleAddToCart = async () => {
    if(!authToken)
    {alert("Login First!!!!");
    return ;
    }

    if (qty > 0) {
      const existingFoodIndex = data.findIndex(
        (item) => item.id === foodItem._id
      );

      if (existingFoodIndex !== -1) {
        const existingFood = data[existingFoodIndex];
        await dispatch({
          type: "UPDATE",
          index: existingFoodIndex,
          qty: existingFood.qty + qty,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.itemName,
          price: fixedPrice,
          qty,
          imageId: foodItem.cloudinaryImageId,
          description: foodItem.description,
        });
      }

      setAddedToCart(true);
      setQty(0);
      console.log(data);
    }
  };

  const decrementQty = () => qty > 0 && setQty(qty - 1);
  const incrementQty = () => setQty(qty + 1);

  useEffect(() => {
    let timer;
    if (addedToCart) {
      timer = setTimeout(() => setAddedToCart(false), 400);
    }
    return () => clearTimeout(timer);
  }, [addedToCart]);

  return (
    <>
    <div
      className="m-2 bg-light text-dark rounded-20"
      style={{
        display: "flex",
        maxWidth: "500px",
        borderRadius: "10px",
        boxShadow: "2px 4px 2px rgba(0, 0, 0, 0.6)",
        transition: "transform 0.2s",
        padding: "10px", // Increased padding for better spacing
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={{ flex: 1, marginRight: "15px" }}>
        <img
          className="img-fluid rounded"
          src={`${IMAGE_URL}${foodItem.cloudinaryImageId}`}
          alt="Food"
          style={{ objectFit: "contain", width: "100%", maxHeight: "220px" }}
        />
       
      </div>
      <div className="card-body text-left" style={{ flex: 1 }}>
        <h6 className="card-title text-secondary  mb-2 mx-2">
          {foodItem.itemName}-
          <span className="text-primary">{foodItem.cost}Rs</span>
        </h6>
        {/* {foodItem.description} */}
        <div className="quantity-control text-success fs-6 mb-3">
          <button
            className="btn btn-success btn-sm px-1"
            onClick={decrementQty}
            style={{ backgroundColor: "#28a745", width: "30px" }} // Green color
          >
            -
          </button>
          <span className="quantity-display fs-7 px-2 m-1">{qty}</span>
          <button
            className="btn btn-success btn-sm"
            onClick={incrementQty}
            style={{ backgroundColor: "#28a745", width: "30px" }} // Green color
          >
            +
          </button>
        </div>
        <p className="text-success fs-6 mb-2">
          Total: Rs. {finalPrice}/-
        </p>
        
        {addedToCart ? (
          <span className="btn btn-primary " role="alert">
            Added to Cart!
          </span>
        ) : (
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
      
    </div>
    
    </>
  );
}

export default FoodDataCard;
