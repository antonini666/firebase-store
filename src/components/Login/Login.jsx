import React from "react";
import { Redirect } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";

const Login = ({ loggedIn }) => {
  if (loggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <button onClick={() => auth.signInWithPopup(googleAuthProvider)}>
      Sign in
    </button>
  );
};

export default Login;
