import "../src/dist/styles.css";
import Navbar from "../src/components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Page404 from "./Pages/Page404";
import Home from "./Pages/Home";
import ProtectedAdminRoute from '../src/Auth/ProtectedAdminRoute';
import { Toaster } from "react-hot-toast";
import { keycloak } from "./Auth/KeycloakService";
const Models = lazy(() => import("./Pages/Models"));
const Contact = lazy(() => import("./Pages/Contact"));
const About = lazy(() => import("./Pages/About"));
const Admin = lazy(() => import("./Pages/Admin"));

function App() {
  console.log(keycloak)
  console.log(keycloak.hasRealmRole('adminRole'))
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  
  useEffect(() => {
    const adminPaths = ['/admin/clients', '/admin/cars', '/admin/reservations', '/admin/calendrier'];
    setShowNavbar(!adminPaths.includes(location.pathname));
  }, [location]);

  return (
    <>
     <Toaster containerStyle={{
        top: 100,
        left: 320,
        inset: '50px 16px 16px 12px'
      }} />
      {showNavbar && <Navbar />}
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route index path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="models" element={<Models />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="admin/*" element={<Admin />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;