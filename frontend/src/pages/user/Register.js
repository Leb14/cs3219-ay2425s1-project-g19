import React from "react";
import RegisterBox from "../../components/RegisterBox";
import useDisableScroll from "../../hooks/useDisableScroll";
import authSketch from "../../assets/auth-page-sketch.png";
import platform from "../../assets/platform.png";
import "../../css/authBox.css"; // Assuming you'll add some CSS for styling

const Register = ({ onRegister }) => {
  const handleRegister = () => {
    onRegister();
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-text">
          <h1>PeerPrep</h1>
          <p>
            Connect with peers, solve coding challenges, and collaborate in real-time!
            Match with coders at your skill level, work on projects together, and grow as a developer.
          </p>
        </div>
        <div className="auth-illustration">
          <img src={authSketch} alt="Illustration" className="auth-sketch" />
          <img src={platform} alt="Illustration" className="auth-rec" />
        </div>
      </div>

      <div className="auth-right">
        <RegisterBox onRegister={handleRegister} />
      </div>
    </div>
  );
};

export default Register;

