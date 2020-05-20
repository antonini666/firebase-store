import React from "react";
import app from "../../firebase";
import { Link } from "react-router-dom";

import img from "../../apple.jpg";
import "./Products.css";

const Products = ({ data, user, database }) => {
  const deleteItem = (e) => {
    database.ref().child(e.target.dataset.id).set(null);
  };

  return (
    <div className="products">
      <div className="container">
        <header className="header">
          <Link to="/add">
            <button className="btn btn-success btn-add">Add product</button>
          </Link>

          <div className="user__wrap">
            <p className="user-name">{user.displayName}</p>
            <div className="user-img">
              <img src={user.photoURL} alt="" />
            </div>
            <button
              className="btn btn-warning btn-signout"
              onClick={() => app.auth().signOut()}
            >
              Sign Out
            </button>
          </div>
        </header>
        <div className="product-list">
          {data
            ? Object.values(data).map((item, index) => (
                <div className="card" key={item.id}>
                  <img src={img} alt="" width="100%" />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-price">{item.price}$</p>
                    <div className="btn-wrap">
                      <button className="btn btn-success">Edit</button>
                      <button
                        className="btn btn-danger"
                        onClick={deleteItem}
                        data-id={Object.keys(data)[index]}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Products;
