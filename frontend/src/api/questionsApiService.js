import axios from 'axios';

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:8000/questions';


// Function to create a question
export const createQuestion = async (newQuestion) => {
    try {
      const response = await axios.post(API_BASE_URL, newQuestion);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  };

// Function to get all questions
export const getAllQuestions = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
