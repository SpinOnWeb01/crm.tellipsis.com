import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPortal: localStorage.getItem("selectedPortal") || "crm",
  tokens: {
    crm: JSON.parse(localStorage.getItem("crm_token")) || null,
    sip: JSON.parse(localStorage.getItem("sip_token")) || null,
    manage: JSON.parse(localStorage.getItem("manage_token")) || null,
    forwarding: JSON.parse(localStorage.getItem("forwarding_token")) || null,
    telcolinellc: JSON.parse(localStorage.getItem("telcolinellc_token")) || null,
  },
};

const portalSlice = createSlice({
  name: "portal",
  initialState,
  reducers: {
    setPortal: (state, action) => {
      state.selectedPortal = action.payload.portal;
      localStorage.setItem("selectedPortal", action.payload.portal);
    },
    setPortalToken: (state, action) => {
      const { portal, token } = action.payload;
      state.tokens[portal] = token;
      localStorage.setItem(`${portal}_token`, JSON.stringify(token));
    },
    clearPortalToken: (state, action) => {
      const { portal } = action.payload;
      state.tokens[portal] = null;
      localStorage.removeItem(`${portal}_token`);
    },
  },
});

export const { setPortal, setPortalToken, clearPortalToken } = portalSlice.actions;
export default portalSlice.reducer;
