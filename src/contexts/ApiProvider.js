import React, { createContext, useContext, useMemo } from 'react';

import AxiosConfig from '../helpers/axiosConfig';

const ApiContext = createContext({});

export const useApi = () => useContext(ApiContext);

function ApiProvider({ children, axiosConfig }) {
  const memoizedApi = useMemo(
    () => axiosConfig || new AxiosConfig(),
    [axiosConfig]
  );

  return (
    <ApiContext.Provider value={memoizedApi}>{children}</ApiContext.Provider>
  );
}

export default ApiProvider;
