import "./css/main.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashBoard from "./pages/admin/DashBoard";
import Questions from "./pages/admin/Questions";
import AddQuestion from "./pages/admin/AddQuestion";
import EditQuestion from "./pages/admin/EditQuestion";
import ViewQuestion from "./pages/admin/ViewQuestion";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Transition from "./transition/Transition";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isAuthenticated")) || false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isAdmin")) || false;
  });

  const handleLogin = () => {
    setIsAuthenticated(JSON.parse(sessionStorage.getItem("isAuthenticated")));
    setIsAdmin(JSON.parse(sessionStorage.getItem("isAdmin")));
  };

  const handleLogout = () => {
    setIsAuthenticated(JSON.parse(sessionStorage.getItem("isAuthenticated")));
    setIsAdmin(JSON.parse(sessionStorage.getItem("isAdmin")));
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
          {isAuthenticated && isAdmin && <Sidebar onLogout={handleLogout} />}
          <main
            className={`col-md-${isAuthenticated && isAdmin ? "9" : "12"} ms-sm-auto col-lg-${
              isAuthenticated && isAdmin ? "10" : "12"
            } px-md-4`}
          >
            <Routes>
              {isAuthenticated && isAdmin ? (
                <>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/question" element={<Questions />} />
                  <Route path="/add" element={<AddQuestion />} />
                  <Route path="/edit/:id" element={<EditQuestion />} />
                  <Route path="/view/:id" element={<ViewQuestion />} />
                </>
              ) : (
                <>
                  <Route 
                    path="/" 
                    element={
                      <Transition>
                        <Login />
                      </Transition>
                    } 
                  />
                  <Route 
                    path="/register" 
                    element={
                      <Transition>
                        <Register />
                      </Transition>
                    }  
                  />
                </>
              )}
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
