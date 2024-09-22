import "./css/main.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h2>Dashboard</h2>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
