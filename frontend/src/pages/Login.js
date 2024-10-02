import React from "react";
import LoginBox from "../components/LoginBox";

const Login = ({ onLogin }) => {
  const handleLogin = (isAdmin) => {
    console.log("User logged in. Admin status:", isAdmin);
    onLogin(isAdmin); // Call the onLogin function passed from App
  };

  return (
    <div>
      <div className="content">
        <LoginBox onLogin={handleLogin} />  {/* Pass onLogin as a prop */}
      </div>
    </div>
  );
};

export default Login;