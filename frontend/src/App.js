import "./css/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashBoard from "./pages/DashBoard";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";
import EditQuestion from "./pages/EditQuestion";
import ViewQuestion from "./pages/ViewQuestion";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isAuthenticated")) || false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isAdmin")) || false;
  });

  const handleLogin = (admin) => {
    setIsAuthenticated(true);
    setIsAdmin(admin);

    sessionStorage.setItem("isAuthenticated", true);
    sessionStorage.setItem("isAdmin", admin);
  };

  useEffect(() => {
    // Update body background based on the admin status
    if (isAdmin) {
      document.body.classList.add("admin-body");
      document.body.classList.remove("default-body");
    } else {
      document.body.classList.add("default-body");
      document.body.classList.remove("admin-body");
    }
  }, [isAdmin]);

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          {isAuthenticated && isAdmin && <Sidebar />}
          <main
            className={`col-md-${isAuthenticated && isAdmin ? "9" : "12"} ms-sm-auto col-lg-${
              isAuthenticated && isAdmin ? "10" : "12"
            } px-md-4`}
          >
            <Routes>
              {isAuthenticated && isAdmin ? (
                <>
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/question" element={<Questions />} />
                  <Route path="/add" element={<AddQuestion />} />
                  <Route path="/edit/:id" element={<EditQuestion />} />
                  <Route path="/view/:id" element={<ViewQuestion />} />
                </>
              ) : (
                <Route path="/" element={<Login onLogin={handleLogin} />} />
              )}
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
