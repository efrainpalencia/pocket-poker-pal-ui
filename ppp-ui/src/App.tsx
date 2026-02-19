import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ChatPage from "./pages/ChatPage";
import InstallPage from "./pages/InstallPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="about" element={<About />} />
          <Route path="/install" element={<InstallPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
