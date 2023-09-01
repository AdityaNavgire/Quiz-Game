import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import ReportPage from "./components/reportPage";
import "./sass/main.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-page" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
