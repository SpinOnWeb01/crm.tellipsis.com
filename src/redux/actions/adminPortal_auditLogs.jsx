import {
  GET_ADMIN_AUDIT_LOGS_FAIL,
  GET_ADMIN_AUDIT_LOGS_REQUEST,
  GET_ADMIN_AUDIT_LOGS_SUCCESS,
} from "../constants/adminPortal_auditLogsConstants";
import { getPortalConfig } from "../../utils/portalConfig";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

export const getAdminAuditLogs = () => async (dispatch, getState) => {
  const config = getPortalConfig(getState());

  if (!config) {
    return dispatch({
      type: GET_ADMIN_AUDIT_LOGS_FAIL,
      payload: "Please select a portal first",
    });
  }

  try {
    dispatch({ type: GET_ADMIN_AUDIT_LOGS_REQUEST });

    const response = await axios.get(`${config.apiBase}/auditlog`, {
      headers: config.headers,
    });

    dispatch({
      type: GET_ADMIN_AUDIT_LOGS_SUCCESS,
      payload: response?.data?.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_AUDIT_LOGS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

