import React from "react";

export default function About() {
  return (
    <div className="m-0" style={{ background: "rgba(255, 255, 0, 0.1)" }}>
      <div className="container py-5">
        <div className="text-center text-danger fs-2">
          <h2>About FastFood</h2>
          <p className="lead text-secondary fs-4">
            FastFood is a fantastic food delivery app that connects hungry
            customers with their favorite restaurants. With a wide variety of
            cuisines and dishes to choose from, we ensure that you get the best
            dining experience from the comfort of your home.
          </p>
        </div>

        <div className="text-center mt-5 text-danger fs-2">
          <h2>Our Mission</h2>
          <p className="lead text-secondary fs-4">
            Our mission is to make food ordering fast, easy, and convenient for
            everyone. We believe that great food should be accessible to
            everyone, and we're here to make that happen.
          </p>
        </div>

        <div className="text-center mt-5 text-danger fs-2">
          <h2>Meet the Team</h2>
          <p className="lead text-secondary fs-4">
            Our talented team of developers, designers, and food enthusiasts
            work hard to bring you the best food delivery experience. We're
            passionate about food and technology, and we're dedicated to serving
            you.
          </p>
        </div>
      </div>
    </div>
  );
}
