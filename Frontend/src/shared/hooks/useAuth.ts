import { api } from "api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "shared/constants/common";
import { HOME } from "shared/constants/routes";
import { clearDataStorage, getDataStorage } from "shared/utils";

export default function useAuth() {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getDataStorage(TOKEN);

    if (token) {
      setAuthorization(token);
      setIsLoggedin(true);
    } else {
      navigate(`${HOME}`);
    }

    setFetching(false);
  }, [navigate]);

  function setAuthorization(accessToken: string | undefined) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  function logout() {
    clearDataStorage(TOKEN);
    setIsLoggedin(false);
    navigate(`${HOME}`);
  }

  return { isLoggedin, fetching, logout };
}
