import React ,{useEffect,useState}from 'react'
import TemplatePage from '../components/TemplatePage';
import Sidebar from '../components/Sidebar';
import "../dist/AdminModule.css"
import Dashboard from '../components/Dashboard';
import {Route, Routes,useLocation} from 'react-router-dom';
import Clients from '../components/Clients';
import Cars from '../components/Cars';
import Reservations from '../components/Reservations';
const Admin =() =>{
    const location = useLocation();
    const [isSpecialAdminPath, setIsSpecialAdminPath] = useState(false);

useEffect(() => {
    setIsSpecialAdminPath(['/admin/clients', '/admin/cars', '/admin/reservations'].includes(location.pathname));
}, [location]);
  return (
    <>
        <section className='admin-page'>
            {!isSpecialAdminPath && <TemplatePage name="Admin" />}
            <div className={`dash-container ${isSpecialAdminPath ? 'hide-template' : ''}`}>
                <div className='admin-div'>
                    <Sidebar/>
                </div>
                <Routes>
                <Route path='/' element={<Dashboard/>}></Route>
                <Route path='/clients' element={<Clients/>}></Route>
                <Route path='/cars' element={<Cars/>}></Route>
                <Route path='/reservations'element={<Reservations/>}></Route>
                </Routes>
            </div>
        </section>
    </>
  )
}
export default Admin;
