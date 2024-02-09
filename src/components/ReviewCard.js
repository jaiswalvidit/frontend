import React from 'react';

function ReviewCard({ review, theme }) {
  const { Message, name, Rating, parentName } = review;

  // Function to generate star icons based on the rating
  const renderStars = () => {
    const stars = [];
      
    for (let i = 0; i < Rating; i++) {
      stars.push(<i class=" px-1 fa-regular fa-star"></i>);
    }
    return stars;
  };

  // Log the rating to the console
  console.log("Rating:", Rating);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={`mx-auto card rounded text-secondary border-radius-10 ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-white'}`}>
        <div className="card-body">
          <h3 className="card-title fs-3 text-center">{name}-{parentName}</h3>
          <p className="card-text fs-6 text-secondary text-center">{Message}</p>
          <div className="rating text-center" style={{ color: theme === 'light' ? '#037bff' : '#17a2b8' }}>
            {renderStars()}
            {/* <span className="fw-bold ms-1">{Rating}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
