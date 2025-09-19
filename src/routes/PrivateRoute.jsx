import React, { lazy, Suspense, useEffect } from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Router from "./route";
import { useState } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import AdminDashboard from "../components/admin/AdminDashboard";
import User from "../components/admin/User";
import DidTfnNumber from "../components/admin/DidTfnNumber";
import AdminMinutes from "../components/admin/AdminMinutes";
import AdminHistory from "../components/admin/AdminHistory";
import AdminBillingMinut from "../components/admin/AdminBillingMinut";
import SessionExpired from "../pages/SessionExpired";
import ErrorBoundary from "../pages/ErrorBoundaries";
import AdminCMU from "../components/admin/AdminCMU";
import AdminLayout from "../components/admin/AdminLayout";
import AdminReport from "../components/admin/AdminReport";
import AdminProduct from "../components/admin/AdminProduct";
import AdminInvoice from "../components/admin/AdminInvoice";
import AdminAclHistory from "../components/admin/AdminAclHistory";

import AdminRoles from "../components/admin/AdminRoles";
import AdminPermission from "../components/admin/AdminPermission";
import AdminAuditLog from "../components/admin/AdminAuditLogs";



Chart.register(CategoryScale);
function PrivateRoute() {
  const user = localStorage.getItem("crm_token");

  // -------------

  //state
  const color = localStorage.getItem("theme-color");
  const usercolor = localStorage.getItem("user-color");

  const [colorThem, setColorTheme] = useState(color);
  const [userThem, setUserThem] = useState(usercolor);
  const [selectedPortal, setSelectedPortal] = useState("");

  //effect
  useEffect(() => {
    //check for selected the ///localstorage value
    const currentThemeColor = localStorage.getItem("them-color");
    //if found set selected theme value in state
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }

    //check for selected the ///localstorage value
    const currentUserThemeColor = localStorage.getItem("user-color");
    //if found set selected theme value in state
    if (currentUserThemeColor) {
      setUserThem(currentUserThemeColor);
    }
  }, []);

  const handleClick = (theme) => {
    setColorTheme(theme);
    localStorage.setItem("theme-color", theme);
  };

  return (
    <>
      {/* <Sidebar/> */}
      <Switch>
        {user !== null ? (
          <>
            <Route
              path={Router.ADMIN_DASHBOARD}
              element={
                <AdminLayout colorThem={colorThem} handleClick={handleClick} selectedPortal={selectedPortal} setSelectedPortal={setSelectedPortal}/>
              }
            >
              <Route
                path={Router.ADMIN_DASHBOARD}
                element={<AdminDashboard colorThem={colorThem} selectedPortal={selectedPortal}/>}
              />
              <Route
                path={Router.ADMIN_USER}
                element={<User colorThem={colorThem} selectedPortal={selectedPortal}/>}
              />
              <Route
                path={Router.ADMIN_DID_TFN_NUMBER}
                element={<DidTfnNumber colorThem={colorThem} selectedPortal={selectedPortal}/>}
              />
              <Route
                path={Router.ADMIN_PRODUCT}
                element={<AdminProduct colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_INVOICE}
                element={<AdminInvoice colorThem={colorThem} selectedPortal={selectedPortal} setSelectedPortal={setSelectedPortal}/>}
              />
              <Route
                path={Router.ADMIN_REPORT}
                element={<AdminReport colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_BILLING_MINUTES}
                element={<AdminBillingMinut colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_MINUTES}
                element={<AdminMinutes colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_HISTORY}
                element={<AdminHistory colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_CMU}
                element={<ErrorBoundary><AdminCMU colorThem={colorThem} /></ErrorBoundary>}
              />
              <Route
              path={Router.ADMIN_ACL_HISTORY}
              element={<AdminAclHistory colorThem={colorThem} />}
            />
            <Route
              path={Router.ADMIN_AUDIT_LOGS}
              element={<AdminAuditLog colorThem={colorThem} />}
            />
             
            <Route
              path={Router.ADMIN_PERMISSIONS_ACCESS}
              element={<AdminPermission colorThem={colorThem} />}
            />
            <Route

              path={Router.ADMIN_ROLES}
              element={<AdminRoles colorThem={colorThem} />}
            />
            </Route>

            

          </>
        ) : (
          <>
            <Route path="*" element={<SessionExpired />} />
          </>
        )}
      </Switch>
    </>
  );
}

export default PrivateRoute;
