import "./css/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashBoard from "./pages/DashBoard";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";
import EditQuestion from "./pages/EditQuestion";
import ViewQuestion from "./pages/ViewQuestion";

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
              <Route path="/edit/:id" element={<EditQuestion />} />
              <Route path="/view/:id" element={<ViewQuestion />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
