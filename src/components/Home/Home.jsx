import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { Redirect } from "react-router-dom";
import Products from "../Products";

const Home = ({ user }) => {
  const [data, setData] = useState(null);
  const [dataRef, setDataRef] = useState(null);

  useEffect(() => {
    let mounted = true;
    database.ref().on("value", (snapshot) => {
      if (mounted) {
        setData(snapshot.val());
      }
    });

    return () => (mounted = false);
  }, []);

  if (!user) {
    return <Redirect to="/" />;
  }

  return <Products data={data} user={user} database={database} />;
};

export default Home;
