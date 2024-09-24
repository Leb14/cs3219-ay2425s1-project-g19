import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:8000/questions";

// Create a function to add a question
export const addQuestion = async (data) => {
  try {
    const response = await axios.post(`${API_URL}`, data);
    return response.data; // Return response if needed
  } catch (error) {
    console.error("Error adding question:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const getQuestionList = async (id) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const getQuestion = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
}

// export const getQuestionByTitle = async (title) => {
//   try {
//     const response = await axios.get(`${API_URL}/title/${encodeURIComponent(title)}`); // Adjusted the path to match your route
//     return response.data; // Return the data from the response
//   } catch (error) {
//     console.error("Error fetching question by title:", error);
//     throw error; // Rethrow the error to handle it in the component
//   }
// };

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

export const updateQuestion = async (id, updatedData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating questions:", error);
    throw error;
  }
};