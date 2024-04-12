import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

function ReviewCard({ review, theme }) {
  const { Message, name, Rating, parentName } = review;

  // Function to generate star icons based on the rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={i <= Rating ? fasStar : farStar}
          style={{ color: i <= Rating ? '#ffc107' : '#e4e5e9' }}
          className="me-1"
          key={i}
        />
      );
    }
    return stars;
  };

  // Placeholder for avatar image URL
  const avatarUrl = 'https://www.gravatar.com/avatar?d=mp'; // Placeholder image URL

  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      <div className={`card shadow ${theme === 'light' ? 'bg-white' : 'bg-dark text-white'} rounded-3`} style={{ width: '100%', maxWidth: '600px' }}>
        <div className="card-body">
          <h1 className="text-center">"</h1>
          <p className="card-text text-center mb-3" style={{ color: theme === 'light' ? '#666' : '#ccc' }}>{Message}</p>
          <h1 className="text-center">"</h1>
          <div className="text-center mb-3">
            <img src={avatarUrl} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
          <h3 className="card-title text-center mb-2">{name} - {parentName}</h3>
          <div className="rating text-center">
            {renderStars()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
