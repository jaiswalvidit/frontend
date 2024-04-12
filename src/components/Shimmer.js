import React from 'react';
import './Shimmer.css'; // Import the CSS file for styling

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="card shimmer-card">
          <div className="card-body">
            {/* Content inside the card */}
            <div className="shimmer-content">
              <div className="shimmer-line"></div>
              <div className="shimmer-line"></div>
              <div className="shimmer-line"></div>
              {/* Add more shimmer lines or other content as needed */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
