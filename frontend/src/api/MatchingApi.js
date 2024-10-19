import axios from "axios";

const API_URL = "http://localhost:8002/matching";

export const getMatch = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("No match found.");
    }
  } catch (error) {
    if (error.response) {
        console.error("Error finding match:", error.response.data);
        throw new Error(error.response.data.message);
      }
      console.error("Error finding match:", error);
      throw error; // Re-throw the error to handle it in the component
  }
};