import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Singin } from "../components/Signin";
import { Signup } from "../components/Signup";

export function Paths() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Singin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}