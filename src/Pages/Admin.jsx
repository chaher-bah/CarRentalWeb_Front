import React from 'react'
import TemplatePage from '../components/TemplatePage';
import Sidebar from '../components/Sidebar';
import "../dist/AdminModule.css"
import Dashboard from '../components/Dashboard';
import {Route, Routes} from 'react-router-dom';
import Clients from '../components/Clients';
 function Admin() {
  return (
    <>
        <section className='admin-page'>
            <TemplatePage name="Admin"/>
            <div className='dash-container'>
                <div className='admin-div'>
                    <Sidebar/>
                </div>
                <Routes>
                <Route path='/' element={<Dashboard/>}></Route>
                <Route path='/clients' element={<Clients/>}></Route>
                </Routes>
            </div>
        </section>
    </>
  )
}
export default Admin;
