import React from "react";
import "../assets/styles/Footer.css"; // Ensure the CSS file is imported

const Footer = () => {
  const companyName = "Momentum Solutions";
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="footer">
      <p>{`${companyName} - ${currentYear}`}</p>
    </footer>
  );
};

export default Footer;
