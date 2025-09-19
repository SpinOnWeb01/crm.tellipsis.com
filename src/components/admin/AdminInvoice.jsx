import {
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../Switcher.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Form } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import { getAdminProducts } from "../../redux/actions/adminPortal_productsAction";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Close, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import SendIcon from "@mui/icons-material/Send";
import {
  createAdminInvoice,
  downloadPdf,
  getAdminInvoice,
  sendMail,
} from "../../redux/actions/adminPortal_invoiceAction";
import { getAllUsers } from "../../redux/actions/userAction";
import transitions from "@material-ui/core/styles/transitions";
import { toast } from "react-toastify";
import { ALL_USERS_FAIL, ALL_USERS_SUCCESS } from "../../redux/constants/userConstants";
const drawerWidth = 240;

const useStyles = makeStyles({
  borderedGreen: {
    borderLeft: "3px solid green", // Add your border styling here
    boxShadow: "2px -1px 4px -3px #686868",
    margin: "4px 4px 1px 4px !important",
  },
  borderedRed: {
    borderLeft: "3px solid red", // Add your border styling here
    boxShadow: "2px -1px 4px -3px #686868",
    margin: "4px 4px 1px 4px !important",
  },
  formControl: {
    "& .MuiInputBase-root": {
      color: "#666",
      borderColor: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      height: "45px",
      minWidth: "120px",
      justifyContent: "center",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-4px !important",
    },
  },
  select: {
    width: "auto",
    fontSize: "12px",
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  selectIcon: {
    position: "relative",
    color: "#6EC177",
    fontSize: "14px",
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
  },
});

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-row": {
            minHeight: "auto", // Adjust row height to make it more compact
          },
        },
      },
      defaultProps: {
        density: "compact", // Set default density to compact
      },
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  // backgroundColor: "rgb(9, 56, 134)",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function AdminInvoice({ colorThem, selectedPortal, setSelectedPortal }) {
  const [paymentStatus, setPaymentStatus] = useState("");
  const state = useSelector((state) => state);
  const [inputFields, setInputFields] = useState([
    { name: "", quantity: 0, price: "", amount: 0 },
  ]);
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = useState({
    sub_total: 0.0,
    cgst: 0.0,
    sgst: 0.0,
    total_amount: 0.0,
    paid_amount: 0.0,
    sub_total_num: 0.0,
    sgst_num: 0.0,
    cgst_num: 0.0,
    total_amount_num: 0.0,
  });
  const [userDetails, setUserDetails] = useState({
    id: "",
    username: "",
    email: "",
    address: "",
  });
  const [domainName, setDomainName] = useState("");
  const [value, setValue] = useState("");
  const [remainingAmount, setRemainingAmount] = useState(
    Number(order?.total_amount_num) || 0
  );
  const [transitionsIds, setTransitionsIds] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedNumberTwo, setSelectedNumberTwo] = useState("");
  const [response, setResponse] = useState("");
  const handleOpen = () => {
    if (state.portal.selectedPortal !== "crm") {
      dispatch(getAllUsers(""));
    }
    setOpen(true);
  };
  const handleClose = () => {
    setValue("");
    setTransitionsIds("");
    setPaymentStatus("");
    setRemainingAmount(0);
    setUserDetails({
      id: "",
      username: "",
      email: "",
      address: "",
    });
    setInputFields([{ name: "", quantity: 0, price: 0, amount: 0 }]);
    setOrder({
      sub_total: 0.0,
      cgst: 0.0,
      sgst: 0.0,
      total_amount: 0.0,
      paid_amount: 0.0,
      sub_total_num: 0.0,
      sgst_num: 0.0,
      cgst_num: 0.0,
      total_amount_num: 0.0,
    });
    setSelectedNumber("");
    setSelectedNumberTwo("");
    setOpen(false);
  };

  const handleReset = () => {
    setValue("");
    setTransitionsIds("");
    setPaymentStatus("");
    setRemainingAmount(0);
    setUserDetails({
      id: "",
      username: "",
      email: "",
      address: "",
    });
    setInputFields([{ name: "", quantity: 0, price: 0, amount: 0 }]);
    setOrder({
      sub_total: 0.0,
      cgst: 0.0,
      sgst: 0.0,
      total_amount: 0.0,
      paid_amount: 0.0,
      sub_total_num: 0.0,
      sgst_num: 0.0,
      cgst_num: 0.0,
      total_amount_num: 0.0,
    });
    setSelectedNumber("");
    setSelectedNumberTwo("");
  };

  const handleChangeGst = (event) => {
    setSelectedNumber(event.target.value);
  };

  const handleChangeGstTwo = (event) => {
    setSelectedNumberTwo(event.target.value);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    // ✅ allow only digits and up to 10 characters
    if (/^\d*$/.test(newValue) && newValue.length <= 10) {
      const numericValue = Number(newValue);

      // ✅ block values greater than total
      if (numericValue <= (Number(order?.total_amount_num) || 0)) {
        setValue(newValue);
        setRemainingAmount(
          (Number(order?.total_amount_num) || 0) - numericValue
        );
      }
    }
  };

  // ✅ in case order.total_amount_num changes from API
  useEffect(() => {
    setRemainingAmount(
      (Number(order?.total_amount_num) || 0) - (Number(value) || 0)
    );
  }, [order?.total_amount_num]);

  //state

  const dispatch = useDispatch();
  const classes = useStyles();

  const formatCurrency = (value) => {
    return value.toLocaleString("en-IN", {
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // ================ is paid ke liye ==============

  const handlePaymentChange = (e) => {
    const value = e.target.value;
    setPaymentStatus(value);
  };

  const portalMap = {
    sip: "devsip.all8series.com",
    forwarding: "devredirect.tellipsis.com",
    manage: "dev.tellipsis.com",
    telcolinellc: "voip.telcolinellc.com",
  };

  useEffect(() => {
    // Page load hone par localStorage se value set karo
    const savedPortal = localStorage.getItem("selectedPortal") || "";
    if (selectedPortal) {
    setSelectedPortal(savedPortal);
    setDomainName(portalMap[selectedPortal]);
    
  }
  }, [setSelectedPortal]);

  const handlePortalChange = (event) => {
    const selectedPortal = event.target.value;
    setSelectedPortal(selectedPortal); // ✅ UI update
    setDomainName(portalMap[selectedPortal]);
  };

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAdminInvoice());
  }, [dispatch, response]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    const { name, value } = event.target;

    if (name === "name") {
      // Find the selected product price
      const selectedProduct = state?.getAdminProducts?.products?.find(
        (product) => product.id === parseInt(value)
      );
      if (selectedProduct) {
        data[index].price = selectedProduct.price;
      }
    }

    data[index][name] = value;

    // Recalculate the amount
    const quantity = data[index].quantity
      ? parseFloat(data[index].quantity)
      : 0;
    const price = data[index].price ? parseFloat(data[index].price) : 0;
    data[index].amount = quantity * price;

    setInputFields(data);
  };

  const addFields = () => {
    let newField = { name: "", quantity: 0, price: "", amount: 0 };
    setInputFields([...inputFields, newField]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  useEffect(() => {
    const newSubTotal = inputFields.reduce((acc, item) => acc + item.amount, 0);
    const sgst = parseFloat((newSubTotal * (selectedNumber / 100)).toFixed(2));
    const cgst = parseFloat(
      (newSubTotal * (selectedNumberTwo / 100)).toFixed(2)
    );
    const newTotalAmount = parseFloat((newSubTotal + sgst + cgst).toFixed(2));

    setOrder((prevOrder) => ({
      ...prevOrder,
      sub_total: formatCurrency(newSubTotal),
      sgst: formatCurrency(sgst),
      cgst: formatCurrency(cgst),
      total_amount: formatCurrency(newTotalAmount),
      // number values alag se store karo for payload
      sub_total_num: newSubTotal,
      sgst_num: sgst,
      cgst_num: cgst,
      total_amount_num: newTotalAmount,
    }));
  }, [inputFields, selectedNumber, selectedNumberTwo]);

  const handleOpenViewPdf = (invoiceId) => {
    dispatch(downloadPdf(invoiceId, setResponse, handleClose));
  };

  const handleSendMail = (data) => {
    const payload = JSON.stringify({
      invoice_id: data.invoice_id,
      email_id: data.emailid,
      username: data.username,
    });

    dispatch(sendMail(payload, setResponse, handleClose));
  };

const handleSubmit = useCallback(
  (e) => {
    e.preventDefault();
    if (!portalMap[selectedPortal]) {
      toast.error("Project name missing!");
      return;
    }
    if (!userDetails || !userDetails.id || !userDetails.username || !userDetails.email || !userDetails.address) {
      
      toast.error("User details missing!");
      return;
    }
    if (!order || order.sub_total === '0.00') {
      toast.error("Order details missing!");
      return;
    }
    const payload = JSON.stringify({
      user_id: userDetails.id,
      username: userDetails.username,
      email: userDetails.email,
      address: userDetails.address,
      sub_total: order.sub_total_num,
      domain_name: portalMap[selectedPortal],
      tax: parseFloat(order.cgst || 0) + parseFloat(order.sgst || 0),
      total_amount: order.total_amount_num,
      paid_amount: value,
      is_paid: paymentStatus,
      remaining_amount: remainingAmount,
      transaction_id: transitionsIds,
      items: inputFields.map((field) => ({
        product_id: field.name,
        quantity: field.quantity,
        unitprice: field.price,
        amount: field.amount,
      })),
    });

    dispatch(createAdminInvoice(payload, setResponse, handleClose));
  },
  [
    userDetails,
    order,
    domainName,
    value,
    inputFields,
    paymentStatus,
    remainingAmount,
    transitionsIds,
    portalMap[selectedPortal],
    dispatch,
    setResponse,
    handleClose,
  ]
);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <div className="d-flex  align-items-center">
            {/* <Tooltip title="Edit">
              <IconButton onClick={() => handleButtonClick(params.row)}>
                <Edit
                  index={params.row.id}
                  style={{
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "#0e397f",
                    padding: "0px",
                  }}
                />
              </IconButton>
            </Tooltip> */}
            <Tooltip title="download" disableInteractive interactive>
              <IconButton>
                <FileDownloadIcon
                  sx={{ padding: "0px", fontSize: "16px", color: "#3985ffff" }}
                  className="pl-1"
                  onClick={() => handleOpenViewPdf(params.row)}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Send Mail" disableInteractive interactive>
              <IconButton>
                <SendIcon
                  sx={{ padding: "0px", fontSize: "16px", color: "#ff8800ff" }}
                  className="pl-1"
                  onClick={() => handleSendMail(params.row)}
                />
              </IconButton>
            </Tooltip>
            {/* <Button className="invoice_download" ></Button> */}
          </div>
        );
      },
    },
    {
      field: "invoice_id",
      headerName: "Invoice Id",
      width: 130,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
        {
      field: "transaction_id",
      headerName: "Transaction Id",
      width: 130,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="d-flex  align-items-center">
            <Tooltip title={params.row.emailid} disableInteractive interactive>
              <span>{params.value}</span>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "domain_name",
      headerName: "Domain",
      width: 170,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "tax",
      headerName: "Tax",
      width: 80,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },

    {
      field: "is_paid",
      headerName: "Is Paid",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "sub_total",
      headerName: "Sub Total",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "paid_amount",
      headerName: "Paid Amount",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
        {
      field: "remaining_amount",
      headerName: "Remaining Amount",
      width: 135,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_at",
      headerName: "Date",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          var day = date.getUTCDate();
          var month = date.getUTCMonth() + 1; // Month starts from 0
          var year = date.getUTCFullYear();
          var hours = date.getUTCHours();
          var minutes = date.getUTCMinutes();
          var seconds = date.getUTCSeconds();

          // Formatting single-digit day/month with leading zero if needed
          day = (day < 10 ? "0" : "") + day;
          month = (month < 10 ? "0" : "") + month;

          // Formatting single-digit hours/minutes/seconds with leading zero if needed
          hours = (hours < 10 ? "0" : "") + hours;
          minutes = (minutes < 10 ? "0" : "") + minutes;
          seconds = (seconds < 10 ? "0" : "") + seconds;
          var formattedDate =
            day +
            "/" +
            month +
            "/" +
            year +
            " " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
          return (
            <>
              <span style={{ color: "blue" }}>
                {day}/{month}/{year}
              </span>
              &nbsp;
              <span style={{ color: "green" }}>
                {hours}:{minutes}:{seconds}
              </span>
            </>
          );
        }
      },
    },
  ];

  // ============>

  const rows = [];
  state?.getAdminInvoice?.invoice &&
    state?.getAdminInvoice?.invoice?.forEach((item, index) => {
      rows.push({
        id: index + 1,
        user_id: item.user_id,
        invoice_id: item.invoice_id,
        username: item.username,
        tax: item.tax,
        is_paid: item?.is_paid,
        sub_total: item?.sub_total,
        paid_amount: item?.paid_amount,
        total_amount: item?.total_amount,
        created_at: item?.created_at,
        emailid: item?.email,
        domain_name: item?.domain_name,
        remaining_amount: item?.remaining_amount,
        transaction_id: item?.transaction_id,
      });
    });

  return (
    <>
      <div>
        <div className="contant_box">
          <Box
            className="right_sidebox mobile_top_pddng"
            component="main"
            sx={{
              flexGrow: 1,
              p: 0.5,
              display: "flex",
              justifyContent: "start",
              minHeight: "100vh",

              marginTop: "65px",
            }}
          >
            <div className="container-fluid  pt-3 invoicess">
              <div className="">
                {/* <!----> */}
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    {/* <!--role-contet--> */}
                    <div>
                      <div
                        className="cntnt_title"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                        }}
                      >
                        <div className="">
                          <h3
                            style={{
                              margin: "0px",
                              color: "#41454E",
                              fontWeight: "500",
                              fontSize: "2rem",
                            }}
                          >
                            Invoice
                          </h3>
                        </div>
                        <IconButton
                          className="all_button_clr"
                          onClick={handleOpen}
                        >
                          Add
                          <AddOutlinedIcon />
                        </IconButton>

                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          open={open}
                          closeAfterTransition
                          slots={{ backdrop: Backdrop }}
                          slotProps={{
                            backdrop: {
                              timeout: 500,
                            },
                          }}
                        >
                          <Fade in={open} className="bg_imagess">
                            <Box
                              sx={style}
                              borderRadius="10px"
                              textAlign="center"
                            >
                              <IconButton
                                onClick={handleClose}
                                sx={{ float: "inline-end" }}
                              >
                                <Close />
                              </IconButton>

                              <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                color={"#092b5f"}
                                fontSize={"18px"}
                                fontWeight={"600"}
                                marginBottom={"16px"}
                              >
                                Add Invoice
                              </Typography>
                              <form
                                style={{
                                  textAlign: "center",
                                  // height: "400px",

                                  paddingTop: "10px",
                                  padding: "5px",
                                }}
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <FormControl
                                      sx={{ m: 1, minWidth: 120 }}
                                      size="small"
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                      className={classes.formControl}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Select Project
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="SelectDomain"
                                        helperText="Select the language."
                                        style={{ textAlign: "left" }}
                                        value={selectedPortal}
                                        onChange={handlePortalChange}
                                        disabled={true}
                                      >
                                        <MenuItem value="sip">
                                          devsip.all8series.com
                                        </MenuItem>
                                        <MenuItem value="forwarding">
                                          devredirect.tellipsis.com
                                        </MenuItem>
                                        <MenuItem value="manage">
                                          dev.tellipsis.com
                                        </MenuItem>
                                        <MenuItem value="telcolinellc">voip.telcolinellc.com</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <div className="col-md-3">
                                    <FormControl
                                      sx={{ m: 1, minWidth: 120 }}
                                      size="small"
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        UserName
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        style={{ textAlign: "left" }}
                                        value={userDetails || ""} // full object store kar rahe hain
                                        onChange={(e) => {
                                          setUserDetails(e.target.value); // {id, username, email}
                                        }}
                                        renderValue={(selected) =>
                                          selected.username || "Select a User"
                                        } // 👈 fix
                                      >
                                        {state?.allUsers?.users?.map(
                                          (item, index) => (
                                            <MenuItem
                                              key={index}
                                              value={{
                                                id: item?.id,
                                                username: item?.username,
                                                email: item?.email,
                                                address: item?.address
                                              }}
                                            >
                                              {item.username}
                                            </MenuItem>
                                          )
                                        )}
                                      </Select>
                                    </FormControl>
                                  </div>

                                  <div className="col-md-12">
                                    <div
                                      className="table_box mt-1"
                                      style={{
                                        overflowY: "auto",
                                        height: "350px",
                                      }}
                                    >
                                      <table className="table table-responsive table-bordered border rounded table-sm">
                                        <thead>
                                          <tr>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                              }}
                                            >
                                              S.no.
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                                width: "160px",
                                                display: "block",
                                              }}
                                            >
                                              Item Name
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                                width: "20%",
                                              }}
                                            >
                                              Quantity
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                                width: "35%",
                                              }}
                                            >
                                              Price
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                              }}
                                            >
                                              Amount
                                            </th>
                                            <th
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "500 !important",
                                              }}
                                            >
                                              Action
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {inputFields?.map((input, index) => (
                                            <tr key={index}>
                                              <td style={{ width: "5%" }}>
                                                {index + 1}
                                              </td>
                                              <td>
                                                <select
                                                  className="form-select border-1"
                                                  style={{
                                                    width: "150px !important",
                                                  }}
                                                  name="name"
                                                  value={input.name}
                                                  onChange={(event) =>
                                                    handleFormChange(
                                                      index,
                                                      event
                                                    )
                                                  }
                                                >
                                                  <option value="">
                                                    Select Item
                                                  </option>
                                                  {state?.getAdminProducts?.products?.map(
                                                    (item, idx) => (
                                                      <option
                                                        key={idx}
                                                        value={item.id}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </td>
                                              <td>
                                                <input
                                                  className="form-control border-1"
                                                  style={{
                                                    width: "100px !important",
                                                    textAlign: "center",
                                                  }}
                                                  type="number"
                                                  name="quantity"
                                                  placeholder="Quantity"
                                                  value={input.quantity}
                                                  onChange={(event) =>
                                                    handleFormChange(
                                                      index,
                                                      event
                                                    )
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  className="border-1 form-control"
                                                  style={{
                                                    width: "150px",
                                                    margin: "0 auto",
                                                    textAlign: "center",
                                                  }}
                                                  type="text"
                                                  name="price"
                                                  placeholder="Price"
                                                  value={input.price}
                                                  readOnly
                                                />
                                              </td>
                                              <td>
                                                {(
                                                  input.quantity * input.price
                                                ).toLocaleString("en-IN", {
                                                  style: "currency",
                                                  currency: "INR",
                                                  minimumFractionDigits: 2,
                                                  maximumFractionDigits: 2,
                                                })}
                                              </td>

                                              <td className="text-center">
                                                <button
                                                  className="btn btn-danger ml-2 table_remove_btn"
                                                  onClick={() =>
                                                    removeFields(index)
                                                  }
                                                >
                                                  Remove
                                                </button>
                                              </td>
                                            </tr>
                                          ))}

                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="table_bottom_row text-start"
                                            >
                                              <button
                                                type="button"
                                                onClick={addFields}
                                                className="btn btn-secondary table_add_btn ms-auto "
                                              >
                                                Add More..
                                              </button>
                                            </td>

                                            <td
                                              colSpan="3"
                                              className="d-flex align-items-center"
                                            >
                                              <b>Subtotal</b>
                                            </td>

                                            <td
                                              rowSpan="3"
                                              className="d-flex align-items-center"
                                            >
                                              <b className="d-flex align-items-center">
                                                SGST{" "}
                                                <span
                                                  style={{
                                                    fontSize: "13px",
                                                    fontWeight: "400",
                                                  }}
                                                >
                                                  <select
                                                    class="form-select gst_select "
                                                    aria-label="Default select example"
                                                    id="number-select"
                                                    value={selectedNumber}
                                                    label="Select Number"
                                                    onChange={handleChangeGst}
                                                  >
                                                    {/* <option selected>select</option> */}
                                                    {Array.from(
                                                      { length: 19 },
                                                      (_, index) => index + 0
                                                    ).map((number) => (
                                                      <option
                                                        value={number}
                                                        key={number}
                                                      >
                                                        {number}%
                                                      </option>
                                                    ))}
                                                  </select>
                                                </span>
                                              </b>
                                            </td>

                                            <td
                                              rowSpan="3"
                                              className="d-flex align-items-center"
                                            >
                                              <b className="d-flex align-items-center">
                                                CGST{" "}
                                                <span
                                                  style={{
                                                    fontSize: "13px",
                                                    fontWeight: "400",
                                                  }}
                                                >
                                                  <select
                                                    class="form-select gst_select "
                                                    aria-label="Default select example"
                                                    id="number-select"
                                                    value={selectedNumberTwo}
                                                    label="Select Number"
                                                    onChange={
                                                      handleChangeGstTwo
                                                    }
                                                  >
                                                    {/* <option selected>select</option> */}
                                                    {Array.from(
                                                      { length: 19 },
                                                      (_, index) => index + 0
                                                    ).map((number) => (
                                                      <option
                                                        value={number}
                                                        key={number}
                                                      >
                                                        {number}%
                                                      </option>
                                                    ))}
                                                  </select>
                                                </span>
                                              </b>
                                            </td>

                                            <td
                                              rowSpan="3"
                                              className="d-flex align-items-center"
                                            >
                                              <b>Total</b>
                                            </td>

                                            <td colSpan="3">
                                              <span
                                                className="total_bill_price d-block"
                                                style={{
                                                  fontSize: "15px",
                                                  fontWeight: "400",
                                                  color: "black",
                                                  textAlign: "left",
                                                  paddingLeft: "10px",
                                                }}
                                              >
                                                {order.sub_total}
                                              </span>

                                              <span
                                                className="total_bill_price d-block pt-2"
                                                style={{
                                                  fontSize: "15px",
                                                  fontWeight: "400",
                                                  color: "black",
                                                  textAlign: "left",
                                                  paddingLeft: "10px",
                                                }}
                                              >
                                                {order.sgst}
                                              </span>

                                              <span
                                                className="total_bill_price d-block pt-2"
                                                style={{
                                                  fontSize: "15px",
                                                  fontWeight: "400",
                                                  color: "black",
                                                  textAlign: "left",
                                                  paddingLeft: "10px",
                                                }}
                                              >
                                                {order.cgst}
                                              </span>

                                              <span
                                                className="total_bill_price d-block pt-2"
                                                style={{
                                                  fontSize: "15px",
                                                  fontWeight: "400",
                                                  color: "black",
                                                  textAlign: "left",
                                                  paddingLeft: "10px",
                                                }}
                                              >
                                                {order.total_amount}
                                              </span>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="text-end"
                                            ></td>
                                            <td
                                              colSpan="1"
                                              className="text-start"
                                            >
                                              <b className="total_bill_price d-block pt-2 text-left">
                                                Paid amount
                                              </b>
                                            </td>
                                            <td
                                              colSpan="2"
                                              className="text-end"
                                            >
                                              <Form>
                                                <Form.Group>
                                                  <Form.Control
                                                    type="text"
                                                    value={value}
                                                    onChange={handleChange}
                                                    maxLength={10} // adjust max length as needed
                                                    placeholder="Enter a number"
                                                  />
                                                </Form.Group>
                                              </Form>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="text-end"
                                            ></td>

                                            <td
                                              colSpan="1"
                                              className="text-start"
                                            >
                                              <b className="d-flex align-items-center total_bill_price d-block pt-2 text-left">
                                                Is Paid{" "}
                                              </b>
                                            </td>

                                            <td
                                              colSpan="2"
                                              className="text-start"
                                            >
                                              {/* <input
                                                type="checkbox"
                                                className="paid_checkbox form-check-input custom-checkbox"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                              /> */}
                                              <span
                                                style={{
                                                  fontSize: "13px",
                                                  fontWeight: "400",
                                                }}
                                              >
                                                <select
                                                  className="form-select"
                                                  aria-label="Payment Status"
                                                  value={paymentStatus}
                                                  onChange={handlePaymentChange}
                                                  style={{ width: "120px" }}
                                                >
                                                  <option value="">
                                                    Select
                                                  </option>

                                                  <option value="paid">
                                                    Paid
                                                  </option>
                                                  <option value="unpaid">
                                                    Unpaid
                                                  </option>
                                                  <option value="partial">
                                                    Partial
                                                  </option>
                                                </select>
                                              </span>
                                            </td>
                                          </tr>

                                          {/* reamaining amount */}

                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="text-end"
                                            ></td>

                                            <td
                                              colSpan="1"
                                              className="text-start"
                                            >
                                              <b className="d-flex align-items-center total_bill_price d-block pt-2 text-left">
                                                Remaining Amount
                                              </b>
                                            </td>

                                            <td
                                              colSpan="2"
                                              className="text-start"
                                            >
                                              <span
                                                className="total_bill_price d-block"
                                                style={{
                                                  fontSize: "15px",
                                                  fontWeight: "400",
                                                  color: "black",
                                                  paddingLeft: "10px",
                                                  textAlign: "left",
                                                }}
                                              >
                                                {remainingAmount}
                                              </span>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="text-end"
                                            ></td>

                                            <td
                                              colSpan="1"
                                              className="text-start"
                                            >
                                              <b className="d-flex align-items-center total_bill_price d-block pt-2 text-left">
                                                Transaction ID
                                              </b>
                                            </td>

                                            <td
                                              colSpan="2"
                                              className="text-start"
                                            >
                                              <span
                                                className="total_bill_price d-block"
                                                style={{
                                                  fontSize: "15px",
                                                  fontWeight: "400",
                                                  color: "black",
                                                  textAlign: "left",
                                                }}
                                              >
                                                <Form>
                                                  <Form.Group>
                                                    <Form.Control
                                                      type="text"
                                                      value={transitionsIds}
                                                      onChange={(e) =>
                                                        setTransitionsIds(
                                                          e.target.value
                                                        )
                                                      }
                                                      maxLength={10} // adjust max length as needed
                                                      placeholder="Enter a Transaction ID"
                                                    />
                                                  </Form.Group>
                                                </Form>
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </form>
                              <Button
                                variant="contained"
                                className="all_button_clr"
                                color="primary"
                                sx={{
                                  fontSize: "16px !impotant",
                                  background:
                                    "linear-gradient(180deg, #044c67 0%, #044c67 100%) !important",
                                  marginTop: "20px",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                }}
                                onClick={handleClose}
                              >
                                Cancel
                              </Button>

                              <Button
                                variant="contained"
                                className="all_button_clr"
                                sx={{
                                  fontSize: "16px !impotant",
                                  background: "#ffcc00!important",
                                  color: "#000!important",
                                  marginTop: "20px",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                }}
                                onClick={handleReset}
                              >
                                Reset
                              </Button>
                              <Button
                                variant="contained"
                                className="all_button_clr"
                                color="primary"
                                sx={{
                                  fontSize: "16px !impotant",
                                  background: "#092b5f",
                                  marginTop: "20px",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                }}
                                onClick={handleSubmit}
                              >
                                save
                              </Button>
                            </Box>
                          </Fade>
                        </Modal>
                      </div>

                      <div className="row">
                        <ThemeProvider theme={theme}>
                          <div style={{ height: "100%", width: "100%" }}>
                            <DataGrid
                              // checkboxSelection
                              rows={rows}
                              columns={columns}
                              headerClassName="custom-header"
                              // getRowClassName={(params) =>
                              //   isRowBordered(params)
                              //     ? classes.borderedGreen
                              //     : classes.borderedRed
                              // }
                              components={{ Toolbar: GridToolbar }}
                              slots={{
                                toolbar: CustomToolbar,
                              }}
                              autoHeight
                            />
                          </div>
                        </ThemeProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default AdminInvoice;
