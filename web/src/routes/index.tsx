import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Create } from "../components/companies/Create";
import { Singin } from "../components/Signin";
import { Signup } from "../components/Signup";

export function Paths() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/companies/create" element={<Create />}/>
        <Route path="/signin" element={<Singin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}