import React from "react";
import LoginBox from "../../components/LoginBox";

const Login = ({ onLogin }) => {
  const handleLogin = (isAdmin) => {
    onLogin();
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