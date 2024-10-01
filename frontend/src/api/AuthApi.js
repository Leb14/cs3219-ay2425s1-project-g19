import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:8000/auth";

// Create a function to log in
export const login = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      return response.data; // Return response if needed
    } catch (error) {
      if (error.response) {
        console.error("Error adding question:", error.response.data);
        throw new Error(error.response.data.message);
      }
      console.error("Error adding question:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  };