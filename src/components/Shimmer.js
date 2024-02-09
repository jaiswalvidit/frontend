import React from 'react';

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {[1, 2, 3,4,5,6].map((index) => (
        <div key={index} className="shimmer-card">
          <div className="shimmer-effect"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
