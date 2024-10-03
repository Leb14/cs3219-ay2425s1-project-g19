import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
// import Searchbar from "../components/Searchbar";
import { getAllUser, deleteUser } from "../../api/UserApi"; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await getAllUser();
        console.log(users.data);
        setUsers(users.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    const users = await getAllUser();
    setUsers(users.data);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <div className="content">
        {/* <Searchbar/> */}
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
          <h1 className="h2 h2-styled">Users</h1>
        </div>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Search user..."
            value={searchInput}
            onChange={handleSearchChange}
            className="form-control"
            style={{height: "50px", fontSize: "18px"}}
          />
        </div>
        <hr style={{ margin: "10px 15px", color: "white" }} />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">IsAdmin</th>
              <th scope="col">Created At</th>
              <th scope="col" className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="5">Loading...</td></tr>}
            {error && <tr><td colSpan="5">{error}</td></tr>}
            {filteredUsers.length === 0 && !loading ? (
              <tr><td colSpan="5">No users found</td></tr>
            ) : (
                filteredUsers.map((user) => (
                <tr className="align-middle" key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>{moment(user.createdAt).tz("Asia/Singapore").format("YYYY-MM-DD hh:mm A")}</td> 
                  <td className="text-end">
                    <div className="d-flex flex-row justify-content-end gap-2">
                      <Link to={`/edituser/${user.id}`} className="btn btn-warning btn-small">
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this question?")) {
                            handleDelete(user.id);
                          }
                        }}
                        className="btn btn-danger btn-small"
                      >
                        <i className="bi bi-person-x"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
