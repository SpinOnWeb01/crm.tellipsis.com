import axios from "axios";
import { GET_ADMIN_RESELLERS_FAIL, GET_ADMIN_RESELLERS_REQUEST, GET_ADMIN_RESELLERS_SUCCESS, GET_ADMIN_USERS_FAIL, GET_ADMIN_USERS_REQUEST, GET_ADMIN_USERS_SUCCESS, GET_RESELLER_REMAINING_MINUTES_FAIL, GET_RESELLER_REMAINING_MINUTES_REQUEST, GET_RESELLER_REMAINING_MINUTES_SUCCESS, GET_RESELLER_USERS_FAIL, GET_RESELLER_USERS_REQUEST, GET_RESELLER_USERS_SUCCESS } from "../constants/adminPortal_listConstants";
import { api } from "../../mockData";
import { getPortalConfig } from "../../utils/portalConfig";

export const getAdminUsersList = () => async (dispatch, getState) => {
  const { apiBase, headers } = getPortalConfig(getState());
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_USERS_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiBase}/getuserlist`,
        headers: headers,
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_USERS_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_ADMIN_USERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getAdminResellersList = () => async (dispatch, getState) => {
    const { apiBase, headers } = getPortalConfig(getState());
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_RESELLERS_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiBase}/getresellerlist`,
        headers: headers,
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_RESELLERS_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_ADMIN_RESELLERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getResellerUsersList = () => async (dispatch, getState) => {
    const { apiBase, headers } = getPortalConfig(getState());
    const token = JSON.parse(localStorage.getItem("reseller" ));
    try {
      dispatch({ type: GET_RESELLER_USERS_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiBase}/getreselleruserlist`,
        headers: headers,
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_RESELLER_USERS_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_RESELLER_USERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getResellerRemainingMinutesList = () => async (dispatch, getState) => {
    const { apiBase, headers } = getPortalConfig(getState());
    const token = JSON.parse(localStorage.getItem("reseller"));
    try {
      dispatch({ type: GET_RESELLER_REMAINING_MINUTES_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiBase}/getresellerremainings`,
        headers: headers,
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_RESELLER_REMAINING_MINUTES_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_RESELLER_REMAINING_MINUTES_FAIL,
        payload: error.response.data.message,
      });
    }
  };