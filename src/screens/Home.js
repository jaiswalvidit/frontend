import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ReviewCard from "../components/ReviewCard";
import Display from "../components/Display";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://backend-k4dp.onrender.com/api/review', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
      <div className="hero-section" style={{ position: "relative", overflow: "hidden" }}>
        <img className="img-fluid" src="https://source.unsplash.com/900x900/?food" alt="Food" style={{ width: "100%", maxHeight: "650px", objectFit: "cover" }} />
        <div className="text-overlay" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}>
          <div className="container text-center">
            <h1 className="display-1 text-light fw-bold italic">GoFood</h1>
            <p className="lead display-5 text-white fs-4 fw-bold">
              Discover an exquisite world of culinary delights.
            </p>
            <Link to="/display" className="btn btn-danger btn-lg mt-4">
              Browse restaurants
            </Link>
          </div>
        </div>
      </div>

      <Display />

      <section className="py-5 mx-auto customer-reviews">
        <h2 className="fw-bold font-italic text-center text-secondary m-2">Customer Reviews:</h2>
        <div className="row mx-auto" style={{ position: "relative", overflow: "hidden" }}>
          <Slider {...sliderSettings} style={{ position: "relative", zIndex: 1 }}>
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
          <h2 className="display-6 fw-bold font-italic text-center">About Our Services:</h2>
          <p className="lead text-center fs-4 text-secondary">
            We are committed to providing you with the best dining experience.
          </p>
          <p className="text-center text-secondary fs-4">
            At GoFood, we offer a wide range of delicious dishes from various cuisines. Our dedicated staff ensures that your dining experience is exceptional.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
