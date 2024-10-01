import React from "react";
import LoginBox from "../components/LoginBox";

const Login = () => {
  const onLogin = (isAdmin) => {
    console.log("User logged in. Admin status:", isAdmin);

  };

  return (
    <div>
      <div className="content">
        <LoginBox onLogin={onLogin} />  {/* Pass onLogin as a prop */}
      </div>
    </div>
  );
};

export default Login;
