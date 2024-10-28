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
import { useState, useEffect, createContext } from "react";
import MatchingPage from "./pages/student/MatchingPage";
import RightSidebar from "./components/student/RightSidebar";
import SettingPage from "./pages/student/SettingPage";
import HistoryPage from "./pages/student/HistoryPage";
import CollaborationRoom from "./pages/student/CollaborationRoom";

export const UserContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isAuthenticated")) || false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isAdmin")) || false;
  });

  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (email) => {
    setIsAuthenticated(JSON.parse(sessionStorage.getItem("isAuthenticated")));
    setIsAdmin(JSON.parse(sessionStorage.getItem("isAdmin")));
    setUserEmail(email);
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
  }, [isAdmin, isAuthenticated]);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
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
            <LeftSidebar onLogout={handleLogout} />
            <div className="flex-1 flex flex-col bg-[#ffffff]">
              <Header />
              <main className="pr-[20rem] pb-[1.5rem] flex h-full">
                <div className="main-layout flex-1 bg-[#EDEDED] border-2 border-white rounded-[1.5rem] overflow-auto">
                  <Routes>
                    <Route path="/" element={<MatchingPage />} />
                    <Route path="/settings" element={<SettingPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/room/:roomId" element={<CollaborationRoom />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                  </Routes>
                </div>
                <RightSidebar />
              </main>
            </div>
          </div>
        ) : (
          <div className="container-fluid">
            <div className="row">
              {isAuthenticated && isAdmin && <Sidebar onLogout={handleLogout} />}
              <main
                className={`col-md-${isAuthenticated && isAdmin ? "9" : "12"
                  } ms-sm-auto col-lg-${isAuthenticated && isAdmin ? "10" : "12"
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
    </UserContext.Provider>
  );
}

export default App;
