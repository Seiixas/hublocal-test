import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Companies } from "../components/Companies";
import { CreateCompany } from "../components/Companies/create";
import { CreatePlace } from "../components/Places/create";
import { Edit } from "../components/Companies/edit";
import { Dashboard } from "../components/Dashboard";
import { Places } from "../components/Places";
import { Singin } from "../components/Signin";
import { Signup } from "../components/Signup";
import { EditPlace } from "../components/Places/edit";
import { Responsible } from "../components/Responsible";
import { CreateResponsible } from "../components/Responsible/create";
import { EditResponsible } from "../components/Responsible/edit";

export function Paths() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/companies/edit" element={<Edit />} />
        <Route path="/companies/create" element={<CreateCompany />} />
        <Route path="/companies" element={<Companies />} />

        <Route path="/places" element={<Places />} />
        <Route path="/places/create" element={<CreatePlace />} />
        <Route path="/places/edit" element={<EditPlace />} />

        <Route path="/responsible" element={<Responsible />} />
        <Route path="/responsible/create" element={<CreateResponsible />} />
        <Route path="/responsible/edit" element={<EditResponsible />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Singin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}