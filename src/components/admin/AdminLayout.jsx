import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const drawerWidthOpen = 240;
const drawerWidthClosed = 70;

const Layout = ({ handleClick, selectedPortal, setSelectedPortal }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [colorThem, setColorThem] = useState(
    () => localStorage.getItem("theme-color") || "theme_blue"
  );
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ Loader state

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleThemeChange = (theme) => {
    setColorThem(theme);
    localStorage.setItem("theme-color", theme);
  };

  const themeStyles = {
    theme_blue: { bgColor: "#f5f5f5", textColor: "#000000" },
    theme_white: { bgColor: "#121212", textColor: "#f5f5f5" },
  };

  return (
    <Box sx={{ display: "flex" }} className={`App ${colorThem}`} id="admin1">
      {/* Header */}
      <Header
        colorThem={colorThem}
        handleClick={handleThemeChange}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        selectedPortal={selectedPortal}
        setSelectedPortal={setSelectedPortal}
        setOpenSubMenu={setOpenSubMenu}
        setLoading={setLoading} // ✅ Pass loader setter to header
      />

      {/* Sidebar */}
      <Sidebar
        colorThem={colorThem}
        handleClick={handleThemeChange}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        openSubMenu={openSubMenu}
        setOpenSubMenu={setOpenSubMenu}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0.4,
          width: {
            xs: "100%",
            sm: `calc(100% - ${
              sidebarOpen ? drawerWidthOpen : drawerWidthClosed
            }px)`,
          },
          ml: {
            sm: `${sidebarOpen ? drawerWidthOpen : drawerWidthClosed}px`,
          },
          willChange: "margin, width",
          backgroundColor: themeStyles[colorThem]?.bgColor || "transparent",
          color: themeStyles[colorThem]?.textColor || "#000000",
          minHeight: "100vh",
          padding: "10px",
          borderRadius: "10px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ✅ Fullscreen Loader Overlay */}
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.6)",
              zIndex: 9999,
            }}
          >
            <CircularProgress size={60} />
          </Box>
        )}

        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
