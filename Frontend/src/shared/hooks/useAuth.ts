import { api } from "api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "shared/constants/common";
import { ENDPOINT } from "shared/constants/endpoints";
import { HOME } from "shared/constants/routes";
import useUserContext from "shared/contexts/UserContext/userContext";
import { clearDataStorage, getDataStorage } from "shared/utils";

export default function useAuth() {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const { update } = useUserContext();

  const navigate = useNavigate();

  const getDataUserInformation = useCallback(async () => {
    const { data } = await ENDPOINT.GET_USER_INFORMATION();
    update({ user: data });
  }, [update]);

  const setAuthorization = useCallback(
    (accessToken: string | undefined) => {
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      getDataUserInformation();
    },
    [getDataUserInformation]
  );

  useEffect(() => {
    const token = getDataStorage(TOKEN);

    if (token) {
      setAuthorization(token);
      setIsLoggedin(true);
    } else {
      navigate(`${HOME}`);
    }

    setFetching(false);
  }, [navigate, setAuthorization]);

  function logout() {
    clearDataStorage(TOKEN);
    setIsLoggedin(false);
    navigate(`${HOME}`);
  }

  return { isLoggedin, fetching, logout };
}
