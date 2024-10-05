import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:8001/questions";

// Create a function to add a question
export const addQuestion = async (data) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please log in.");
    }
    
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for verification
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Create questions failed, please try again.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error adding question:", error.response.data);
      throw new Error(error.response.data.message);
    }
    console.error("Error adding question:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const getQuestionList = async (id) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please log in.");
    }
    
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for verification
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fetch questions failed, please try again.");
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const getQuestion = async (id) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please log in.");
    }
    
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for verification
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fetch question failed, please try again.");
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

// Function to delete a specific question by ID
export const deleteQuestion = async (id) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please log in.");
    }
    
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for verification
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Delete questions failed, please try again.");
    }
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

export const updateQuestion = async (id, updatedData) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please log in.");
    }
    
    const response = await axios.patch(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for verification
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Update questions failed, please try again.");
    }
  } catch (error) {
    console.error("Error updating questions:", error);
    throw error;
  }
};