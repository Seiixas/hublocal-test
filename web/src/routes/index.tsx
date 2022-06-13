import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { ViewCompany } from "../components/Companies/view";
import { ViewPlace } from "../components/Places/view";
import { ViewResponsible } from "../components/Responsible/view";
import { Tickets } from "../components/Tickets";
import { ViewTicket } from "../components/Tickets/view";

export function Paths() {
  const PrivateRouter = ({ children, redirectTo }: any) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    return isAuthenticated ? children : <Navigate to={redirectTo}/>
  }

  const PrivateRouterSignIn = ({ children, redirectTo }: any) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    return isAuthenticated ? <Navigate to={redirectTo} /> : children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/companies/edit/" element={<PrivateRouter redirectTo="/signin"><Edit /></PrivateRouter>}>
          <Route path=":id" element={<PrivateRouter redirectTo="/signin"><Edit /></PrivateRouter>} />
        </Route>
        <Route path="/companies/create" element={<PrivateRouter redirectTo="/signin"><CreateCompany /></PrivateRouter>} />
        <Route path="/companies" element={<PrivateRouter redirectTo="/signin"><Companies /></PrivateRouter>} />
        <Route path="/companies" element={<PrivateRouter redirectTo="/signin"><ViewCompany /></PrivateRouter>}>
          <Route path=":id" element={<PrivateRouter redirectTo="/signin"><ViewCompany /></PrivateRouter>} />
        </Route>

        <Route path="/places" element={<PrivateRouter redirectTo="/signin"><Places /></PrivateRouter>} />
        <Route path="/places" element={<PrivateRouter redirectTo="/signin"><ViewPlace /></PrivateRouter>}>
          <Route path=":id" element={<PrivateRouter redirectTo="/signin"><ViewPlace /></PrivateRouter>} />
        </Route>
        <Route path="/places/create" element={<PrivateRouter redirectTo="/signin"><CreatePlace /></PrivateRouter>} />
        <Route path="/places/edit/" element={<PrivateRouter redirectTo="/signin"><EditPlace /></PrivateRouter>}>
          <Route path=":id" element={<PrivateRouter redirectTo="/signin"><EditPlace /></PrivateRouter>} />
        </Route>

        <Route path="/responsible" element={<PrivateRouter redirectTo="/signin"><Responsible /></PrivateRouter>} />
        <Route path="/responsible" element={<PrivateRouter redirectTo="/signin"><ViewResponsible /></PrivateRouter>}>
          <Route path=":id" element={<PrivateRouter redirectTo="/signin"><ViewResponsible /></PrivateRouter>} />
        </Route>
        <Route path="/responsible/create" element={<PrivateRouter redirectTo="/signin"><CreateResponsible /></PrivateRouter>} />
        <Route path="/responsible/edit" element={<PrivateRouter redirectTo="/signin"><EditResponsible /></PrivateRouter>}>
          <Route path=":id" element={<PrivateRouter redirectTo="/signin"><EditResponsible /></PrivateRouter>} />
        </Route>


        <Route path="/tickets" element={<PrivateRouter redirectTo="/signin"><Tickets /></PrivateRouter>} />
        <Route path="/tickets" element={<PrivateRouter redirectTo="/signin"><ViewTicket /></PrivateRouter>}>
          <Route path=":id" element={<PrivateRouter redirectTo="/signin"><ViewTicket /></PrivateRouter>} />
        </Route>

        <Route path="/dashboard" element={<PrivateRouter redirectTo="/signin"><Dashboard /></PrivateRouter>} />
        <Route path="/signin" element={<PrivateRouterSignIn redirectTo="/dashboard"><Singin /></PrivateRouterSignIn>} />
        <Route path="/signup" element={<PrivateRouterSignIn redirectTo="/dashboard"><Signup /></PrivateRouterSignIn>} />
      
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}