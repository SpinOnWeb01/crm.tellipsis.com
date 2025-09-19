import React, { useEffect, useRef, useState } from "react";
import "../../style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/actions/userAction";
import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { api } from "../../mockData";
import { IconButton, InputAdornment } from "@mui/material";
import { setPortal, setPortalToken } from "../../redux/slices/portalSlice";

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
  input: {
    color: "white", // Set default text color to white
    backgroundColor: "rgb(232, 241, 250)", // Set default background color
  },
})(TextField);

function Login() {
  const current_user = localStorage.getItem("current_user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const location = useLocation();
  const redirect = location?.state?.data;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = JSON.stringify({ username: email, password: password });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const values = response?.data;
        if (values?.status === 200) {
          if (values.user_role === "Superadmin") {
            // localStorage.setItem("current_superadmin", values.user_name);
            // localStorage.setItem(`superadmin_${values.user_name}`, JSON.stringify(values));
            //localStorage.setItem("admin", JSON.stringify(values));
            localStorage.setItem("crm_token", JSON.stringify(values));
            localStorage.setItem("selectedPortal", "crm");

            dispatch(setPortal({ portal: "crm" }));
            dispatch(
              setPortalToken({ portal: "crm", token: values })
            );
            navigate("/admin_portal", { state: { data: data } });
          } else if (values.user_role === "Admin") {
            localStorage.setItem("admin", JSON.stringify(values));
            navigate("/admin_portal");
          } else if (values.user_role === "Reseller") {
            localStorage.setItem("admin", JSON.stringify(values));
            localStorage.setItem("reseller", JSON.stringify(values));
            navigate("/reseller_portal");
          } else if (values.user_role === "User") {
            localStorage.setItem("current_user", values.user_name);
            localStorage.setItem(
              `user_${values.user_name}`,
              JSON.stringify(values)
            );
            navigate("/redirect_portal");
          } else if (values.user_role === "Client") {
            localStorage.setItem(
              `user_${values.user_name}`,
              JSON.stringify(values)
            );
            navigate("/redirect_portal");
          }
          // navigate("/dashboard");
          // Clear the form fields
          setEmail("");
          setPassword("");

          dispatch(login(values));
        }
        if (values.status === 200) {
          toast.success(values.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          //   navigate("/"})
        } else {
          toast.error(values.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
      });
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  };

  return (
    // <section className="login_section">
    //   <div className="container">
    //     <div className="row d-flex justify-content-center align-items-cente m-auto">
    //       <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center align-items-center">
    //         <div className="login-logo">
    //           <Card className="login-box" sx={{}}>
    //             <CardContent>
    //               <Typography>
    //                 <img
    //                   src={`../img/logo_white11.png`}
    //                   className="img-fluid d-block mx-auto"
    //                   alt={"login logo"}
    //                   style={{ paddingBottom: "20px" }}
    //                 />
    //               </Typography>

    //               <form className="login_form" onKeyDown={handleKeyPress}>

    //                 {/* Username Field */}
    //                 <label
    //                   htmlFor="username-input"
    //                   style={{
    //                     color: "#fff",
    //                     textAlign: "left",
    //                     display: "block",
    //                     paddingBottom: "3px",
    //                   }}
    //                 >
    //                   Username
    //                 </label>
    //                 <TextField
    //                   id="username-input"
    //                   name="email"
    //                   value={email}
    //                   onChange={(e) => setEmail(e.target.value)}
    //                   placeholder="Username"
    //                   variant="outlined"
    //                   autoComplete="email" // Enable autofill for email/username
    //                   type="text"
    //                   fullWidth
    //                   sx={{
    //                     "& .MuiOutlinedInput-root": {
    //                       "& fieldset": {
    //                         borderColor: "white", // Default border color
    //                       },
    //                       "&:hover fieldset": {
    //                         borderColor: "white", // Border color on hover
    //                       },
    //                       "&.Mui-focused fieldset": {
    //                         borderColor: "white", // Border color when focused
    //                       },
    //                       "& input::placeholder": {
    //                         color: "white !important", // Set placeholder color to white
    //                       },
    //                     },
    //                     input: { color: "white" }, // Input text color
    //                   }}
    //                 />

    //                 {/* Password Field */}
    //                 <label
    //                   htmlFor="password-input"
    //                   style={{
    //                     color: "#fff",
    //                     textAlign: "left",
    //                     display: "block",
    //                     paddingBottom: "3px",
    //                   }}
    //                 >
    //                   Password
    //                 </label>
    //                 <TextField
    //                   id="password-input"
    //                   name="password"
    //                   value={password}
    //                   onChange={(e) => setPassword(e.target.value)}
    //                   placeholder="Password"
    //                   variant="outlined"
    //                   autoComplete="current-password"
    //                   type={showPassword ? "text" : "password"}
    //                   fullWidth
    //                   InputProps={{
    //                     endAdornment: (
    //                       <InputAdornment position="end">
    //                         <IconButton
    //                           onClick={handleClickShowPassword}
    //                           onMouseDown={(e) => e.preventDefault()}
    //                           edge="end"
    //                           style={{ color: "#fff" }}
    //                         >
    //                           {showPassword ? (
    //                             <Visibility />
    //                           ) : (
    //                             <VisibilityOff />
    //                           )}
    //                         </IconButton>
    //                       </InputAdornment>
    //                     ),
    //                   }}
    //                   sx={{
    //                     "& .MuiOutlinedInput-root": {
    //                       "& fieldset": {
    //                         borderColor: "white", // Default border color
    //                       },
    //                       "&:hover fieldset": {
    //                         borderColor: "white", // Border color on hover
    //                       },
    //                       "&.Mui-focused fieldset": {
    //                         borderColor: "white", // Border color when focused
    //                       },
    //                       "& input::placeholder": {
    //                         color: "white", // Set placeholder color to white
    //                       },
    //                     },
    //                     input: { color: "white" }, // Input text color
    //                   }}
    //                 />

    //                 <Typography
    //                   variant="body2"
    //                   className="text-end login-inpt-txt"
    //                 >
    //                   <p
    //                     style={{ cursor: "pointer", color: "#fff" }}
    //                     onClick={() => {
    //                       navigate("/send_email");
    //                     }}
    //                   >
    //                     Forgot you password?
    //                   </p>
    //                 </Typography>
    //               </form>
    //             </CardContent>
    //             <CardActions
    //               className="d-flex justify-content-center"
    //               style={{
    //                 textAlign: "center",
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 margin: "0px",
    //               }}
    //             >
    //               <Button
    //                 type="submit"
    //                 // className="info-btn login-submit"
    //                 className="login_button"
    //                 onClick={handleSubmit}
    //                 ref={buttonRef}
    //                 style={{
    //                   display: "flex",
    //                   justifyContent: "center",
    //                   margin: "0px",
    //                 }}
    //                 sx={{ margin: "0px !important" }}
    //               >
    //                 Submit
    //               </Button>
    //             </CardActions>
    //           </Card>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="login_section">
      <div className="container-fluid h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div
            className="col-md-10 mx-auto rounded-4 p-4"
            style={{
              background: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
              borderRadius: "24px",
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <div className="row d-flex justify-content-around align-items-center">
              {/* Left Side - Image Section */}
              <div className="col-md-5 p-0 d-none d-md-block border-left">
                <div className="loginimg">
                  <img
                    src="../img/loginbgg.webp"
                    alt="login"
                    className="img-fluid"
                  />
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="col-md-6 col-xl-5 p-3">
                <div className="text-center mb-4">
                  <img
                    src="../img/logo_white11.png"
                    className="img-fluid"
                    alt="Company Logo"
                    style={{
                      maxHeight: "80px",
                      background: "#333",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  />
                </div>

                <form className="login_form" onKeyDown={handleKeyPress}>
                  {/* Username Field */}
                  <div className="form-group mb-4">
                    <label
                      htmlFor="username-input"
                      className="form-label"
                      style={{ color: "#2c3e50", fontWeight: "500" }}
                    >
                      Username
                    </label>
                    <TextField
                      id="username-input"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your username"
                      variant="outlined"
                      autoComplete="email"
                      type="text"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#dfe6e9",
                            borderRadius: "8px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#b2bec3",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3498db",
                          },
                        },
                        input: {
                          color: "#2d3436",
                          padding: "12px 14px",
                        },
                      }}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="form-group mb-3">
                    <label
                      htmlFor="password-input"
                      className="form-label"
                      style={{ color: "#2c3e50", fontWeight: "500" }}
                    >
                      Password
                    </label>
                    <TextField
                      id="password-input"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      variant="outlined"
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                              style={{ color: "#7f8c8d" }}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#dfe6e9",
                            borderRadius: "8px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#b2bec3",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3498db",
                          },
                        },
                        input: {
                          color: "#2d3436",
                          padding: "12px 14px",
                        },
                      }}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <a
                      href="/send_email"
                      className="text-decoration-none"
                      style={{ color: "#006241", fontWeight: "500" }}
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    ref={buttonRef}
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
                    Sign In
                  </Button>

                  {/* <div className="text-center mt-4">
            <p style={{ color: '#7f8c8d' }}>
              Don't have an account?{' '}
              <a href="/register" className="text-decoration-none" style={{ color: '#3498db', fontWeight: '500' }}>
                Sign up
              </a>
            </p>
          </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
