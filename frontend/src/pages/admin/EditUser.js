import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUserPrivilege } from "../../api/UserApi";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Change to boolean
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user id from the route parameter

  // Function to preload data
  useEffect(() => {
    const preloadUser = async () => {
      setLoading(true);
      try {
        const response = await getUser(id); 
        const userData = response.data;
        setUsername(userData.username); 
        setEmail(userData.email);
        setIsAdmin(userData.isAdmin); // No change needed here, userData.isAdmin should already be boolean
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching user:", error);
      }
    };

    preloadUser(); // Call the function on component mount
  }, [id]); // `useEffect` depends on `id`, so it runs when `id` changes

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "isAdmin") {
      setIsAdmin(value === "Yes"); // Convert to boolean
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.getElementById("updateUserForm").reportValidity();

    const data = {
      isAdmin,
    };

    setLoading(true);
    try {
      await updateUserPrivilege(id, data);
      setLoading(false);
      navigate("/users");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
        <h1 className="h2 h2-styled">Edit User</h1>
      </div>

      <hr style={{ margin: "10px 15px", color: "white" }} />

      <form
        id="updateUserForm"
        className="h2-styled"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="col form-group mb-4">
            <div className="col">
              <label className="white-label" htmlFor="title">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username} // Preload username here
                placeholder="Username"
                onChange={handleChange}
                disabled={true} // Corrected to use true (not a string)
              />
            </div>

            <div className="col mt-4">
              <label className="white-label" htmlFor="image">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email} // Preload email here
                placeholder="Optional"
                onChange={handleChange}
                disabled={true} // Corrected to use true (not a string)
              />
            </div>
          </div>

          <div className="row form-group mb-4">
            <div className="col">
              <label className="white-label" htmlFor="isadmin">
                IsAdmin
              </label>
              <select
                className="form-select"
                id="isadmin"
                name="isAdmin" // Updated name attribute to match state
                value={isAdmin ? "Yes" : "No"} // Set dropdown based on boolean value
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  IsAdmin
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      <div className="add-button mb-4 d-flex justify-content-end gap-2">
        <button
          className="btn"
          onClick={() => navigate("/users")} // Fixed the Cancel button
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn"
          onClick={handleSubmit}
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Saving..." : "Save User"}
        </button>
      </div>
    </div>
  );
};

export default EditUser;
