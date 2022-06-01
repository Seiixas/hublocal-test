import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { Singin } from "../components/Signin";
import { Signup } from "../components/Signup";

export function Paths() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Singin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}