import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:8000/users";

// Create a function to create account
export const createAccount = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Account creation failed, please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error creating account:", error.response.data);
        throw new Error(error.response.data.message);
      }
      console.error("Error creating account:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  };