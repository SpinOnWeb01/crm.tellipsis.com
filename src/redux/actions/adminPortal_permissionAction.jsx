import axios from "axios";
import { ALL_PERMISSIONS_REQUEST, ALL_PERMISSIONS_FAIL, ALL_PERMISSIONS_SUCCESS,
  PUT_PERMISSION_REQUEST,PUT_PERMISSION_SUCCESS, PUT_PERMISSION_FAIL } from "../constants/adminPortal_permissionsContants";
import { api } from "../../mockData";
import { getPortalConfig } from "../../utils/portalConfig";

export const getPermissions = (id) => async (dispatch, getState) => {
  const { apiBase, headers } = getPortalConfig(getState());
    try {
      dispatch({ type: ALL_PERMISSIONS_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiBase}/permissions/${id}`,
        headers: headers,
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: ALL_PERMISSIONS_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      dispatch({ type: ALL_PERMISSIONS_FAIL, payload: error.response.data.message });
    }
  };

  export const putPermission = (id, data) => async (dispatch, getState) => {
    const { apiBase, headers } = getPortalConfig(getState());
      try {
        dispatch({ type: PUT_PERMISSION_REQUEST });
        let config = {
          method: "put",
          maxBodyLength: Infinity,
          data: data,
          url: `${apiBase}/permissions`,
          headers: headers,
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: PUT_PERMISSION_SUCCESS,
              payload: response?.data,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        dispatch({ type: PUT_PERMISSION_FAIL, payload: error.response.data.message });
      }
    };
    