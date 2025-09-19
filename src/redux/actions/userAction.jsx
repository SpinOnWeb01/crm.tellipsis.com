import { toast } from "react-toastify";
import axios from "axios";
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
  LOGOUT_SUCCESS, LOGOUT_FAIL,
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
  ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL,
  USER_ROLE_REQUEST, USER_ROLE_SUCCESS, USER_ROLE_FAIL,
  UPDATE_USER_STATUS_REQUEST, UPDATE_USER_STATUS_SUCCESS, UPDATE_USER_STATUS_FAIL
} from "../constants/userConstants";
import { getPortalConfig } from "../../utils/portalConfig";

// const portalAPIs = {
//   cms: "https://devredirect.tellipsis.com/api",
//   sip: "https://devsip.all8series.com/api",
//   forwarding: "https://devredirect.tellipsis.com/api",
//   manage: "https://dev.tellipsis.com/api",
// };

// // ✅ Helper function – Selected portal ka token aur API laane ke liye

// const getPortalConfig = () => {
//   // Agar selectedPortal nahi hai to CMS default
//   const selectedPortal = localStorage.getItem("selectedPortal") || "admin";

//   // Token pick based on selected portal
//   const token =
//     selectedPortal === "admin"
//       ? JSON.parse(localStorage.getItem("admin"))
//       : JSON.parse(localStorage.getItem(`${selectedPortal}_token`));

//   // ✅ Agar selectedPortal invalid hai, fallback to cms
//   const apiBase = portalAPIs[selectedPortal] || portalAPIs.cms;

//   return {
//     apiBase,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token?.access_token ? `Bearer ${token.access_token}` : "",
//     },
//   };
// };



// ✅ LOGIN
export const login = (values) => async (dispatch, getState) => {
  const { apiBase, headers } = getPortalConfig(getState());
  try {
    dispatch({ type: LOGIN_REQUEST });
    dispatch({ type: LOGIN_SUCCESS, payload: values });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

// ✅ LOGOUT
export const logout = () => async (dispatch) => {
  try {
    const { apiBase, headers } = getPortalConfig();
    await axios.post(`${apiBase}/logout`, {}, { headers });
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response?.data?.message });
  }
};

// ✅ REGISTER USER
export const register = (createData, setOpen, setInputValues, setResponse) => async (dispatch) => {
  const { apiBase, headers } = getPortalConfig();
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await axios.post(`${apiBase}/users`, JSON.stringify(createData), { headers });

    if (data?.status === 200) {
      toast.success(data?.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 1500 });
      setOpen(false);
      setInputValues("");
      setResponse(data);
    } else {
      toast.error(data?.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 });
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error", { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 });
    dispatch({ type: REGISTER_USER_FAIL, payload: error?.response?.data?.message });
  }
};

// ✅ GET ALL USERS
export const getAllUsers = (radioValue) => async (dispatch, getState) => {
  const { apiBase, headers } = getPortalConfig(getState());
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const response = await axios.get(`${apiBase}/users?is_active=${radioValue}`, { headers });

    if (response?.data?.data) {
      dispatch({ type: ALL_USERS_SUCCESS, payload: response.data.data });
    } else {
      dispatch({ type: ALL_USERS_FAIL, payload: "Error fetching data" });
    }
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error?.response?.data?.message || "Fetch error" });
  }
};

// ✅ UPDATE USER
export const updateUser = (userData, setOpenModal, setResponse) => async (dispatch) => {
  const { apiBase, headers } = getPortalConfig();
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const { data } = await axios.put(`${apiBase}/users`, JSON.stringify(userData), { headers });

    if (data?.status === 200) {
      toast.success(data?.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 1500 });
      setOpenModal(false);
      setResponse(data);
    } else {
      toast.error(data?.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 });
    }
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error?.response?.data?.message });
  }
};

// ✅ DELETE USER
export const deleteUser = (userData, setResponse) => async (dispatch) => {
  const { apiBase, headers } = getPortalConfig();
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await axios.post(`${apiBase}/deleteuser`, userData, { headers });

    if (data?.status === 200) {
      toast.success(data?.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 1500 });
      setResponse(data);
    } else {
      toast.error(data?.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 1500 });
    }
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error?.response?.data?.message });
  }
};

// ✅ UPDATE USER STATUS
export const updateUserStaus = (userStatus, setResponse) => async (dispatch) => {
  const { apiBase, headers } = getPortalConfig();
  try {
    dispatch({ type: UPDATE_USER_STATUS_REQUEST });
    const { data } = await axios.put(`${apiBase}/usermultipleactivity`, JSON.stringify(userStatus), { headers });

    if (data?.status === 200) {
      toast.success(data?.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 1500 });
      setResponse(data);
    } else {
      toast.error(data?.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 });
    }
    dispatch({ type: UPDATE_USER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_STATUS_FAIL, payload: error?.response?.data?.message });
  }
};

export const getRoleUsers = () => async (dispatch) => {
  const { apiBase, headers } = getPortalConfig();
  try {
    dispatch({ type: USER_ROLE_REQUEST });

    const { data } = await axios.get(`${apiBase}/roles`, { headers });

    dispatch({ type: USER_ROLE_SUCCESS, payload: data?.data || [] });
  } catch (error) {
    dispatch({
      type: USER_ROLE_FAIL,
      payload: error?.response?.data?.message || "Failed to fetch roles",
    });
  }
};

