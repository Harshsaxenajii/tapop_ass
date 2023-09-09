import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NotFound from "./screens/NotFound";
import Navbar from "./components/Navbar";
import UploadImage from "./screens/UploadImage";
import { useAuth } from "./firebase";

function App() {
  const currentUser = useAuth();
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
