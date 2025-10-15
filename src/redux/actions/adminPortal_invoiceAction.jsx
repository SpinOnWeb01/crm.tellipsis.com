import axios from "axios";
import { CREATE_ADMIN_INVOICE_FAIL, CREATE_ADMIN_INVOICE_REQUEST, CREATE_ADMIN_INVOICE_SUCCESS, CREATE_MANAGE_PORTAL_INVOICE_FAIL, CREATE_MANAGE_PORTAL_INVOICE_REQUEST, CREATE_MANAGE_PORTAL_INVOICE_SUCCESS, GET_ADMIN_INVOICE_FAIL, GET_ADMIN_INVOICE_REQUEST, GET_ADMIN_INVOICE_SUCCESS, SEND_MAIL_FAIL, SEND_MAIL_REQUEST, SEND_MAIL_SUCCESS, UPDATE_ADMIN_INVOICE_FAIL, UPDATE_ADMIN_INVOICE_REQUEST, UPDATE_ADMIN_INVOICE_SUCCESS } from "../constants/adminPortal_invoiceConstants";
import { toast } from "react-toastify";
import { getPortalConfig } from "../../utils/portalConfig";

export const getAdminInvoice = (domain) => async (dispatch, getState) => {
    const { apiBase, headers } = getPortalConfig(getState(), "products");
    try {
      dispatch({ type: GET_ADMIN_INVOICE_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiBase}/invoice?domain_name=${domain}`,
        headers: headers
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_INVOICE_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_ADMIN_INVOICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const createAdminInvoice = (createAdminInvoice, setResponse, handleClose) => async (dispatch, getState) => {
    const { apiBase, headers } = getPortalConfig(getState(), "products");
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: CREATE_ADMIN_INVOICE_REQUEST });
        const config = {
          headers: headers
        };
        const { data } = await axios.post(
          
          
          `${apiBase}/invoice`,
          createAdminInvoice,
          config
        );
       if (data?.status === 200) {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setResponse(data);
          handleClose();
        }  else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
        dispatch({ type: CREATE_ADMIN_INVOICE_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: CREATE_ADMIN_INVOICE_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };

    
export const createManageInvoice = (createManageInvoice, setResponse, handleClose) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("manage_token"));
      try {
        dispatch({ type: CREATE_MANAGE_PORTAL_INVOICE_REQUEST });
        const config = {
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
        };
        const { data } = await axios.post(
          
          
          `https://dev.tellipsis.com/api/invoicepaid`,
          createManageInvoice,
          config
        );
       if (data?.status === 200) {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setResponse(data);
          handleClose();
        }  else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
        dispatch({ type: CREATE_MANAGE_PORTAL_INVOICE_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: CREATE_MANAGE_PORTAL_INVOICE_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };
    export const updateAdminInvoice = (updateInvoice, setResponse, setOpenModal) => async (dispatch, getState) => {
      const { apiBase, headers } = getPortalConfig(getState(), "products");
        try {
          dispatch({ type: UPDATE_ADMIN_INVOICE_REQUEST });
          const config = {
            headers: headers
          };
          const { data } = await axios.put(
            
            
            `${apiBase}/invoice`,
            updateInvoice,
            config
          );
         if (data?.status === 200) {
            toast.success(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
            setOpenModal(false);
            setResponse(data);      
          }  else {
            toast.error(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          }
          dispatch({ type: UPDATE_ADMIN_INVOICE_SUCCESS, payload: data });
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: UPDATE_ADMIN_INVOICE_FAIL,
            payload: error?.response?.data?.message,
          });
        }
      };

export const sendMail = (mail, setResponse, handleClose) => async (dispatch, getState) => {
    const { apiBase, headers } = getPortalConfig(getState(), "products");
      try {
        dispatch({ type: SEND_MAIL_REQUEST });
        const config = {
          headers: headers
        };
        const { data } = await axios.post(
          
          
          `${apiBase}/invoicesendemail`,
          mail,
          config
        );
       if (data?.status === 200) {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setResponse(data);
          handleClose();
        }  else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
        dispatch({ type: SEND_MAIL_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: SEND_MAIL_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };

//     export const downloadPdf = (invoiceId, setResponse, handleClose) => async (dispatch, getState) => {
//   const { apiBase, headers } = getPortalConfig(getState());

//   try {
//     const url = `${apiBase}/generateinvoicepdf?invoice_id=${invoiceId.invoice_id}`;

//     let config = {
//       method: "get",
//       url,
//       headers,
//       responseType: "blob", // IMPORTANT for binary
//     };

//     const response = await axios.request(config);

//     // Create blob link
//     const blob = new Blob([response.data], { type: "application/pdf" });
//     const blobUrl = window.URL.createObjectURL(blob);

//     // Open in new tab
//     window.open(blobUrl, "_blank");

//     // Or force download:
//     // const link = document.createElement("a");
//     // link.href = blobUrl;
//     // link.setAttribute("download", `invoice_${invoiceId.invoice_id}.pdf`);
//     // document.body.appendChild(link);
//     // link.click();
//     // link.remove();
//   } catch (error) {
//     console.error("Error downloading the PDF:", error);
//   }
// };

export const downloadPdf = (invoiceId,) => 
  async (dispatch, getState) => {
    const { apiBase, headers } = getPortalConfig(getState(), "products");

    try {
      const url = `${apiBase}/generateinvoicepdf?invoice_id=${invoiceId.invoice_id}`;

      let config = {
        method: "get",
        url,
        headers,
        responseType: "blob", // ensure we get binary
      };

      const response = await axios.request(config);

      // Create blob link
      const blob = new Blob([response.data], { type: "application/pdf" });
      const blobUrl = window.URL.createObjectURL(blob);

      // Trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `invoice_${invoiceId.invoice_id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Optional: revoke blob URL after use
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);

      dispatch({
      type: "DOWNLOAD_PDF_SUCCESS",
      payload: response.data,
    });

    } catch (error) {
      console.error("Error downloading the PDF:", error);
      dispatch({
      type: "DOWNLOAD_PDF_ERROR",
      payload: error.message,
    });
    }
};

