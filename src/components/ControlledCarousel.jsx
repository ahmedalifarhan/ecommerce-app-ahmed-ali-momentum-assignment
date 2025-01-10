import { useState, useEffect, useCallback } from "react";
import single1 from "../assets/images/single-slide-1.png";
import single2 from "../assets/images/single-slide-2.png";

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#f8f4fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
  },
  textContainer: {
    position: "absolute",
    top: "50%",
    left: "10%",
    transform: "translateY(-50%)",
    color: "#333",
    textAlign: "left",
    zIndex: 10,
    opacity: 0,
    transition: "opacity 0.5s ease-in-out",
    fontFamily: "'Roboto', sans-serif",
  },
  h1: {
    fontSize: "clamp(2rem, 5vw, 5rem)",
    fontWeight: "300",
    lineHeight: "1.2",
    margin: "0 0 1rem 0",
    color: "#222",
  },
  line: {
    display: "block",
  },
  image: {
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "40%",
    height: "80%",
    objectFit: "contain",
    transition: "opacity 0.5s ease-in-out",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "2rem",
    color: "#555",
    cursor: "pointer",
    zIndex: 11,
  },
  leftArrow: {
    left: "20px",
  },
  rightArrow: {
    right: "20px",
  },
  responsive: `
    @media (max-width: 1024px) {
      .image {
        width: 50%;
        height: 70%;
      }
    }
    @media (max-width: 768px) {
      .textContainer {
        left: 5%;
      }
      .image {
        width: 60%;
        height: 60%;
      }
    }
    @media (max-width: 480px) {
      .textContainer {
        left: 3%;
        text-align: center;
      }
      .image {
        width: 80%;
        height: 50%;
      }
    }
  `,
};

function ControlledCarousel() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    { src: single1, text: "Summer Offer 2025 Collection" },
    { src: single2, text: "Winter Offer 2025 Collection" },
  ];

  const handleNext = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [images.length]); // Memoize the function

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 7000); // زيادة الزمن إلى 7 ثوانٍ
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');
          ${styles.responsive}
        `}
      </style>
      <div style={styles.container}>
        {images.map((image, index) => (
          <div
            key={index}
            className="textContainer"
            style={{
              ...styles.textContainer,
              opacity: currentImage === index ? 1 : 0,
            }}
          >
            <h1 style={styles.h1}>
              <span style={styles.line}>
                {image.text.split(" ")[0]} {image.text.split(" ")[1]}
              </span>
              <span style={styles.line}>
                {image.text.split(" ")[2]} {image.text.split(" ")[3]}
              </span>
            </h1>
          </div>
        ))}

        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.text}
            className="image"
            style={{
              ...styles.image,
              opacity: currentImage === index ? 1 : 0,
            }}
          />
        ))}

        <div
          style={{ ...styles.arrow, ...styles.leftArrow }}
          onClick={handlePrev}
        >
          &#8249;
        </div>
        <div
          style={{ ...styles.arrow, ...styles.rightArrow }}
          onClick={handleNext}
        >
          &#8250;
        </div>
      </div>
    </>
  );
}

export default ControlledCarousel;
