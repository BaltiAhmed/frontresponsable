import { useState, useCallback, useEffect } from "react";
export const AdminAuth = () => {
  const [adminToken, setadminToken] = useState(false);
  const [adminId, setadminId] = useState(false);

  const adminLogin = useCallback((uid, token) => {
    setadminToken(token);
    setadminId(uid);

    localStorage.setItem(
      "adminData",
      JSON.stringify({
        adminId: uid,
        adminToken: token
      })
    );
  }, []);

  const adminLogout = useCallback(() => {
    setadminToken(null);
    setadminId(null);
    localStorage.removeItem("adminData");
  }, []);



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("adminData"));
    if (
      storedData &&
      storedData.adminToken 
    ) {
        adminLogin(
        storedData.adminId,
        storedData.adminToken
      );
    }
  }, [adminLogin]);

  return { adminToken, adminLogin, adminLogout, adminId };
};
