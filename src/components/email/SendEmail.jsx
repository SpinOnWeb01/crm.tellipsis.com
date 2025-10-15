import React, { useEffect, useRef, useState } from "react";
import "../../style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { withStyles } from "@material-ui/styles";
import { toast } from "react-toastify";
import { DialogActions, DialogTitle, InputAdornment } from "@mui/material";
import { AccountCircle } from "@mui/icons-material"; // Make sure the import is correct
import { api } from "../../mockData";
import { IconBase } from "react-icons/lib";

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "#2c3e50",
    },
    "& label.Mui-focused": {
      color: "#2c3e50",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#2c3e50",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#2c3e50",
      },
      "&:hover fieldset": {
        borderColor: "#2c3e50",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2c3e50",
      },
    },
  },
  input: {
    color: "white", // Set default text color to white
  },
})(TextField);

function SendEmail() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const current_user = localStorage.getItem("current_user");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const location = useLocation();
  const redirect = location?.state?.data;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = JSON.stringify({
        email_id: email,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/forgotpassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const values = response?.data;
        if (values.status === 200) {
          toast.success(values.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        } else {
          toast.error(values.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
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
    // <section className="forget-sec login-sec">
    //   <div className="container">
    //     <div className="row d-flex justify-content-center align-items-cente m-auto">
    //       <div className="col-lg-6 col-md-6 col-12 m-auto">
    //         <div className="m-auto">
    //           <div className="login-logo forget_logo">
    //             <Card className="login-box" sx={{ padding: "13px 25px" }}>
    //               <Typography>
    //                 <img
    //                   src={`../img/logo_white11.png`}
    //                   className="img-fluid d-block mx-auto"
    //                   alt={"login logo"}
    //                 />
    //               </Typography>
    //               <DialogTitle sx={{ color: "#fff", fontWeight: "600", paddingBottom: '40px' }}>
    //                 Find Your Mail
    //               </DialogTitle>
    //               <form className="login_form" onKeyDown={handleKeyPress}>
    //                 <CssTextField
    //                   id="outlined-username-input"
    //                   value={email}
    //                   variant="outlined"
    //                   style={{ width: "100%", margin: "0px" }}
    //                   required
    //                   onChange={(e) => setEmail(e.target.value)}
    //                   InputProps={{
    //                     startAdornment: (
    //                       <InputAdornment position="start">
    //                         <AccountCircle sx={{ color: "white" }} /> {/* Ensure color is set */}
    //                       </InputAdornment>
    //                     ),
    //                   }}
    //                   label="Email"
    //                   className="email"
    //                   type="text"
    //                   autoComplete="current-password"
    //                   margin="normal"
    //                   inputProps={{ style: { color: "white",padding:'15px 10px' } }}
    //                   onFocus={handleFocus}
    //                 />
                                       
    //               </form>

    //               <DialogActions
    //                 sx={{
    //                   display: "flex",
    //                   justifyContent: "center",
    //                   paddingBottom: "20px",
    //                 }}
    //               >
    //                 {/* <Button
    //                   variant="contained"
    //                   sx={{
    //                     fontSize: "16px !important",
    //                     background:
    //                       "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
    //                     marginTop: "20px",
    //                     marginLeft: "0px !important",
    //                     padding: "10px 20px !important",
    //                     textTransform: "capitalize !important",
    //                   }}
    //                   className="all_button_clr"
    //                   color="info"
    //                   onClick={() => navigate("/")}
    //                 >
    //                   Back
    //                 </Button> */}
    //                 <Button
    //                   variant="contained"
    //                   sx={{
    //                     fontSize: "16px !important",
    //                     marginTop: "20px",
    //                     padding: "10px 20px !important",
    //                     textTransform: "capitalize !important",
    //                     marginLeft: "0px !important",
    //                     marginRight: "0px !important",
    //                   }}
    //                   className="all_button_clr"
    //                   color="error"
    //                   onClick={handleSubmit}
                      
    //                 >
    //                     <IconBase style={{marginRight:'5px'}}>
    //                         <SendIcon  />
    //                     </IconBase>
    //                   send
    //                 </Button>
    //               </DialogActions>
    //             </Card>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>


      <section className="login_section" >
  <div className="container-fluid h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">

      <div className="col-md-10 mx-auto rounded-4 p-4" 
     style={{
       background: '#ffffff61',
       backdropFilter: 'blur(12px)',
       WebkitBackdropFilter: 'blur(12px)',
       border: '1px solid #2545506c',
       boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
       borderRadius: '24px',
       overflow: 'hidden',
       transition: 'all 0.3s ease-in-out',
         width: "90%",
     }}>
        <div className="row d-flex justify-content-around align-items-center">
             {/* Left Side - Image Section */}
      <div className="col-md-5 p-0 d-none d-md-block border-left">
        <div className="loginimg">
          <img src="../img/forgetpwd.webp" alt="login" className="img-fluid" />
          </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="col-md-6 col-xl-5">

         <div className="m-auto">
               <div className="login-logo forget_logo">
                 <Card className="login-box1 " sx={{ padding: "13px 25px", background:'transparent', border:'none', boxShadow:'none', }}>
                   <Typography>
                     <img
                       src={`../img/logo_white11.png`}
                       className="img-fluid d-block mx-auto"
                       style={{ maxHeight: '80px', background:'#333', borderRadius: '8px', padding: '10px'}}
                       alt={"login logo"}
                     />
                   </Typography>
                   <DialogTitle sx={{ color: "#00a76c", fontWeight: "600", paddingBottom: '40px' }}>
                     Find Your Mail
                   </DialogTitle>
                   <form className="login_form" onKeyDown={handleKeyPress}>
                     <CssTextField
                       id="outlined-username-input"
                       value={email}
                       variant="outlined"
                       style={{ width: "100%", margin: "0px", color: '#2c3e50' }}
                       required
                       onChange={(e) => setEmail(e.target.value)}
                       InputProps={{
                         startAdornment: (
                           <InputAdornment position="start">
                             <AccountCircle sx={{ color: "00a76c" }} /> {/* Ensure color is set */}
                           </InputAdornment>
                         ),
                       }}
                       label="Email"
                       className="email"
                       type="text"
                       autoComplete="current-password"
                       margin="normal"
                       inputProps={{ style: { color: "#333",padding:'15px 10px' } }}
                       onFocus={handleFocus}
                     />
                                       
                   </form>

                   <DialogActions
                     sx={{
                       display: "flex",
                       justifyContent: "center",
                       paddingBottom: "20px",
                     }}
                   >
                     {/* <Button
                       variant="contained"
                       sx={{
                         fontSize: "16px !important",
                         background:
                           "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                         marginTop: "20px",
                         marginLeft: "0px !important",
                         padding: "10px 20px !important",
                         textTransform: "capitalize !important",
                       }}
                       className="all_button_clr"
                       color="info"
                       onClick={() => navigate("/")}
                     >
                       Back
                     </Button> */}
                     <Button
                       variant="contained"
                        sx={{
    width: '200px',
    display: 'block',
    margin: '10px auto',
    padding: '10px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '600',
    textTransform: 'none',
    background: 'linear-gradient(135deg, #006241 0%, #00a76c 100%)',
'&:hover': {
  background: 'linear-gradient(135deg, #007d52 0%, #00c987 100%)'
},
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      background: 'linear-gradient(135deg, #00a832 0%, #00e676 100%)',
      boxShadow: '0 6px 12px rgba(0, 200, 83, 0.25)',
      transform: 'translateY(-2px)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '-50%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'all 0.5s ease'
    },
    '&:hover:after': {
      left: '100%'
    }
  }}
                       
                       color="error"
                       onClick={handleSubmit}
                      
                     >
                         <IconBase style={{marginRight:'5px'}}>
                             <SendIcon  />
                         </IconBase>
                       send
                     </Button>
                   </DialogActions>
                 </Card>
               </div>
             </div>
      </div>


        </div>
      </div>

    </div>
  </div>
</section>
  );
}

export default SendEmail;
