import { Routes, Route } from "react-router-dom";
import "./App.css";
import Table from "./components/table";
import CreateStudent from "./components/CreateStudent";
import EditStudent from "./components/EditStudent"
import DeleteStudent from "./components/DeleteStudent"

function App() {
  return (
    <Routes>
      <Route
        path="/students"
        element={
          <div className="app-container">
            <Table />
          </div>
        }
      />
      <Route
        path="/create-student"
        element={
          <div className="app-container">
            <CreateStudent />
          </div>
        }
      />
      <Route
      path = "/edit-student/:id"
      element = {
        <div className = "app-container">
          <EditStudent />
        </div>
      }
      />
      <Route
      path = "/delete-student/:id"
      element = {
        <div className = "app-container">
          <DeleteStudent/>
        </div>
      }
      />
    </Routes>
  );
}

export default App;