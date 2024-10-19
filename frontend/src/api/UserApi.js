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
      console.error("Error fetching all users:", error.response.data);
      throw new Error(error.response.data.message);
    }
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Create a function to get a user by id
export const getUser = async (id) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please log in.");
    }

    const response = await axios.get(`${API_URL}/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for verification
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fetch user failed, please try again.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error fetching user:", error.response.data);
      throw new Error(error.response.data.message);
    }
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Create a function to get a user by email
export const getUserByEmail = async (email) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please log in.");
    }

    const response = await axios.get(`${API_URL}/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for verification
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fetch user failed, please try again.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error fetching user:", error.response.data);
      throw new Error(error.response.data.message);
    }
    console.error("Error fetching user:", error);
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

    const response = await axios.patch(`${API_URL}/id/${id}/privilege`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for verification
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Update user's privilege failed, please try again.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error updating user's privilege:", error.response.data);
      throw new Error(error.response.data.message);
    }
    console.error("Error updating user's privilege:", error);
    throw error;
  }
};

// Create a function to update users privilege
export const deleteUser = async (id) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please log in.");
    }

    const response = await axios.delete(`${API_URL}/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for verification
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Delete user failed, please try again.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error deleting user:", error.response.data);
      throw new Error(error.response.data.message);
    }
    console.error("Error deleting user:", error);
    throw error;
  }
};