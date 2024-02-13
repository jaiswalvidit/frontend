import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import { debounce } from 'lodash';

const Display = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [averageRatingFilter, setAverageRatingFilter] = useState(false);
  const [time, setTime] = useState(true);
  const [rating, setRating] = useState(true);

  const resetFilter = () => {
    setSearchText('');
    setAverageRatingFilter(false);
    setFilteredRestaurants(restaurantList);
  };

  const handleAverageRatingFilter = () => {
    setAverageRatingFilter(!averageRatingFilter);
    const filteredList = restaurantList.filter((res) => {
      const avgRating = parseFloat(res?.Rating);
      return !averageRatingFilter ? avgRating >= 4 : true;
    });
    setFilteredRestaurants(filteredList);
  };

  const handleSearch = debounce((searchText) => {
    const filteredList = restaurantList.filter((res) => {
      const nameMatch = res?.restaurantName?.toLowerCase().includes(searchText.toLowerCase());
      const categoryMatch = res?.cuisines?.some((cuisine) =>
        cuisine.category.toLowerCase().includes(searchText.toLowerCase())
      );
      return nameMatch || categoryMatch;
    });
    setFilteredRestaurants(filteredList);
  }, 300);
  

  const SortTime = () => {
    const sortedByTime = [...filteredRestaurants].sort((a, b) => {
      const timeA = a.DeliveryTime;
      const timeB = b.DeliveryTime;
      return time ? timeA - timeB : timeB - timeA;
    });

    setFilteredRestaurants(sortedByTime);
    setTime(!time); // Toggle the sorting property
    setRating(true); // Reset rating sorting property
  };

  const SortRating = () => {
    const sortedByRating = [...filteredRestaurants].sort((a, b) => {
      const ratingA = parseFloat(a.Rating);
      const ratingB = parseFloat(b.Rating);
      return rating ? ratingA - ratingB : ratingB - ratingA;
    });

    setFilteredRestaurants(sortedByRating);
    setRating(!rating); // Toggle the sorting property
    setTime(true); // Reset time sorting property
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch('https://backend-k4dp.onrender.com/api/auth/addRestaurant/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (Array.isArray(data)) {
            setRestaurantList(data);
            setFilteredRestaurants(data);
          } else {
            console.error('Error: Response data is not an array');
          }
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRestaurantData();
  }, []);

  return (
    <div>
      <div className="container ">
      <h1 className="text-secondary text-center fw-italic">Restaurant List</h1>

        <div className=" mb-3  my-2 ">
          <button className="btn btn-primary me-2 my-2" onClick={handleAverageRatingFilter}>
            {averageRatingFilter ? 'Show All Ratings' : 'Top Ratings'}
          </button>
          <div className='d-flex justify-content-center text-secondary mx-2 '>
          <input
            type="text"
            placeholder="Search by Name or Category"
            className="form-control text-center "
            style={{ borderRadius: '25px', width: '50vw', padding: '5px 10px', position: 'relative',background:'#bbccda' }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch();
            }}
          />
          
          <button className="btn btn-secondary m-2 rounded-circle px-3 py-2 fs-5  " onClick={handleSearch}>
          <i class="fas fa-search text-black "></i>
          </button>
          </div>
          <button className="btn btn-danger m-2" onClick={resetFilter}>
            Reset Filters
          </button>
          <button className="btn btn-danger m-2" onClick={SortTime}>
            {`Sort by Time ${time ? 'Descending' : 'Ascending'}`}
          </button>
          <button className="btn btn-danger m-2" onClick={SortRating}>
            {`Sort by Rating ${rating ? 'Descending' : 'Ascending'}`}
          </button>
        </div>
        <div className="row">
          {filteredRestaurants && filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div key={restaurant._id} className="col-md-4 mb-4">
                <Link to={`/display/${restaurant._id}`} style={{ textDecoration: 'none' }}>
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

export default Display;
