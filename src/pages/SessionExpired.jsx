import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";

import Button from "@mui/material/Button";
import "../style.css";
import { useNavigate } from "react-router-dom";

function SessionExpired() {
  const navigate = useNavigate();
  const handleLogOut = () =>{
    localStorage.removeItem("crm_token");
    localStorage.removeItem("user-color");
    localStorage.removeItem("theme-color");
    localStorage.removeItem("forwarding_token");
    localStorage.removeItem("manage_token");
    localStorage.removeItem("sip_token");
    localStorage.removeItem("selectedPortal");
    navigate("/");
  }
  return (
    <>
      {/* <Box className="session_section">
        <Container>
          <Grid md={6}>
            <Box className="expire_session_container">
              <Box className="expire_session_row">
                <div className="expire_image">
                  <img src="/img/session_expire.png" alt="Expire image" />
                </div>
                <Typography variant="h3" className="expire_title">
                  your session has expired
                </Typography>
                <Typography className="expire_subtitle">
                  Please refresh the page. Don't worry, we kept all of
                  <br /> your filters and breakdowns in place.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  className="expire_button"
                  onClick={handleLogOut}
                >
                  refresh
                </Button>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box> */}

      <Box className="session-section">
  <Container maxWidth="sm">
    <Box className="expire-card mx-auto">
      <div className="expire-image">
        <img src="/img/session-expire.webp" alt="Session Expired" />
      </div>

      <Typography variant="h4" className="expire-title">
        Session Expired
      </Typography>
 <Typography className="expire_subtitle text-dark pb-3">
                  Please refresh the page. Don't worry, we kept all of
                  <br /> your filters and breakdowns in place.
                </Typography>

      {/* <Button
        variant="contained"
        size="large"
        
        onClick={handleLogOut}
        sx={{
                      width: "200px",
                      display: "block",
                      margin: "0 auto",
                      padding: "10px",
                      borderRadius: "50px",
                      fontSize: "16px",
                      fontWeight: "600",
                      textTransform: "none",
                      background:
                        "linear-gradient(135deg, #006241 0%, #00a76c 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #007d52 0%, #00c987 100%)",
                      },
                      color: "white",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #00a832 0%, #00e676 100%)",
                        boxShadow: "0 6px 12px rgba(0, 200, 83, 0.25)",
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      },
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        top: "0",
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                        transition: "all 0.5s ease",
                      },
                      "&:hover:after": {
                        left: "100%",
                      },
                    }}
      >
        🔄 Refresh Session
      </Button> */}

       <Button
                          type="submit"
                          onClick={handleLogOut}
                          
                          variant="contained"
                          sx={{
                            width: "200px",
                            display: "block",
                            margin: "0 auto",
                            padding: "10px",
                            borderRadius: "50px",
                            fontSize: "16px",
                            fontWeight: "600",
                            textTransform: "none",
                            background:
                              "linear-gradient(135deg, #006241 0%, #00a76c 100%)",
                            "&:hover": {
                              background:
                                "linear-gradient(135deg, #007d52 0%, #00c987 100%)",
                            },
                            color: "white",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s ease",
                            position: "relative",
                            overflow: "hidden",
                            "&:hover": {
                              background:
                                "linear-gradient(135deg, #00a832 0%, #00e676 100%)",
                              boxShadow: "0 6px 12px rgba(0, 200, 83, 0.25)",
                              transform: "translateY(-2px)",
                            },
                            "&:active": {
                              transform: "translateY(0)",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            },
                            "&:after": {
                              content: '""',
                              position: "absolute",
                              top: "0",
                              left: "-100%",
                              width: "100%",
                              height: "100%",
                              background:
                                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                              transition: "all 0.5s ease",
                            },
                            "&:hover:after": {
                              left: "100%",
                            },
                          }}
                        >
                          Refresh Session
                        </Button>
    </Box>
  </Container>
</Box>

    </>
  );
}

export default SessionExpired;
