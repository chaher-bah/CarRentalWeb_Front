import React from 'react'
import TemplatePage from '../components/TemplatePage';
import Sidebar from '../components/Sidebar';
import "../dist/AdminModule.css"
import Dashboard from '../components/Dashboard';
 function Admin() {
  return (
    <>
        <section className='admin-page'>
            <TemplatePage name="Admin"/>
            <div className='dash-container'>
                <div className='admin-div'>
                    <Sidebar/>
                </div>
                <Dashboard/>
            </div>
        </section>
    </>
  )
}
export default Admin;
