import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import data from "../RestaurantData";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [averageRatingFilter, setAverageRatingFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  

  const fetchData = async () => {
    try {
     
      console.log(data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

      const restaurantData =
      data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants ;
        console.log(restaurantData);
      setListOfRestaurants(data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
      setFilteredRestaurants(data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const resetFilter = () => {
    setSearchText("");
    setFilteredRestaurants(listOfRestaurants);
  };

  const handleAverageRatingFilter = () => {
    setAverageRatingFilter(!averageRatingFilter);
    const filteredList = listOfRestaurants.filter((res) => {
      const avgRating = parseFloat(res?.info?.avgRating);
      return !averageRatingFilter
        ?  avgRating >= 4
        : true;
    });
    setFilteredRestaurants(filteredList);
  };

  const handleSearch = () => {
    const filteredList = listOfRestaurants.filter((res) =>
      res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filteredList);
  };

  return (
    <div className="" style={{background: "rgba(255, 255, 0, 0.1)"}}> 


    <div className="container " >
      {loading ? (
        <div className=" loading-indicator"><Shimmer/></div>
      ) : (
        <div className=" container  row justify-content-center px-2 mx-2">
          <div className="  col-md-6">
            <div className="filter">
              <div className=" my-4 search input-group mb-3 ">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search here..."
                  aria-label="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  className="btn btn-danger mx-2"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-primary"
                  onClick={resetFilter}
                >
                  Reset
                </button>
                <button
                  className="btn btn-secondary filter-btn"
                  onClick={handleAverageRatingFilter}
                >
                  {averageRatingFilter ? "Show All Restaurants" : "Top Rated Restaurants"}
                </button>
                
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row my-2">
        {filteredRestaurants && filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant.info.id} className="col-md-4 mb-4">
              <Link to={"/restaurant/" + restaurant.info.id} style={{ textDecoration: "none" }}>
  <div className="">
    <RestaurantCard resData={restaurant} />
  </div>
</Link>

            </div>
          ))
        ) : (
          <div className="col-md-12 text-center">
          <div>
  <Shimmer />
</div>

          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Body;
