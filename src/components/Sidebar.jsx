import React, { useState, useEffect } from 'react';
import { IconLayoutDashboard, IconUsers, IconCar, IconSettingsCog, IconWritingSign } from "@tabler/icons-react";
import { Link, useLocation,useNavigate } from 'react-router-dom';
import "../dist/SidebarModule.css";

const Sidebar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const navigate =useNavigate();
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);
    const handleNavigation =(path)=>{navigate(path);}

    return (
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
                    <li className={`item ${activeLink === '/admin/cars' ? 'active' : ''}`} onClick={()=>handleNavigation("/admin/cars")}>
                        <Link className='cars-link' to="/admin/cars"><IconCar className='icon'/>Voitures</Link>
                    </li>
                    <li className={`item ${activeLink === '/' ? 'active' : ''}`} onClick={()=>handleNavigation("/")}>
                        <Link className='manage-link' to="/"/*to change to keycloak account mangment*/ ><IconSettingsCog/>Manage-Account</Link>
                    </li>
                </ul>
            </aside>
        </div>
    );
}

export default Sidebar;
