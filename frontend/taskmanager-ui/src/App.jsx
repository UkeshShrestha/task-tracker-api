import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Task";
import Calculator from "./pages/calculator";

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}