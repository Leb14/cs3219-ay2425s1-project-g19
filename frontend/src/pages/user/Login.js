import React from "react";
import LoginBox from "../../components/LoginBox";
import authSketch from "../../assets/auth-page-sketch.png";
import platform from "../../assets/platform.png";
import "../../css/authPage.css";

const Login = ({ onLogin }) => {
  const handleLogin = (email) => {
    onLogin(email);
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
          <div className="auth-rec" >
            <img src={platform} alt="Illustration" /> 
          </div>
        </div>
      </div>

      <div className="auth-right">
        <LoginBox onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
