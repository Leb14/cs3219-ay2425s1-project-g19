import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:8000/questions";

// Create a function to add a question
export const addQuestion = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/questions`, data);
    return response.data; // Return response if needed
  } catch (error) {
    console.error("Error adding question:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const getQuestions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Function to delete a specific question by ID
export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};