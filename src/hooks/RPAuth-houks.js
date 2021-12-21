import { useState, useCallback, useEffect } from "react";
export const RPAuth = () => {
  const [RPToken, setRPToken] = useState(false);
  const [RPId, setRPId] = useState(false);

  const RPLogin = useCallback((uid, token) => {
    setRPToken(token);
    setRPId(uid);

    localStorage.setItem(
      "RPData",
      JSON.stringify({
        RPId: uid,
        RPToken: token
      })
    );
  }, []);

  const RPLogout = useCallback(() => {
    setRPToken(null);
    setRPId(null);
    localStorage.removeItem("RPData");
  }, []);



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("RPData"));
    if (
      storedData &&
      storedData.RPToken 
    ) {
        RPLogin(
        storedData.RPId,
        storedData.RPToken
      );
    }
  }, [RPLogin]);

  return { RPToken, RPLogin, RPLogout, RPId };
};
