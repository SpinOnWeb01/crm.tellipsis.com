import React, { useEffect, useMemo, useState } from "react";
import { Close, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import {
  AccessTime, // Total Minutes
  ForwardToInbox, // Forward
  Call, // SIP
  Code, // Dev
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getAdminMinutes } from "../../redux/actions/adminPortal_minutesAction";

// ✅ Reusable Stat Card
function StatCard({ Icon, title, total, remaining, gradient }) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        p: 3,

        borderRadius: "18px",
        background: gradient,
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px) scale(1.02)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          color: "#fff",
          background: "rgba(255,255,255,0.25)",
          mr: 3,
        }}
      >
        <Icon sx={{ fontSize: 38, color: "#fff" }} />
      </Box>

      {/* Text */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff", mb: 1 }}>
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#fff!important", mb: 0.5 }}
        >
          {total} mins
        </Typography>
        {/* <Typography variant="body2" sx={{ fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
          Remaining: {remaining} mins
        </Typography> */}
      </Box>
    </Card>
  );
}

function AdminDashboard({ selectedPortal }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [totals, setTotals] = useState({
    remaining: 0,
    total: 0,
    used: 0,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (state.portal.selectedPortal !== "crm") {
      dispatch(getAdminMinutes());
    }
    if (selectedPortal === "crm") {
      setTotals({
        remaining: 0,
        total: 0,
        used: 0,
      });
    }
  }, [state.portal.selectedPortal, selectedPortal]);

  const handleSubmit = () => {
    console.log({ productName, price, description });
    setOpen(false);
    setProductName("");
    setPrice("");
    setDescription("");
  };

  const calculatedTotals = useMemo(() => {
    if (!state?.getAdminMinutes?.adminminutes)
      return { remaining: 0, total: 0, used: 0 };

    return state.getAdminMinutes.adminminutes.reduce(
      (acc, item) => {
        acc.remaining += item?.remaining_minutes || 0;
        acc.total += item?.total_minutes || 0;
        acc.used += item?.total_used_minutes || 0;
        return acc;
      },
      { remaining: 0, total: 0, used: 0 }
    );
  }, [state?.getAdminMinutes?.adminminutes]);

  // Update state when memoized value changes
  useEffect(() => {
    setTotals(calculatedTotals);
  }, [calculatedTotals]);

  return (
    <div className="contant_box">
      <Box
        className="right_sidebox mobile_top_pddng"
        component="main"
        sx={{
          flexGrow: 1,
          p: 0.5,
          display: "flex",
          justifyContent: "start",

          marginTop: "65px",
        }}
      >
        <div
          className="cntnt_title mt-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div>
            <h3
              style={{
                margin: "0px",
                color: "#41454E",
                fontWeight: "500",
                fontSize: "2rem",
                paddingLeft: "10px",
              }}
            >
              Dashboard
            </h3>
          </div>

          {state.portal.selectedPortal === "crm" ? (
            <>
              <Button
                variant="contained"
                className="all_button_clr"
                startIcon={<AddOutlinedIcon />}
                onClick={handleOpen}
              >
                Add Product
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </Box>

      {/* Stat Cards */}
      {state.portal.selectedPortal !== "crm" ? (
        <>
           <div className="container-fluid pt-3">
              <div className="row">
                <div className="col-lg-12">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <StatCard
                  Icon={AccessTime}
                  title="Total Minutes"
                  total={totals.total}
                  //remaining={3500}
                  gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatCard
                  Icon={ForwardToInbox}
                  title="Used Minutes"
                  total={totals.used}
                  //remaining={1500}
                  gradient="linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatCard
                  Icon={Call}
                  title="Remaining Minutes"
                  total={totals.remaining}
                  //remaining={1200}
                  gradient="linear-gradient(135deg, #56ccf2 0%, #2f80ed 100%)"
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
            <StatCard
              Icon={Code}
              title="Dev"
              total={2800}
              remaining={1000}
              gradient="linear-gradient(135deg, #43cea2 0%, #185a9d 100%)"
            />
          </Grid> */}
            </Grid>
          </div>
          </div>
          </div>
          
        </>
      ) : (
        <></>
      )}

      {/* Add Product Dialog */}
      {/* <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="dense"
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog open={open} onClose={handleClose} sx={{ textAlign: "center" }}>
        <Box>
          <br />
          <IconButton
            className="close_icon"
            onClick={handleClose}
            sx={{
              float: "inline-end",
              display: "flex",
              justifyContent: "end",
              margin: "10px 10px 0px 0px",
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <DialogTitle
          sx={{
            color: "#07285d",
            fontWeight: "600",
            width: "500px",
            textAlign: "center",
          }}
          className="extension_title"
        >
          <Box>
            {" "}
            <img src="/img/mdl_icon.png" alt="user icon" />
          </Box>
          Add Minutes
        </DialogTitle>
        <DialogContent>
          <form
            style={{
              textAlign: "center",
              // height: "348px",
              height: "200px",
              // overflow: "auto",
              paddingTop: "10px",
              padding: "5px",
              width: "auto",
            }}
          >
            <TextField
              style={{ width: "100%", margin: " 5px 0 5px 0" }}
              type="text"
              variant="outlined"
              name="roleName"
              margin="dense"
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <br />

            <TextField
              style={{ width: "100%", margin: " 5px 0 5px 0" }}
              type="text"
              variant="outlined"
              margin="dense"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />

            <TextField
              style={{ width: "100%", margin: " 5px 0 5px 0" }}
              type="text"
              variant="outlined"
              margin="dense"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              fontSize: "16px !impotant",
              background:
                "linear-gradient(180deg, #044c67 0%, #044c67 100%) !important",
              marginLeft: "0px !important",
              padding: "10px 20px !important",
              textTransform: "capitalize !important",
            }}
            className="all_button_clr"
            color="info"
            onClick={handleClose}
            autoFocus
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: "16px !impotant",
              padding: "10px 20px !important",
              textTransform: "capitalize !important",
              marginLeft: "0px !important",
              marginRight: "0px !important",
            }}
            className="all_button_clr"
            color="error"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminDashboard;
