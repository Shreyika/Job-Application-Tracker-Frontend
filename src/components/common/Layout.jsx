import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const { pathname } = useLocation();
  const isPortal = pathname === '/candidate-dashboard' || pathname === '/recruiter-dashboard';

  return (
    <div>
        {/* {!isPortal && <Navbar/>}
        <Outlet/>
        {!isPortal && <Footer/>} */}

         {/* <Navbar />
      <Outlet />
      <Footer /> */}
    <Navbar />
            <Outlet />
            <Footer />
        

    </div>
  )
}

export default Layout
