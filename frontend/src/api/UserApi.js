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

// Create a function to get all users
export const getAllUser = async () => {
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
      throw new Error("Fetch users failed, please try again.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error fetching users:", error.response.data);
      throw new Error(error.response.data.message);
    }
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Create a function to get all users
export const getUser = async (id) => {
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
      throw new Error("Fetch users failed, please try again.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error fetching users:", error.response.data);
      throw new Error(error.response.data.message);
    }
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Create a function to update users privilege
export const updateUserPrivilege = async (id, data) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please log in.");
    }

    const response = await axios.patch(`${API_URL}/${id}/privilege`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for verification
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fetch users failed, please try again.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error fetching users:", error.response.data);
      throw new Error(error.response.data.message);
    }
    console.error("Error fetching users:", error);
    throw error;
  }
};