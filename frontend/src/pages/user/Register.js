import React from "react";
import RegisterBox from "../../components/RegisterBox";
import useDisableScroll from "../../hooks/useDisableScroll";

const Register = ({ onRegister }) => {
  useDisableScroll();
  const handleRegister = () => {
    onRegister();
  };

  return (
    <div className="auth">
      <div className="content">
        <RegisterBox onRegister={handleRegister} />  {/* Pass onRegister as a prop */}
      </div>
    </div>
  );
};

export default Register;