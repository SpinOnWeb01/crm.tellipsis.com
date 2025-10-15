import socketIOClient from 'socket.io-client';
import {
  GET_ADMIN_CALL_ACTIVE_FAIL,
  GET_ADMIN_CALL_ACTIVE_REQUEST,
  GET_ADMIN_CALL_ACTIVE_SUCCESS
} from "../constants/adminPortal_callActiveConstants";
import { api } from '../../mockData';
import { useEffect } from 'react';

export const getAdminCallActive = () => async (dispatch) => {
   useEffect(() => {
    dispatch({ type: GET_ADMIN_CALL_ACTIVE_REQUEST });

    const socket = socketIOClient(`${api.dev}`);

    socket.on("call_details", (data) => {
      if (data?.data !== undefined) {
        dispatch({
          type: GET_ADMIN_CALL_ACTIVE_SUCCESS,
          payload: data?.data,
        });
      }
    });

    socket.on("connect_error", (err) => {
      dispatch({
        type: GET_ADMIN_CALL_ACTIVE_FAIL,
        payload: err.message,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};
