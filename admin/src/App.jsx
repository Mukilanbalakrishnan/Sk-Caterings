import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHome from "./components/DashboardHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
      </Routes>
    </Router>
  );
}

export default App;
