import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../api/UserApi";
import "../css/authBox.css";
import eyeIcon from "../assets/view.png"; 
import eyeOffIcon from "../assets/hide.png"; 
import PasswordStrengthValidator from "../components/utils/PasswordValidator";

const RegisterBox = () => {  
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); 
  const [errorMessages, setErrorMessages] = useState({}); // State for error messages

  const passwordsMatch = password === confirmPassword;
  
  const handleRegister = async (event) => {
    event.preventDefault();
    document.getElementById("registerForm").reportValidity();

    const passwordCriteria = password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Reset error messages
    setErrorMessages({});

    if (!passwordCriteria) {
        setErrorMessages(prev => ({ ...prev, password: "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character." }));
        return; // Prevent account creation
    }

    if (!passwordsMatch) {
        setErrorMessages(prev => ({ ...prev, confirmPassword: "Passwords do not match." }));
        return; // Prevent account creation
    }

    const data = {
      username,
      email,
      password,
    };

    setLoading(true);

    try {
      console.log(data);
      await createAccount(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
      setErrorMessages(prev => ({ ...prev, api: `Failed to create account: ${error.message}` }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (isConfirmPassword) => {
    if (isConfirmPassword) {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    } else {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  return (
    <div className="authContainer d-flex flex-column align-items-center">
      <h1>Create Account</h1>
      <p className="text-muted">Fill in the necessary information</p>

      <form id="registerForm" onSubmit={handleRegister} className="w-100">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Your username here"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Your Email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"} 
            id="password"
            className="form-control"
            placeholder="Your Password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="button" 
            className="password-toggle-btn" 
            onClick={() => togglePasswordVisibility(false)} 
            style={{ position: "absolute", right: "10px", top: "35px", background: "none", border: "none", cursor: "pointer" }}
          >
            <img 
              src={isPasswordVisible ? eyeIcon : eyeOffIcon} 
              alt={isPasswordVisible ? "Hide password" : "Show password"} 
              style={{ width: "18px", height: "18px", opacity:"0.5" }} 
            />
          </button>
          <PasswordStrengthValidator password={password} />
          {errorMessages.password && <p style={{ color: "red" }}>{errorMessages.password}</p>} {/* Display password error */}
        </div>

        <div className="mb-4 position-relative">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type={isConfirmPasswordVisible ? "text" : "password"} 
            id="confirmPassword"
            className="form-control"
            placeholder="Your Confirm Password here"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button 
            type="button" 
            className="confirmPassword-toggle-btn" 
            onClick={() => togglePasswordVisibility(true)}
            style={{ position: "absolute", right: "10px", top: "35px", background: "none", border: "none", cursor: "pointer" }}
          >
            <img 
              src={isConfirmPasswordVisible ? eyeIcon : eyeOffIcon} 
              alt={isConfirmPasswordVisible ? "Hide password" : "Show password"} 
              style={{ width: "18px", height: "18px", opacity:"0.5" }} 
            />
          </button>
          {errorMessages.confirmPassword && <p style={{ color: "red" }}>{errorMessages.confirmPassword}</p>} {/* Display confirm password error */}
        </div>

        <button type="submit" className="btn w-100">
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {errorMessages.api && <p style={{ color: "red", textAlign: "center" }}>{errorMessages.api}</p>} {/* Display API error */}
      </form>

      <div className="mt-4 text-center">
        <p>
          Already have an account? <a href="/">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterBox;
