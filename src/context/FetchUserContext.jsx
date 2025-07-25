import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { __DB } from "../backend/firebaseconfig";
import { AuthUserContext } from "./AuthContextApi";

//! Step-1: Create Context for the backend user
export let BackendUserContext = createContext(null);

const FetchUserContext = ({ children }) => {
  let { authUser } = useContext(AuthUserContext);
  let uid = authUser?.uid;

  let [userData, setUserData] = useState();

  useEffect(() => {
    let fetchProfile = () => {
      if (!uid) {
        return;
      }
      //! onSnapShot() -> Event Listener
      let user_data_reference = doc(__DB, "user_details", uid);
      onSnapshot(user_data_reference, (userInfo) => {
        if (userInfo.exists()) {
          setUserData(userInfo?.data());
        } else {
          console.log("Profile Data not found");
        }
      });
    };
    fetchProfile();
  }, [uid]);
  //! [uid] is the dependency array - will fetch data whenever uid is present.
  return (
    <BackendUserContext.Provider value={{ userData }}>
      {children}
    </BackendUserContext.Provider>
  );
};

export default FetchUserContext;
