import { createContext } from "react";

export const Authcontext = createContext({
  RPId: null,
  RPToken: null,
  RPLogin: () => {},
  RPLogout: () => {},
  RLId: null,
  RLToken: null,
  RLLogin: () => {},
  RLLogout: () => {},
  adminId: null,
  adminToken: null,
  adminLogin: () => {},
  adminLogout: () => {},

});
