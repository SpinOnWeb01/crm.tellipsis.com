import React, { useState, useEffect, useMemo } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Box, IconButton, Button, Tooltip, Typography } from "@mui/material";
import Router from "../../routes/route";
import KeyIcon from "@mui/icons-material/Key";
import { Call } from "@mui/icons-material";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import StyleIcon from "@mui/icons-material/Style";
import ReceiptIcon from "@mui/icons-material/Receipt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NightlightIcon from "@mui/icons-material/Nightlight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "../admin/adminstyle.css";

// ========Mobile-sidebar===============>
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { GET_ADMIN_ADD_BUYER_SUCCESS } from "../../redux/constants/adminPortal/adminPortal_addBuyerConstants";
// ========End Mobile-sidebar===============>

const menuConfig = {
  forwarding: [
    {
      label: "Usage Minutes",
      icon: <AvTimerIcon />,
      route: Router.ADMIN_BILLING_MINUTES,
    },
    {
      label: "Details",
      icon: <QueryBuilderIcon />,
      route: Router.ADMIN_MINUTES,
    },
    { label: "RCR", icon: <HistoryIcon />, route: Router.ADMIN_HISTORY },
    { label: "CMU", icon: <CalendarMonthIcon />, route: Router.ADMIN_CMU },
  ],
  default: [
    {
      label: "Usage Minutes",
      icon: <AvTimerIcon />,
      route: Router.ADMIN_BILLING_MINUTES,
    },
    {
      label: "Toll Free",
      icon: <QueryBuilderIcon />,
      route: Router.ADMIN_MINUTES,
    },
    {
      label: "Local",
      icon: <HistoryToggleOffIcon />,
      route: Router.ADMIN_LOCAL,
    },
    { label: "RCR", icon: <HistoryIcon />, route: Router.ADMIN_HISTORY },
  ],
};

