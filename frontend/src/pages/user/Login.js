import React from "react";
import LoginBox from "../../components/LoginBox";
import useDisableScroll from "../../hooks/useDisableScroll"; 

const Login = ({ onLogin }) => {
  useDisableScroll();
  const handleLogin = (isAdmin) => {
    onLogin();
  };

  return (
    <div className="auth">
      <div className="content">
        <LoginBox onLogin={handleLogin} />  {/* Pass onLogin as a prop */}
      </div>
    </div>
  );
};

export default Login;