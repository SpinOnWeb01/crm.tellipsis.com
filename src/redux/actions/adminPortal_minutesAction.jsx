import axios from "axios";
import {
  CREATE_ADMIN_MINUTES_FAIL,
  CREATE_ADMIN_MINUTES_REQUEST,
  CREATE_ADMIN_MINUTES_SUCCESS,
  GET_ADMIN_BILLING_MINUTES_FAIL,
  GET_ADMIN_BILLING_MINUTES_REQUEST,
  GET_ADMIN_BILLING_MINUTES_SUCCESS,
  GET_ADMIN_MINUTES_FAIL,
  GET_ADMIN_MINUTES_REQUEST,
  GET_ADMIN_MINUTES_SUCCESS,
  GET_ADMIN_TOTAL_MINUTES_FAIL,
  GET_ADMIN_TOTAL_MINUTES_REQUEST,
  GET_ADMIN_TOTAL_MINUTES_SUCCESS,
  UPDATE_ADMIN_MINUTES_FAIL,
  UPDATE_ADMIN_MINUTES_REQUEST,
  UPDATE_ADMIN_MINUTES_SUCCESS,
} from "../constants/adminPortal_minutesConstants";
import { toast } from "react-toastify";
import { api } from "../../mockData";
import { getPortalConfig } from "../../utils/portalConfig";

export const getAdminMinutes = () => async (dispatch, getState) => {
  const { apiBase, headers } = getPortalConfig(getState());
  const token = JSON.parse(localStorage.getItem("admin"));
  try {
    dispatch({ type: GET_ADMIN_MINUTES_REQUEST });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiBase}/billing`,
      headers: headers,
    };
    await axios
      .request(config)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_MINUTES_SUCCESS,
          payload: response?.data?.data,
        });
      })
      .catch((error) => {});
  } catch (error) {
    dispatch({
      type: GET_ADMIN_MINUTES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createAdminMinutes =
  (
    createAdminMinutes,
    setOpen,
    setResponse,
    setTotalMinutes,
    setUserId,
    setId,
    setBillingType,
    setStatus
  ) =>
  async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: CREATE_ADMIN_MINUTES_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/billing`,
        createAdminMinutes,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpen(false);
        setResponse(data);
        setTotalMinutes("");
        setUserId("");
        setId("");
        setBillingType("");
        setStatus("");
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: CREATE_ADMIN_MINUTES_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: CREATE_ADMIN_MINUTES_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const updateAdminMinutes =
  (
    updateMinutes,
    setOpenModal,
    setResponse,
    setTotalMinutes,
    setUserId,
    setId,
    setBillingType,
    setStatus,
    setAssignMinutes
  ) =>
  async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: UPDATE_ADMIN_MINUTES_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.put(
        `${api.dev}/api/billing`,
        updateMinutes,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpenModal(false);
        setResponse(data);
        setTotalMinutes("");
        setUserId("");
        setId("");
        setBillingType("");
        setStatus("");
        setAssignMinutes("")
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: UPDATE_ADMIN_MINUTES_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: UPDATE_ADMIN_MINUTES_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  export const getAdminBillingMinutes = () => async (dispatch, getState) => {
    const { apiBase, headers } = getPortalConfig(getState());
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_BILLING_MINUTES_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiBase}/monthlyminutes`,
        headers: headers,
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_BILLING_MINUTES_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_ADMIN_BILLING_MINUTES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getAdminTotalMinutes = (totalMinute, setTMinutes) => async (dispatch, getState) => {
    const { apiBase, headers } = getPortalConfig(getState());
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_TOTAL_MINUTES_REQUEST });
      const config = {
        headers: headers,
      };
      const { data } = await axios.post(
        `${apiBase}/totalusedminute`,
        totalMinute,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setTMinutes(data?.data?.total_minutes);
        // setOpen(false);
        // setResponse(data);
        // setTotalMinutes("");
        // setUserId("");
        // setId("");
        // setBillingType("");
        // setStatus("");
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: GET_ADMIN_TOTAL_MINUTES_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: GET_ADMIN_TOTAL_MINUTES_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

