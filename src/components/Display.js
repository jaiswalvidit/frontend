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
  const [sortOrder, setSortOrder] = useState({ field: '', order: 'asc' });

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

  const resetFilter = () => {
    setSearchText('');
    setFilteredRestaurants(restaurantList);
    setSortOrder({ field: '', order: 'asc' });
  };

  const handleSort = (field) => {
    const isAsc = sortOrder.field === field && sortOrder.order === 'asc';
    const sortedList = [...filteredRestaurants].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? 1 : -1;
      if (a[field] > b[field]) return isAsc ? -1 : 1;
      return 0;
    });
    setFilteredRestaurants(sortedList);
    setSortOrder({ field, order: isAsc ? 'desc' : 'asc' });
  };

  return (
    <div className="container mt-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
    <h1 className="text-center mb-3" style={{ color: "#2C3E50" }}>Restaurant List</h1>
  
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4" style={{ overflowX: 'auto' }}>
      <input
        type="text"
        placeholder="Search by Name or Category"
        className="form-control"
        style={{ maxWidth: '40%', borderRadius: '30px', padding: '10px 20px' }}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <button className="btn btn-info" onClick={() => handleSearch(searchText)}>
        Search
      </button>
      <button className="btn btn-outline-secondary" onClick={resetFilter}>
        Reset Filters
      </button>
      <button className="btn btn-outline-success" onClick={() => handleSort('DeliveryTime')}>
        Sort by Time {sortOrder.field === 'DeliveryTime' && (sortOrder.order === 'asc' ? '↑' : '↓')}
      </button>
      <button className="btn btn-outline-danger" onClick={() => handleSort('Rating')}>
        Sort by Rating {sortOrder.field === 'Rating' && (sortOrder.order === 'asc' ? '↑' : '↓')}
      </button>
    </div>
  
    <div className="row g-3">
      {filteredRestaurants.length > 0 ? (
        filteredRestaurants.map((restaurant) => (
          <div key={restaurant._id} className="col-md-4">
            <Link to={`/display/${restaurant._id}`} style={{ textDecoration: 'none' }}>
              <RestaurantCard resData={restaurant} />
            </Link>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <Shimmer />
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Display;
