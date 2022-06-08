import React, { useEffect, useReducer } from 'react';
import { useLocalStorage } from 'react-use';
import { authMe } from '../helpers/axiosConfig';
export const AuthorizationContext = React.createContext();

const initialState = { userName: '' };

const reducer = (state, action) => {
  switch (action.type) {
    case 'setUserName': {
      return {
        ...state,
        userName: action.payload,
      };
    }
    case 'removeUserName': {
      return {
        ...state,
        userName: '',
      };
    }
    default: {
      return state;
    }
  }
};

export const AuthorizationProvider = ({ children }) => {
  const [{ userName }, dispatch] = useReducer(reducer, initialState);

  const [authToken, setAuthToken, removeAuthToken] = useLocalStorage(
    'token',
    null,
    {
      raw: true,
    }
  );

  useEffect(() => {
    if (!!authToken) {
      authMe().then((res) => {
        const userData = res.data;
        dispatch({
          type: 'setUserName',
          payload: `${userData.firstName} ${userData.lastName} `,
        });
      });
    }
  }, [authToken]);

  const contextValues = {
    authToken,
    setAuthToken,
    removeAuthToken,
    userName,
    dispatch,
  };

  return (
    <AuthorizationContext.Provider value={contextValues}>
      {children}
    </AuthorizationContext.Provider>
  );
};
