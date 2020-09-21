import React, {useState} from "react";
import {AlertContext} from "./Alert";


export const AlertState = ({children}) => {

    const [alert, setAlert] = useState(null);

    const onShowAlert = (alert, duration ) => {
        setAlert(() => {
            return {
                ...alert
            }
        });
     if (duration) {
         let timeout = setTimeout(() => {
             setAlert(null);
             clearTimeout(timeout)
         },duration)
     }

    };

    const onCloseAlert = () => {

    };

  return (
      <AlertContext.Provider value={{alert, onShowAlert}}>
          {children}
      </AlertContext.Provider>
  )
};