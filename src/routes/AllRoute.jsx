import { useEffect } from "react";
import { Routes as Switch, Route, BrowserRouter } from "react-router-dom";
import Router from "./route";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/login/Login";
import { useSelector } from "react-redux";
import SendEmail from "../components/email/SendEmail";
function All_Route() {
  const state = useSelector((state) => state);

 //  ------------------------       Admin Portal Session Time out Mounting       -------------------------------
  useEffect(() => {
    // Retrieve the token from localStorage
    const tokenString = localStorage.getItem("crm_token");
    if (!tokenString) {
      //console.error('No token found in localStorage');
     // window.location.replace("/login");
      return;
    }

    // Parse the token JSON
    const token = JSON.parse(tokenString);

    // Function to decode JWT payload
    const decodePayload = (token) => {
      try {
        const base64Url = token.split('.')[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Correct the encoding
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error('Failed to decode the token', e);
        return null;
      }
    };

    const payload = decodePayload(token.access_token);
    if (!payload) {
      console.error('Failed to decode the payload');
      return;
    }

    // Extract the 'exp' value (in seconds since epoch)
    const expirationTime = payload.exp;

    // Get the current time (in seconds since epoch)
    const currentTime = Math.floor(Date.now() / 1000);

    // Calculate time until expiration (in milliseconds)
    const timeUntilExpiration = (expirationTime - currentTime) * 1000;
    // Check if the token has already expired
    if (expirationTime <= currentTime) {
     
      localStorage.removeItem("theme-color");
        localStorage.removeItem("crm_token");
       // Immediate redirect to login page
       window.location.reload();

       //window.location.replace("/login");
    } else {
      //console.log('Token is still valid');

      // Set a timeout to refresh the page when the token expires
      const timeoutId = setTimeout(() => {
        localStorage.removeItem("theme-color");
        localStorage.removeItem("crm_token");
        window.location.reload();
      }, timeUntilExpiration);

      // Cleanup the timeout if the component is unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [state]); // Empty dependency array to run the effect once on component mount

  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* {user === "" || user === null ? ( */}
          <>
            {/* <Route path={Router.HOME} element={<Home />} /> */}
            <Route exact path={Router.LOGIN} element={<Login />} />
            <Route exact path="/send_email" element={<SendEmail />} />
          </>
          {/* ) : (  */}
          <>
            <Route exact path={Router.MAIN} element={<PrivateRoute />} />
          </>
          {/* )}
           */}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default All_Route;
