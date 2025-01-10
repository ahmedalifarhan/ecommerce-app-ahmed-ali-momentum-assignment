// ExampleCarouselImage.jsx
import React from "react";
import single from "../assets/images/single-slide-1.png"; // استبدلها بمسار الصورة الخاصة بك.

function ExampleCarouselImage({ text }) {
  return (
    <div className="carousel-image">
      <img src={single} alt={text} style={{ width: "100%", height: "auto" }} />
      <div className="carousel-text">{text}</div>
    </div>
  );
}

export default ExampleCarouselImage;
