import React, { useState } from "react";
import { database } from "../../firebase";
import { Link } from "react-router-dom";
import NewProduct from "./NewProductClass";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  // const [img, setImg] = useState("");
  const [newData, SetNewData] = useState(null);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "desc": {
        setDesc(e.target.value);
        break;
      }
      case "price": {
        setPrice(e.target.value);
        break;
      }
      default:
        break;
    }
    SetNewData(new NewProduct(title, desc, price));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    database.ref().push(newData);
  };

  return (
    <div className="add-page">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Title"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Add photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              id="desc"
              name="desc"
              className="form-control"
              placeholder="Description"
              minLength="20"
              maxLength="60"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              className="form-control"
              placeholder="Price"
              max="99999999.99"
              step="0.01"
              onChange={handleChange}
            />
          </div>
          <div className="form-check"></div>

          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
          <Link to="/home" className="btn btn-success">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
