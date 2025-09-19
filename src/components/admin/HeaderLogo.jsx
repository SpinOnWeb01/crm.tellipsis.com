
import React from 'react'

function HeaderLogo( {sidebarOpen, colorThem, toggleSidebar}) {

  return (
    <>

        <img
          src={
            sidebarOpen
              ? colorThem === "theme_blue"
                ? "/img/logo_white11b.png"
                : "/img/logo_white11.png"
              : colorThem === "theme_blue"
              ? "/img/logo_iconsmallb.png"
              : "/img/logo_iconsmall.webp"
          }
          className="logo-img1 transition-all duration-300 ease-in-out"
          style={{
            width: sidebarOpen ? 130 : 40, 
           
          }}
          alt="logo"
        />
    
    </>
  )
}

export default HeaderLogo