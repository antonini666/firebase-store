import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { auth } from "./firebase";
import { Home, Login, AddPage } from "./components";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((loggedIn) => {
      setLoggedIn(loggedIn);
    });
  }, [loggedIn]);

  return (
    <Router>
      <Route
        exact
        path="/"
        component={() =>
          loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />
        }
      />
      <Route path="/home" component={() => <Home user={loggedIn} />} />
      <Route path="/login" component={() => <Login loggedIn={loggedIn} />} />
      <Route path="/add" component={AddPage} />
    </Router>
  );
};

export default App;
