import { useState, useCallback, useEffect } from "react";



export const RLAuth = () => {
  const [RLToken, setRLToken] = useState(false);
  const [RLId, setRLId] = useState(false);

  const RLLogin = useCallback((uid, token) => {
    setRLToken(token);
    setRLId(uid);

    localStorage.setItem(
      "RLData",
      JSON.stringify({
        RLId: uid,
        RLToken: token
      })
    );
  }, []);

  const RLLogout = useCallback(() => {
    setRLId(null);
    setRLToken(null);
    localStorage.removeItem("RLData");
  }, []);



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("RLData"));
    if (
      storedData &&
      storedData.RLToken 
    ) {
        RLLogin(
        storedData.RLId,
        storedData.RLToken
      );
    }
  }, [RLLogin]);

  return { RLToken, RLLogin, RLLogout, RLId };
};
