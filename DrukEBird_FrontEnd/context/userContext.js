import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ userToken, children }) => {
  // const [userToken, setUserToken] = useState(userToken);

  return (
    <UserContext.Provider value={{ userToken }}>
      {children}
    </UserContext.Provider>
  );
};