function Sidebar({
  colorThem,
  handleClick,
  sidebarOpen,
  openSubMenu,
  setOpenSubMenu,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("selectedPortal");
  const [open, setOpen] = React.useState(false);
  const [openSettingMenu, setOpenSettingMenu] = useState(null);
  const [pageRedirect, setPageRedirect] = useState(false);
  const navigateTo = (route) => {
    setOpen(false);
    dispatch({
      type: GET_ADMIN_ADD_BUYER_SUCCESS,
      payload: [],
    });
    navigate(route);
    setOpenSubMenu(null); // Close submenu when navigating to a different route
    setOpenSettingMenu(null);
  };
  const drawerWidth = 240;
  const menuWidth = 200;

  const handleSubMenu = () => {
    if (openSettingMenu !== "setting") {
      setOpenSettingMenu("setting");
    } else if (openSettingMenu === "setting") {
      setOpenSettingMenu(null);
    }
  };

  const handleSubMenuClick = (event, route) => {
    event.stopPropagation(); // Prevent event bubbling
    navigate(route);
    setOpen(false);
  };

  //============sidebar =============>

  useEffect(() => {
    let activityTimeout;

    const resetActivityTimeout = () => {
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        localStorage.removeItem("theme-color");
        localStorage.removeItem("admin");
        setPageRedirect(true);
      }, 3600 * 3000); // 1 hour
    };

    const handleUserActivity = () => {
      resetActivityTimeout();
    };

    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keypress", handleUserActivity);

    resetActivityTimeout(); // Initialize activity timeout on component mount

    return () => {
      clearTimeout(activityTimeout); // Cleanup event listeners and timeout on component unmount
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keypress", handleUserActivity);
    };
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  // ======Mobile sidebar======>

  const toggleDrawer = () => () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Close the sidebar when switching between mobile and desktop views
    setOpen(false);
  }, [drawerWidth]);

  const selectedPortal =
    useSelector((state) => state.portal?.selectedPortal) ||
    localStorage.getItem("selectedPortal");

  const activeMenu = useMemo(() => {
    return menuConfig[selectedPortal] || menuConfig.default;
  }, [selectedPortal]);
  const DrawerList = (
    // <Box id="side_bar_screen" sx={{ width: menuWidth, background: "#333", }} role="presentation">
    <Box id="side_bar_screen" sx={{ width: menuWidth }} role="presentation">
      <ProSidebar id="admin_sidebar" style={{ background: "#333" }}>
        <Box className="mobile_logo pt-2 pb-2">
          <a href="/admin_portal" className="mobile_logo_center">
            <img
              src="/img/logo_white11.png"
              alt="Manage Logo"
              className="img-fluid d-block"
              style={{ cursor: "pointer" }}
            />
          </a>
        </Box>
        <Menu iconShape="square">
          <MenuItem
            icon={<HomeOutlinedIcon />}
            onClick={() => navigateTo(Router.ADMIN_DASHBOARD)}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<PeopleOutlinedIcon />}
            onClick={() => navigateTo(Router.ADMIN_USER)}
          >
            User
          </MenuItem>
          <MenuItem
            icon={<ReceiptOutlinedIcon />}
            onClick={(event) => navigateTo(Router.ADMIN_DID_TFN_NUMBER)}
          >
            DID Number
          </MenuItem>

          <SubMenu
            title="Products"
            icon={<AddToQueueIcon />}
            onClick={() =>
              setOpenSubMenu(openSubMenu === "products" ? null : "products")
            }
            open={openSubMenu === "products"}
          >
            <MenuItem
              icon={<CardGiftcardIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_PRODUCT)
              }
            >
              Add Products
            </MenuItem>
            <Tooltip title="Invoice" disableInteractive interactive>
              <MenuItem
                icon={<ReceiptIcon />}
                onClick={(event) =>
                  handleSubMenuClick(event, Router.ADMIN_INVOICE)
                }
              >
                Invoice
              </MenuItem>
            </Tooltip>
          </SubMenu>

          <MenuItem
            icon={<HelpOutlineOutlinedIcon />}
            onClick={() => navigateTo(Router.ADMIN_REPORT)}
          >
            Report
          </MenuItem>

          <SubMenu
            title="Billing"
            icon={<AccountBalanceWalletIcon />}
            onClick={() =>
              setOpenSubMenu(openSubMenu === "billing" ? null : "billing")
            }
            open={openSubMenu === "billing"}
          >
            <MenuItem
              icon={<AvTimerIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_BILLING_MINUTES)
              }
            >
              Usage Minutes
            </MenuItem>
            <MenuItem
              icon={<AvTimerIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_MINUTES)
              }
            >
              Details
            </MenuItem>

            <MenuItem
              icon={<HistoryIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_HISTORY)
              }
            >
              RCR
            </MenuItem>
            <MenuItem
              icon={<CalendarMonthIcon />}
              onClick={(event) => handleSubMenuClick(event, Router.ADMIN_CMU)}
            >
              CMU
            </MenuItem>
          </SubMenu>

          {/*  */}

          <MenuItem
            icon={<VerifiedUserIcon />}
            onClick={(event) => navigateTo(Router.ADMIN_AUDIT_LOGS)}
          >
            Audit logs
          </MenuItem>

          <MenuItem
            icon={<PeopleAltIcon />}
            onClick={() => navigateTo(Router.ADMIN_ROLES)}
          >
            Roles
          </MenuItem>
          <MenuItem
            icon={<AssignmentIndIcon />}
            onClick={() => navigateTo(Router.ADMIN_PERMISSIONS_ACCESS)}
          >
            Permissions
          </MenuItem>
        </Menu>
      </ProSidebar>

      <Box
        sx={{
           position: "relative", // ✅ stays fixed on screen
                            // bottom: "-1rem", // ✅ distance from bottom
                            left: "50%",
                            transform: "translate(-50%, 15%)",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                            justifyContent: "center",
                            zIndex: 1300,
          // position: "absolute",
          // bottom: "6%",
          // left: "40%",
          // transform: "translate(-50%, 0)",
          // display: "flex",
          // flexDirection: "row",
          // alignItems: "center",
          // gap: "0px",
          // zIndex: "9999",
        }}
      >
        <Tooltip
          title={colorThem === "theme_blue" ? "Light Mode" : "Dark Mode"}
          placement="right"
        >
          <IconButton
            onClick={() =>
              handleClick(
                colorThem === "theme_blue" ? "theme_white" : "theme_blue"
              )
            }
          >
            {colorThem === "theme_blue" ? (
              <DarkModeIcon
                sx={{
                  color: "#fff",
                  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))",
                }}
              />
            ) : (
              <NightlightIcon
                sx={{
                  color: "#fff",
                  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
                }}
              />
            )}
          </IconButton>
        </Tooltip>

        <Typography
          variant="caption"
          sx={{
            color: "rgba(241, 241, 241, 0.9)",
            fontWeight: 500,
            fontSize: "0.75rem",
            textAlign: "center",
            textShadow: "0 1px 2px rgba(133, 133, 133, 0.1)",
          }}
        >
          {colorThem === "theme_blue" ? "Dark Mode" : "Light Mode"}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <div id="app" style={{}}>
        <Box
          sx={{
            "& .pro-sidebar-inner": {
              background: "#41454E",
              borderTop: "1px solid rgb(212 212 212)",
              width: sidebarOpen ? "240px" : "70px",
              height: "100vh",
              borderRight: "1px solid rgb(212 212 212)",
              overflow: "hidden",
              position: "relative",
              willChange: "transform",
            },
            "& .pro-icon-wrapper": {
              backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
              padding: "5px 35px 5px 5px !important",
              // borderBottom: "1px solid #f2f7ffc9",
              borderBottom: "1px solid #f2f7ff30",
              color: "#fff",
            },
            "& .pro-inner-item:hover": {
              color: "#999A9A !important",
            },
            "& .pro-menu-item.active": {
              color: "#fff !important",
            },
          }}
        >
          <div className={`App ${colorThem} `}>
            <div className="contant_box">
              <Box
                className="right_sidebox pt-4 d-lg-none d-md-none d-sm-block d-xs-block d-block"
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  // width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <Button
                      className="menu_icon_button_box"
                      style={{
                        position: "relative",
                        zIndex: "999",
                        top: "-40px",
                      }}
                      onClick={toggleDrawer(true)}
                    />
                    <IconButton
                      style={{
                        position: "relative",
                        zIndex: "999",
                        top: "-40px",
                      }}
                      className="menu_icon_button menu_icon_button_box"
                      onClick={toggleDrawer(true)}
                    >
                      <MenuIcon />
                    </IconButton>

                    <Drawer open={open} onClose={toggleDrawer(false)}>
                      {DrawerList}
                    </Drawer>
                  </div>
                </div>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                  width: sidebarOpen ? 240 : 70,
                  transition:
                    "width 0.3s ease-in-out, margin-left 0.3s ease-in-out", // Smooth width and margin transition

                  flexShrink: 0,
                }}
              >
                <div className="d-lg-block d-md-block d-sm-none d-xs-none d-none side_bar_media">
                  <Box collapsed={sidebarOpen}>
                    <ProSidebar
                      id="admin_sidebar"
                      style={{ background: "#ffffff", color: "black" }}
                    >
                      <Menu iconShape="square">
                        <MenuItem
                          icon={<HomeOutlinedIcon />}
                          onClick={() => navigateTo(Router.ADMIN_DASHBOARD)}
                        >
                          Dashboard
                        </MenuItem>

                        <MenuItem
                          icon={<PeopleOutlinedIcon />}
                          onClick={() => navigateTo(Router.ADMIN_USER)}
                        >
                          User
                        </MenuItem>

                        <MenuItem
                          icon={<ReceiptOutlinedIcon />}
                          onClick={(event) =>
                            navigateTo(Router.ADMIN_DID_TFN_NUMBER)
                          }
                        >
                          DID Number
                        </MenuItem>
                        {/* ==add-menu======= */}
                        <SubMenu
                          title="Products"
                          icon={<AddToQueueIcon />}
                          onClick={() =>
                            setOpenSubMenu(
                              openSubMenu === "products" ? null : "products"
                            )
                          }
                          open={openSubMenu === "products"}
                        >
                          <MenuItem
                            icon={<CardGiftcardIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.ADMIN_PRODUCT)
                            }
                          >
                            Add Products
                          </MenuItem>
                          <Tooltip
                            title="Invoice"
                            disableInteractive
                            interactive
                          >
                            <MenuItem
                              icon={<ReceiptIcon />}
                              onClick={(event) =>
                                handleSubMenuClick(event, Router.ADMIN_INVOICE)
                              }
                            >
                              Invoice
                            </MenuItem>
                          </Tooltip>
                        </SubMenu>
                        <MenuItem
                          icon={<HelpOutlineOutlinedIcon />}
                          onClick={() => navigateTo(Router.ADMIN_REPORT)}
                        >
                          Report
                        </MenuItem>
                        <SubMenu
                          title="Billing"
                          icon={<AccountBalanceWalletIcon />}
                          onClick={() =>
                            setOpenSubMenu(
                              openSubMenu === "billing" ? null : "billing"
                            )
                          }
                          open={openSubMenu === "billing"}
                        >
                          {activeMenu.map((item) => (
                            <MenuItem
                              key={item.label}
                              icon={item.icon}
                              onClick={(event) =>
                                handleSubMenuClick(event, item.route)
                              }
                            >
                              {item.label}
                            </MenuItem>
                          ))}
                        </SubMenu>

                        {/* <SubMenu
                          title="Settings"
                          icon={<SettingsIcon />}
                          onClick={() => handleSubMenu()}
                          open={openSettingMenu === "setting"}
                        > */}

                        <MenuItem
                          icon={<VerifiedUserIcon />}
                          onClick={(event) =>
                            navigateTo(Router.ADMIN_AUDIT_LOGS)
                          }
                        >
                          Audit logs
                        </MenuItem>
                        <MenuItem
                          icon={<PeopleAltIcon />}
                          onClick={() => navigateTo(Router.ADMIN_ROLES)}
                        >
                          Roles
                        </MenuItem>
                        <MenuItem
                          icon={<AssignmentIndIcon />}
                          onClick={() =>
                            navigateTo(Router.ADMIN_PERMISSIONS_ACCESS)
                          }
                        >
                          Permissions
                        </MenuItem>

                        <Box
                          sx={{
                            position: "relative", // ✅ stays fixed on screen
                            // bottom: "-1rem", // ✅ distance from bottom
                            left: "50%",
                            transform: "translate(-50%, 15%)",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                            justifyContent: "center",
                            zIndex: 1300,
                          }}
                        >
                          <Tooltip
                            title={
                              colorThem === "theme_blue"
                                ? "Light Mode"
                                : "Dark Mode"
                            }
                            placement="right"
                          >
                            <IconButton
                              onClick={() =>
                                handleClick(
                                  colorThem === "theme_blue"
                                    ? "theme_white"
                                    : "theme_blue"
                                )
                              }
                            >
                              {colorThem === "theme_blue" ? (
                                <DarkModeIcon
                                  sx={{
                                    color: "#333",
                                    filter:
                                      "drop-shadow(0 1px 2px rgba(0, 0, 0, 1))",
                                  }}
                                />
                              ) : (
                                <NightlightIcon
                                  sx={{
                                    color: "#fff",
                                    filter:
                                      "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
                                  }}
                                />
                              )}
                            </IconButton>
                          </Tooltip>
                          {sidebarOpen && (
                            <Typography
                              variant="caption"
                              sx={{
                                color:
                                  colorThem === "theme_blue"
                                    ? "rgba(14, 14, 14, 0.9)"
                                    : "rgba(241, 241, 241, 0.9)",
                                fontWeight: 500,
                                fontSize: "0.75rem",
                                textAlign: "center",
                                textShadow:
                                  colorThem === "theme_blue"
                                    ? "0 1px 2px rgba(34, 34, 34, 0.4)"
                                    : "0 1px 2px rgba(133, 133, 133, 0.1)",
                              }}
                            >
                              {colorThem === "theme_blue"
                                ? "Dark Mode"
                                : "Light Mode"}
                            </Typography>
                          )}
                        </Box>

                        {/* light and dark mode */}
                      </Menu>
                    </ProSidebar>
                  </Box>
                </div>
              </Box>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}

export default Sidebar;
