import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Carousel() {
  const imageUrls = [
    "https://source.unsplash.com/900x900/?food",
    "https://source.unsplash.com/900x900/?cake",
    "https://source.unsplash.com/900x900/?ramen"
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % imageUrls.length;
    setActiveIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = activeIndex === 0 ? imageUrls.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide rounded position-relative"
      data-ride="false" // Disable automatic cycling
    >
      <div className="carousel-inner">
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
          >
            <img
              className="d-block w-100 img-fluid"
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              style={{ maxWidth: "100%", maxHeight: "420px", width: "auto" }}
            />
            <div className="carousel-content d-flex flex-column justify-content-center align-items-center position-absolute top-0 start-0 end-0 bottom-0">
              <div className="container text-center">
                <h1 className="display-3 text-danger fw-bold ">Welcome to GoFood</h1>
                <p className="lead display-5 text-white fs-4 fw-bold">
                  Discover an exquisite world of culinary delights.
                </p>
                <Link
                  to="/menu"
                  className="btn btn-warning btn-lg mt-4"
                  role="button"
                >
                  Explore Our Menu
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev align-items-center justify-content-center"
        href="#carouselExampleFade"
        role="button"
        data-slide="prev"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a
        className="carousel-control-next align-items-center justify-content-center"
        href="#carouselExampleFade"
        role="button"
        data-slide="next"
        onClick={handleNext}
        aria-label="Next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </div>
  );
}
