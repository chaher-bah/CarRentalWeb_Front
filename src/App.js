import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes ,useLocation} from "react-router-dom";
import { useEffect,useState } from "react";
import Models from "./Pages/Models";
import Contact from "./Pages/Contact";
import Page404 from "./Pages/Page404";
import Admin from "./Pages/Admin";
function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  
  useEffect(() => {
    const adminPaths = ['/admin/clients', '/admin/cars', '/admin/reservations'];
    setShowNavbar(!adminPaths.includes(location.pathname));
  }, [location]);
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="*"  element={<Page404/>}/>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin/*" element={<Admin/>}/>
      </Routes>
    </>
  );
}

export default App;
