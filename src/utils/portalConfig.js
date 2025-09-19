// src/utils/portalConfig.js
const portalAPIs = {
  crm: "https://crm.tellipsis.com/api",
  sip: "https://devsip.all8series.com/api",
  forwarding: "https://devredirect.tellipsis.com/api",
  manage: "https://dev.tellipsis.com/api",
};

/**
 * ✅ Helper function
 * Agar module === "products" → hamesha crm_token use hoga
 * warna → selectedPortal ka token use hoga
 */
export const getPortalConfig = (state, module = "") => {
  const selectedPortal =
    state?.portal?.selectedPortal ||
    localStorage.getItem("selectedPortal");

  let token;

  if (module === "products") {
    // ✅ Products ke liye hamesha crm_token
    token = JSON.parse(localStorage.getItem("crm_token"));
    return {
      apiBase: portalAPIs.crm,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token.access_token}` : "",
      },
    };
  }

  // ✅ Agar portal select nahi hai → null return
  if (!selectedPortal || selectedPortal === "crm") {
    return null;
  }

  token = JSON.parse(localStorage.getItem(`${selectedPortal}_token`));

  return {
    apiBase: portalAPIs[selectedPortal] || "",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token.access_token}` : "",
    },
  };
};

