import "../src/dist/styles.css";
import Navbar from "../src/components/Navbar";
import { Route, Routes ,useLocation} from "react-router-dom";
import { lazy, Suspense, useEffect,useState } from "react";
import Page404 from "./Pages/Page404";
import Home from "./Pages/Home";
const Models =lazy(()=>import("./Pages/Models"));
const Contact=lazy(()=>import( "./Pages/Contact"));
const About=lazy(()=>import("./Pages/About"));
const Admin=lazy(()=>import("./Pages/Admin"));

function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  
  useEffect(() => {
    const adminPaths = ['/admin/clients', '/admin/cars', '/admin/reservations','/admin/calendrier'];
    setShowNavbar(!adminPaths.includes(location.pathname));
  }, [location]);
  return (
    
    <>
      {showNavbar && <Navbar />}
      <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="*"  element={<Page404/>}/>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin/*" element={<Admin/>}/>
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
