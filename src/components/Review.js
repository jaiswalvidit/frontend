import React, { useState, useEffect } from 'react';

const Review = () => {
  const userEmail = localStorage.getItem('userEmail');
  const [userName, setUserName] = useState('akash');
  const [parentOptions, setParentOptions] = useState([]);
  const [formData, setFormData] = useState({
    Message: '',
    Rating: 0,
    parentName: '',
    email: userEmail,
    name: userName,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://backend-k4dp.onrender.com/api/userdata', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const users = await response.json();
          const filteredUser = users.find((user) => user.email === userEmail);

          if (filteredUser) {
            console.log(filteredUser);
            console.log(filteredUser.name);
            setUserName(filteredUser.name);
          } else {
            console.error('User with email not found');
          }
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchData();
  }, [userEmail]);
  console.log(formData);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('https://backend-k4dp.onrender.com/api/auth/addrestaurant');
        const data = await response.json();
        const restaurantNames = data.map((restaurant) => restaurant.restaurantName);
        setParentOptions(restaurantNames);
      } catch (error) {
        console.error('Error fetching restaurant names:', error.message);
      }
    };

    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-k4dp.onrender.com/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      console.log(formData);
      if (!response.ok) {
        console.error(`Request failed with status ${response.status}`);
        return;
      }
      const json = await response.json();
      console.log('API Response:', json);

      setFormData({
        Message: '',
        Rating: 0,
        parentName: '',
        email: userEmail,
        name: userName,
      });

      alert('Form filled successfully');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <div className="container-fluid  my-5  mx-auto text-center  d-flex justify-content-center">
     <div className="card bg-light text-secondary">
       <div className="card-body">
         <h1 className="text-center mb-4">Add Review</h1>
         <form onSubmit={handleSubmit}>
          < div className="mb-4 form ">
          
              <input
                type="text-area"
                name="Message"
                
                className="text-box"
                placeholder=""
                id="Message"
                autoComplete="off"
                value={formData.Message}
                onChange={handleChange}
                required
              /> <label htmlFor="name" className="form-label">
              Message
            </label>
              <i className="input-icon uil uil-at"></i>
            
          </div>

          <div className="mb-3 form ">
           
              <input
                type="number"
                name="Rating"
                className="text-box"
                placeholder=""
                id="Rating"
                autoComplete="off"
                value={formData.Rating}
                onChange={handleChange}
                required
              /> <label htmlFor="name" className="form-label">
              Rating
            </label>
              <i className="input-icon uil uil-at"></i>
            
          </div>

          
           <div className="mb-3">
            <select
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className="text-box"
              placeholder=''
              required
            >
              <option value="" disabled>
                 
              </option>
              {parentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label htmlFor="name" className="form-label">
              Restaurant
            </label>
          </div>

          <button type="submit" className='btn btn-secondary'>Submit</button>
      
      </form>
      </div>
      </div>
      </div>
    </>
  );
};

export default Review;
