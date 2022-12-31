import useUserContext from "contexts/UserContext/userContext";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "services/api";
import { userSellerService } from "services/user.seller.service";
import { TOKEN } from "shared/constants/common";
import { HOME } from "shared/constants/routes";
import { clearDataStorage, getDataStorage } from "shared/utils";
import { convertDateFormatUsToBr } from "shared/utils/date/convert-date-us-to-br";

export default function useAuth() {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const { update } = useUserContext();

  const navigate = useNavigate();

  const getDataUserInformation = useCallback(async () => {
    const { data } = await userSellerService.USER.GET_USER_INFORMATION();

    data.birthdate = convertDateFormatUsToBr(data.birthdate);
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
