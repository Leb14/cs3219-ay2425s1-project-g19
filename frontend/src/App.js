import "./css/main.css";
import Sidebar from "./components/Sidebar";
import DashBoard from "./pages/DashBoard";
import AddQuestion from "./pages/AddQuestion";
import Questions from "./pages/Questions";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/question" element={<Questions />} />
              <Route path="/add" element={<AddQuestion />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
