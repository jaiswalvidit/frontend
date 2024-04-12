import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import Display from '../components/Display';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://backend-k4dp.onrender.com/api/review', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const reviewsData = await response.json();
          setReviews(reviewsData);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchData();
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="home">
      <div className="hero-section" style={{ position: 'relative', overflow: 'hidden', height: '75vh' }}>
        <img className="img-fluid" src="https://source.unsplash.com/1600x900/?restaurant,food" alt="Dining" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="text-overlay" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, color: '#fff', backgroundColor: 'rgba(0,0,0,0.6)', padding: '20px', borderRadius: '10px' }}>
          <div className="container home-content text-center">
            <h1>GoFood</h1>
            <p className="text-light">
              Explore top-rated restaurants and exotic dishes near you.
            </p>
            <Link to="/display" className="btn btn-primary btn-lg mt-4">
              Find Restaurants
            </Link>
          </div>
        </div>
      </div>

      <Display />

      <section className="py-5 mx-auto customer-reviews">
        <h2 className="text-center text-primary m-2">Customer Reviews:</h2>
        <div className="row mx-auto" style={{ position: 'relative', overflow: 'hidden' }}>
          <Slider {...sliderSettings} style={{ position: 'relative', zIndex: 1 }}>
            {reviews.map((review) => (
              <div key={review._id}>
                <ReviewCard review={review} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="py-5 about-services">
        <div className="container">
          <h2 className="text-center text-primary">About GoFood:</h2>
          <p className="lead text-center fs-5 text-dark">
            Connecting you with the best culinary experiences.
          </p>
          <p className="text-center fs-5 text-muted">
            From local favorites to fine dining, GoFood curates top dining spots ensuring quality and satisfaction.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
