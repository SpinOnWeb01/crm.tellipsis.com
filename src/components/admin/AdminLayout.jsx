


import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const drawerWidthOpen = 240;
const drawerWidthClosed = 70;


const Layout = ( {handleClick, selectedPortal, setSelectedPortal}) => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [colorThem, setColorThem] = useState(() => localStorage.getItem("theme-color") || "theme_blue");

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleThemeChange = (theme) => {
    setColorThem(theme);
    localStorage.setItem("theme-color", theme);
  };




  // Define theme styles
  const themeStyles = {
    theme_blue: {
      bgColor: '#f5f5f5',   // light background
      textColor: '#000000', // dark text
    },
    theme_white: {
      bgColor: '#121212',   // dark background
      textColor: '#f5f5f5', // light text
    },
  };

  return (
    <Box sx={{ display: 'flex' }} className={`App ${colorThem}`} id="admin1">


      {/* Header */}
      <Header
        colorThem={colorThem}
        handleClick={handleThemeChange}

        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
           selectedPortal={selectedPortal} setSelectedPortal={setSelectedPortal}
      />

      {/* Sidebar */}
      <Sidebar
        colorThem={colorThem}
        handleClick={handleThemeChange}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0.4,
          width: {
            xs: '100%',
            sm: `calc(100% - ${sidebarOpen ? drawerWidthOpen : drawerWidthClosed}px)`,
          },
          ml: {
            sm: `${sidebarOpen ? drawerWidthOpen : drawerWidthClosed}px`,
          },

          // transitionDuration: (theme) =>
          //   theme.transitionDuration.create(['margin', 'width'], {
          //     easing: theme.transitionDuration.easing.easeOut,
          //     duration: theme.transitionDuration.duration.standard,
          //   }),


          willChange: 'margin, width', // Optimizes performance
          backgroundColor: themeStyles[colorThem]?.bgColor || 'transparent',
          color: themeStyles[colorThem]?.textColor || '#000000',
          minHeight: '100vh',
          padding: '10px',
          borderRadius:'10px',
          position: 'relative', // Ensures proper stacking
          overflow: 'hidden', // Prevents content jitter
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;