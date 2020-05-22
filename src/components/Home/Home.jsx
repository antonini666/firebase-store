import React from "react";
import { database } from "../../firebase";
import { Redirect } from "react-router-dom";
import Products from "../Products";

const Home = ({ user, data }) => {
  if (!user) {
    return <Redirect to="/" />;
  }

  return <Products data={data} user={user} database={database} />;
};

export default Home;
