import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Companies } from "../components/Companies";
import { Create } from "../components/Companies/create";
import { Edit } from "../components/Companies/edit";
import { Dashboard } from "../components/Dashboard";
import { Singin } from "../components/Signin";
import { Signup } from "../components/Signup";

export function Paths() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/companies/edit" element={<Edit />} />
        <Route path="/companies/create" element={<Create />} />
        <Route path="/companies" element={<Companies />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Singin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}