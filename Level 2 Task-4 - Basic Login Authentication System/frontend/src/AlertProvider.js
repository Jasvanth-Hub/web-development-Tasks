
import React, { useState, createContext, useContext } from 'react';
import AlertTemplate from './AlertTemplate';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert && <AlertTemplate message={alert} />}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
