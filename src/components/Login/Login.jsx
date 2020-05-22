import React from "react";
import { Redirect } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";

const Login = ({ loggedIn }) => {
  if (loggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <button
        className="btn btn-success"
        onClick={() => auth.signInWithPopup(googleAuthProvider)}
      >
        Sign in
      </button>
    </div>
  );
};

export default Login;
