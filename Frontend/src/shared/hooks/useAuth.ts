import { api } from "api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH } from "shared/constants/routes";

export default function useAuth() {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const Navigate = useNavigate();

  const getCurrentUser = useCallback(async () => {
    try {
      setIsLoggedin(true);
    } catch (error) {
      Navigate(`/${AUTH}`);
    } finally {
      setFetching(false);
    }
  }, [Navigate]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  function setAuthorization(accessToken: string | undefined) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  return { isLoggedin, fetching };
}
