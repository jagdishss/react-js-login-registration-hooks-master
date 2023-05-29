// import React from "react";
import React, { useEffect, useState } from "react";
import { withRouter } from "./with-router";
// import AuthVerify from "./common/AuthVerify";
import AuthService from "../services/auth.service";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
// const [showModeratorBoard, setShowModeratorBoard] = useState(false);
//   const [showAdminBoard, setShowAdminBoard] = useState(false);
//   const [currentUser, setCurrentUser] = useState(undefined);
//   const logOut = () => {
//     AuthService.logout();
//     setShowModeratorBoard(false);
//     setShowAdminBoard(false);
//     setCurrentUser(undefined);
//   };
const AuthVerify = (props) => {
  let location = props.router.location;
  
 
  console.log(location);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user.token);

      if (null !== decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
        AuthService.logout();
        // location.pathname="/login";
        console.log("****" +location.pathname);
      }
    }
  });
  // location.pathname="/login";
  // console.log("------" +location.pathname);
  return <div></div>;
};

export default withRouter(AuthVerify);
