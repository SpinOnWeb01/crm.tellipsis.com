const portalAPIs = {
  crm: process.env.REACT_APP_CRM_API,
  sip: process.env.REACT_APP_SIP_API,
  forwarding: process.env.REACT_APP_FORWARDING_API,
  manage: process.env.REACT_APP_MANAGE_API,
  telcolinellc: process.env.REACT_APP_TELCOLINELLC_API,
};

const credentials = {
  crm: {
    username: process.env.REACT_APP_CRM_USER,
    password: process.env.REACT_APP_CRM_PASS,
  },
  sip: {
    username: process.env.REACT_APP_SIP_USER,
    password: process.env.REACT_APP_SIP_PASS,
  },
  forwarding: {
    username: process.env.REACT_APP_FORWARDING_USER,
    password: process.env.REACT_APP_FORWARDING_PASS,
  },
  manage: {
    username: process.env.REACT_APP_MANAGE_USER,
    password: process.env.REACT_APP_MANAGE_PASS,
  },
  telcolinellc: {
    username: process.env.REACT_APP_TELCOLINELLC_USER,
    password: process.env.REACT_APP_TELCOLINELLC_PASS,
  },
};

export { portalAPIs, credentials };
