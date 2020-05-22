import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { auth, database } from "./firebase";
import { Home, Login, AddPage, EditPage } from "./components";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    database.ref().on("value", (snapshot) => {
      if (mounted) {
        setData(snapshot.val());
      }
    });

    auth.onAuthStateChanged((loggedIn) => {
      if (mounted) {
        setLoggedIn(loggedIn);
      }
    });

    return () => (mounted = false);
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
      <Route
        path="/home"
        component={() => <Home user={loggedIn} data={data} />}
      />
      <Route path="/login" component={() => <Login loggedIn={loggedIn} />} />
      <Route path="/add" component={AddPage} />
      <Route
        path="/edit/:id"
        component={({ match }) =>
          data ? (
            <EditPage data={data[match.params.id]} id={match.params.id} />
          ) : (
            <div>Loading...</div>
          )
        }
      />
    </Router>
  );
};

export default App;
