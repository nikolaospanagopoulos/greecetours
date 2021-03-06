import React from "react";
import "./HomePage.css";
const HomePage = ({ history }) => {
  const handleClick = () => {
    history.push("/tours");
  };

  const handleClick2 = () => {
    history.push("/services");
  };

  return (
    <div className="homepage">
      <div className="homepage-container">
        <h1 className="home-title">Visit the amazing Greek Paradise</h1>
        <div className="homepage-button-container">
          <button className="btn-homepage" onClick={handleClick}>
            {" "}
            Our Tours{" "}
          </button>
        </div>
        <div className="homepage-button-container">
          <button className="btn-homepage" onClick={handleClick2}>
            {" "}
            Our Services{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
