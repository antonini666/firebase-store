import React from "react";
import app from "../../firebase";
import { Link } from "react-router-dom";

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
                  <img
                    src={item.img}
                    alt=""
                    width="100%"
                    className="card-img"
                  />
                  <div className="card-body justify-between">
                    <div className="d-flex flex-column">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                    </div>

                    <div className="d-flex flex-column align-items-center pt-4">
                      <p className="card-price badge badge-primary">
                        {item.price}$
                      </p>
                      <div className="btn-wrap">
                        <Link
                          to={`/edit/${Object.keys(data)[index]}`}
                          className="btn btn-success"
                        >
                          Edit
                        </Link>

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
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Products;
