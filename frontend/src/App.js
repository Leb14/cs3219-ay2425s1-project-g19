import "./css/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LeftSidebar from "./components/student/LeftSidebar";
import Header from "./components/student/Header";
import DashBoard from "./pages/admin/DashBoard";
import Questions from "./pages/admin/Questions";
import AddQuestion from "./pages/admin/AddQuestion";
import EditQuestion from "./pages/admin/EditQuestion";
import ViewQuestion from "./pages/admin/ViewQuestion";
import Users from "./pages/admin/Users";
import EditUser from "./pages/admin/EditUser";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Transition from "./transition/Transition";
import { useState, useEffect } from "react";
import HomePage from "./pages/student/HomePage";
import RightSidebar from "./components/student/RightSidebar";

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
    // Clear session storage and state
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    // Update body background based on the admin status
    if (isAdmin) {
      document.body.classList.add("admin-body");
      document.body.classList.remove("default-body", "student-body");
    } else if (isAuthenticated && !isAdmin) {
      document.body.classList.add("student-body");
      document.body.classList.remove("admin-body", "default-body");
    } else {
      document.body.classList.add("default-body");
      document.body.classList.remove("admin-body", "student-body");
    }
  }, [isAdmin]);

  return (
    <BrowserRouter>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      {isAuthenticated && !isAdmin ? (
        <div className="h-full flex overflow-hidden">
          <LeftSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="pr-[20rem] pb-[1.5rem] flex h-full">
              <RightSidebar />
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            {isAuthenticated && isAdmin && <Sidebar onLogout={handleLogout} />}
            <main
              className={`col-md-${
                isAuthenticated && isAdmin ? "9" : "12"
              } ms-sm-auto col-lg-${
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
                    <Route path="/users" element={<Users />} />
                    <Route path="/edituser/:id" element={<EditUser />} />
                  </>
                ) : (
                  <>
                    <Route
                      path="/"
                      element={
                        <Transition>
                          <Login onLogin={handleLogin} />
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
      )}
    </BrowserRouter>
  );
}

export default App;
