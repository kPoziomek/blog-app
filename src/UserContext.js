import React, { useCallback, useContext, useMemo, useState } from 'react';

import { loginUserAPI, authMe } from './helpers/axiosConfig';
const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

const NOOP = () => {};

export function UserProvider({ children }) {
  const [userData, setUserData] = useState();
  const [tokenData, setTokenData] = useState();

  const authUser = useCallback(() => {
    authMe().then((res) => {
      const userData = res.data;
      setUserData(userData);
    });
  }, []);

  const loginUser = useCallback(
    (user, { onSuccess = NOOP } = {}) => {
      loginUserAPI(user).then((res) => {
        const { data } = res;
        localStorage.setItem('token', data.auth_token);
        onSuccess(data);
        setTokenData(data);
        authUser();
      });
    },
    [authUser]
  );

  const logoutUser = useCallback(() => {
    setTokenData(false);
    localStorage.removeItem('token');
    setUserData(null);
  }, []);
  const value = useMemo(
    () => ({
      userData,
      tokenData,
      loginUser,

      authUser,
      logoutUser,
    }),
    [userData, tokenData, loginUser, authUser, logoutUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
