import React from "react";
import RegisterBox from "../../components/RegisterBox";

const Register = ({ onRegister }) => {
  const handleRegister = (isAdmin) => {
    onRegister();
  };

  return (
    <div>
      <div className="content">
        <RegisterBox onRegister={handleRegister} />  {/* Pass onRegister as a prop */}
      </div>
    </div>
  );
};

export default Register;