import React, { useState, useEffect } from 'react';
import { IconLayoutDashboard, IconUsers, IconCar, IconSettingsCog, IconWritingSign,IconCalendarMonth } from "@tabler/icons-react";
import { Link, useLocation,useNavigate } from 'react-router-dom';
import "../dist/SidebarModule.css";
import { keycloak } from '../Auth/KeycloakService';
import toast from 'react-hot-toast';
export const handleAccountManagement = () => {
    if (keycloak && keycloak.authenticated) {
        window.open(keycloak.createAccountUrl(), '_blank');
    } else {
      console.error('User is not authenticated or Keycloak is not initialized');
      toast.error("Erreur lors de l'accees au compte ", {
        style: {
          fontSize: '2rem',
          fontWeight: '700',
          fontFamily: 'Roboto,sansSerif',
          border: '2px solid red'
        },
        duration: 7000
      });
    }
};
const Sidebar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const navigate =useNavigate();
    
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);
    const handleNavigation =(path)=>{navigate(path);}
    
    return (<>
        <div className='sidebar-container'>
            <aside>
                <ul className='sidebar__links'>
                    <li className={`item ${activeLink === '/admin' ? 'active' : ''}`} onClick={()=>handleNavigation("/admin")}>
                        <Link to="/admin" className='dashboard-link'><IconLayoutDashboard className='icon'/> Dashboard</Link>
                    </li>
                    <li className={`item ${activeLink === '/admin/clients' ? 'active' : ''}`}onClick={()=>handleNavigation("/admin/clients")}>
                        <Link className='clients-link' to="/admin/clients"><IconUsers className='icon'/>Clients</Link>
                    </li>
                    <li className={`item ${activeLink === '/admin/reservations' ? 'active' : ''}`} onClick={()=>handleNavigation("/admin/reservations")}>
                        <Link className='reservations-link' to="/admin/reservations"><IconWritingSign className='icon'/>Reservations</Link>
                    </li>
                    <li className={`item ${activeLink === '/admin/calendrier' ? 'active' : ''}`} onClick={()=>handleNavigation("/admin/calendrier")}>
                        <Link className='calendar-link' to="/admin/cars"><IconCalendarMonth className='icon'/>Calendrier</Link>
                    </li>
                    <li className={`item ${activeLink === '/admin/cars' ? 'active' : ''}`} onClick={()=>handleNavigation("/admin/cars")}>
                        <Link className='cars-link' to="/admin/cars"><IconCar className='icon'/>Voitures</Link>
                    </li>
                    <li className={`item ${activeLink === '/' ? 'active' : ''}`} onClick={handleAccountManagement}>
                        <span className='manage-link' /*to change to keycloak account mangment*/ ><IconSettingsCog/>Manage-Account</span>
                    </li>
                </ul>
            </aside>
        </div>
        {/* Mobile */ }
        <div className='mobile-sidebar'>
            <ul className='mobile-sidebar__links'>
                
                <li className={`item ${activeLink === '/admin' ? 'active' : ''}`} onClick={()=>handleNavigation("/admin")}>
                    <Link to="/admin" className='dashboard-link'><IconLayoutDashboard className='icon'/></Link>
                </li>
                <li className={`item ${activeLink === '/admin/clients' ? 'active' : ''}`}onClick={()=>handleNavigation("/admin/clients")}>
                    <Link className='clients-link' to="/admin/clients"><IconUsers className='icon'/></Link>
                </li>
                <li className={`item ${activeLink === '/admin/reservations' ? 'active' : ''}`} onClick={()=>handleNavigation("/admin/reservations")}>
                    <Link className='reservations-link' to="/admin/reservations"><IconWritingSign className='icon'/></Link>
                </li>
                <li className={`item ${activeLink === '/admin/calendrier' ? 'active' : ''}`} onClick={()=>handleNavigation("/admin/calendrier")}>
                    <Link className='calendar-link' to="/admin/calendrier"><IconCalendarMonth className='icon'/></Link>
                </li>
                <li className={`item ${activeLink === '/admin/cars' ? 'active' : ''}`} onClick={()=>handleNavigation("/admin/cars")}>
                    <Link className='cars-link' to="/admin/cars"><IconCar className='icon'/></Link>
                </li>
                <li className={`item ${activeLink === '/' ? 'active' : ''}`} onClick={handleAccountManagement}>
                    <span className='manage-link' /*to change to keycloak account mangment*/ ><IconSettingsCog/>Manage-Account</span>
                </li>
            </ul>
        </div>
    </>);
}

export default Sidebar;
