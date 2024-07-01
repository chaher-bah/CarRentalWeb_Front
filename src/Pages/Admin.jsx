import React ,{useEffect,useState ,lazy,Suspense}from 'react'
import "../dist/AdminModule.css"
import {Route, Routes,useLocation} from 'react-router-dom';
import Page404 from "../Pages/Page404"
const Reservations =lazy(()=>import('../components/Reservations'));
const TemplatePage=lazy(() =>import( '../components/TemplatePage'));
const Cars = lazy(()=> import ('../components/Cars'));
const Dashboard =lazy(()=>import( '../components/Dashboard'));
const Clients=lazy(()=>import('../components/Clients'));
const Sidebar= lazy(()=>import( '../components/Sidebar'));


const Admin =() =>{
    const location = useLocation();
    const [isSpecialAdminPath, setIsSpecialAdminPath] = useState(false);

useEffect(() => {
    setIsSpecialAdminPath(['/admin/clients', '/admin/cars', '/admin/reservations'].includes(location.pathname));
}, [location]);
  return (
    <><Suspense fallback={<Page404/>}>
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
    </Suspense></>
  )
}
export default Admin;
