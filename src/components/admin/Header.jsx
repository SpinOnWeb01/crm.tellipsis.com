import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../../src/style.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import Navbar from "./Navbar";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "../../Switcher.scss";
import { api } from "../../mockData";
import {
  getAllUsers,
  getRoleUsers,
  login,
} from "../../redux/actions/userAction";
import { setPortal, setPortalToken } from "../../redux/slices/portalSlice";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HeaderLogo from "./HeaderLogo";
import { Image } from "react-bootstrap";
import { ALL_USERS_SUCCESS } from "../../redux/constants/userConstants";
import { GET_ADMIN_AUDIT_LOGS_SUCCESS } from "../../redux/constants/adminPortal_auditLogsConstants";
import { GET_ADMIN_ROLES_SUCCESS } from "../../redux/constants/adminPortal_rolesConstants";

function Header({
  colorThem,
  handleClick,
  toggleSidebar,
  sidebarOpen,
  selectedPortal,
  setSelectedPortal,
}) {
  const state = useSelector((state) => state?.user?.user);
  const user = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location?.state;

  useEffect(() => {
    // Page load hone par localStorage se value set karo
    const savedPortal = localStorage.getItem("selectedPortal") || "";
    setSelectedPortal(savedPortal);
  }, []);

  // useEffect(() => {
  //       localStorage.removeItem("selectedPortal");
  //   Object.keys(localStorage).forEach((key) => {
  //     if (key.endsWith("_token")) {
  //       localStorage.removeItem(key);
  //       // dispatch(getAllUsers("t"));
  //     }
  //   });
  // }, [selectedPortal]);

  const logout = async () => {
    const token = JSON.parse(localStorage.getItem("crm_token"));
    const config = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.access_token} `,
    };
    const { data } = await axios.post(
      `${api.dev}/api/logout`,
      {},
      {
        headers: config,
      }
    );
    if (data?.status === 200) {
      toast.info(data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      localStorage.removeItem("theme-color");
      localStorage.removeItem("admin");
      localStorage.removeItem("selectedPortal");
      Object.keys(localStorage).forEach((key) => {
        if (key.endsWith("_token")) {
          localStorage.removeItem(key);
        }
      });
      navigate("/");
    }
  };

  const portalAPIs = {
    crm: "https://crm.tellipsis.com/api",
    sip: "https://devsip.all8series.com/api",
    forwarding: "https://devredirect.tellipsis.com/api",
    manage: "https://dev.tellipsis.com/api",
  };

  // ✅ Har portal ke liye static credentials
  const credentials = {
    crm: { username: "superadmin", password: "Super@2025" },
    sip: { username: "superadmin", password: "Supertest!@2025" },
    manage: { username: "superadmin", password: "Supertest!@2025" },
    forwarding: { username: "superadmin", password: "Super!@2025" },
  };

  const handlePortalChange = (event) => {
    const selectedPortal = event.target.value;
    setSelectedPortal(selectedPortal); // ✅ UI update
    //login(selectedPortal); // ✅ Login function call (jo tumne banaya hai)
    // ✅ Purane token remove kar do

    if (selectedPortal === "crm") {
      dispatch({ type: ALL_USERS_SUCCESS, payload: [] });
      dispatch({ type: GET_ADMIN_AUDIT_LOGS_SUCCESS, payload: [] });
      dispatch({
        type: GET_ADMIN_ROLES_SUCCESS,
        payload: [],
      });

      // ✅ crm ko store karo
      localStorage.setItem("selectedPortal", "crm");

      // ✅ baaki portals ke tokens clean karo
      localStorage.removeItem("sip_token");
      localStorage.removeItem("manage_token");
      localStorage.removeItem("forwarding_token");

      dispatch(setPortal({ portal: "crm" }));

      toast.success("CRM selected successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      navigate("/admin_portal");
      return;
    }

    if (!selectedPortal || !credentials[selectedPortal]) return;

    const { username, password } = credentials[selectedPortal];
    const payload = JSON.stringify({ username, password });

    // ✅ Correct login API mapping
    const loginURL = `${portalAPIs[selectedPortal]}/login`;

    const config = {
      method: "post",
      url: loginURL,
      headers: { "Content-Type": "application/json" },
      data: payload,
    };

    axios
      .request(config)
      .then((response) => {
        const values = response?.data;

        if (values?.status === 200) {
          localStorage.setItem("selectedPortal", selectedPortal);
          localStorage.setItem(
            `${selectedPortal}_token`,
            JSON.stringify(values)
          );
          dispatch(setPortal({ portal: selectedPortal }));
          dispatch(setPortalToken({ portal: selectedPortal, token: values }));

          dispatch(login(values));

          // dispatch(getAllUsers("t"));
          dispatch(getRoleUsers());
          if (selectedPortal !== "crm") {
            toast.success(`${selectedPortal} login successful`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
          }
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Login failed", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      });
  };

  return (
    <>
      <div className={`App ${colorThem} `} sx={{ zIndex: "99999!important" }}>
        <div className="contant_box">
          <Box sx={{ flexGrow: 1 }} className={`App ${colorThem} manage_boxx`}>
            <AppBar position="static" className="manage_top_header1">
              <Box className="manage_mobile_logo d-lg-none d-md-none d-sm-block d-block">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  className="d-flex align-items-center justify-space-between"
                >
                  <a href="/admin_portal" className="mobile_logo_center">
                    <img
                      src="/img/logo_white11.png"
                      alt="Manage Logo"
                      className="img-fluid d-block"
                      style={{ cursor: "pointer" }}
                    />
                  </a>
                </Typography>
              </Box>

              <Toolbar>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                  className="d-flex align-items-center d-block logo_image d-lg-block d-md-block d-sm-none d-none"
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Link
                      to="/admin_portal"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {/* Big Logo */}

                      {/* {sidebarOpen ? (
                        <img
                          src={
                            colorThem === "theme_blue"
                              ? "/img/logo_white11b.png"
                              : "/img/logo_white11.png"
                          }
                          className={`logo-img transition-logo ${
                            sidebarOpen ? "show" : "hide"
                          }`}
                          width={130}
                          alt="logo"
                        />
                         ) : (
                        <img
                          src={
                            colorThem === "theme_blue"
                              ? "/img/logo_iconsmallb.png"
                              : "/img/logo_iconsmall.webp"
                          }
                          className={`small-logo-img transition-logo ${
                            sidebarOpen ? "hide" : "show"
                          }`}
                          style={{ width: "40px" }}
                          alt="small-logo"
                        />
                      )} */}

                      <Image
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
                    </Link>

                    {/* Toggle Button */}
                    <IconButton
                      onClick={() => toggleSidebar(!sidebarOpen)}
                      sx={{
                        ml: 2,
                        color: "white",
                      }}
                    >
                      {sidebarOpen ? <MenuIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  </Box>
                </Box>

                <div className="manage_rgiht_bdr d-flex align-items-center justify-content-between me-lg-0 me-md-0 m-auto gap-2">
                  <Box
                    className="admin_header_cp"
                    sx={{ position: "relative", zIndex: 1, Width: "200px" }}
                  >
                    <div className="mt-1" sx={{ minWidth: "150px" }}>
                      <select
                        className="form-select form-select-sm"
                        id="Portal-select"
                        aria-label="Select Portal"
                        value={selectedPortal}
                        onChange={handlePortalChange}
                      >
                        <option selected value="crm">
                          Choose Portal
                        </option>
                        <option value="sip">devsip.all8series.com</option>
                        <option value="forwarding">
                          devredirect.tellipsis.com
                        </option>
                        <option value="manage">dev.tellipsis.com</option>
                      </select>
                    </div>
                  </Box>
                  <div className="dshbrd_hdr_icon">
                    <ul>
                      <li>
                        <ul className="hdr_profile">
                          <li>
                            {/* Add a class to the image element */}
                            <img
                              src="/img/nav_author.jpg"
                              className="img-fluid d-block rounded-circle" // Apply rounded-circle class for circular display
                              alt="profile"
                            />

                            <div className="profile_name">
                              <b>{user?.user_name}</b>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <Tooltip title="Logout" disableInteractive interactive>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      style={{ paddingRight: "0" }}
                      onClick={logout}
                    >
                      <LogoutIcon
                        className="call_icon "
                        sx={{
                          fill: colorThem === "theme_blue" ? "#333" : "#fff",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Header;
