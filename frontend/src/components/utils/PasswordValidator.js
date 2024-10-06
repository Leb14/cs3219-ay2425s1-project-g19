import React from "react";
import "../../css/passwordValidator.css";

const PasswordStrengthValidator = ({ password }) => {
  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1; // Minimum length
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase letter
    if (/[a-z]/.test(password)) strength += 1; // Lowercase letter
    if (/[0-9]/.test(password)) strength += 1; // Number
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1; // Special character

    return strength;
  };

  const passwordStrength = calculatePasswordStrength(password);

  return (
    <div className="progress-bar-container">
      <div
        className={`progress-bar strength-${passwordStrength}`}
        style={{ width: `${(passwordStrength / 5) * 100}%` }}
      ></div>
    </div>
  );
};

export default PasswordStrengthValidator;
