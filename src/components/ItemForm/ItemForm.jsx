import React from "react";
import { Link } from "react-router-dom";

const ItemForm = ({
  handleChange,
  handleSubmit,
  title,
  img,
  desc,
  price,
  loadImg,
  required,
}) => {
  return (
    <div className="add-page">
      <div className="container">
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              minLength="20"
              maxLength="60"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <small className="form-text text-muted">
              Min text length 20, Max text length 60
            </small>
          </div>
          <div className="form-group ">
            <img src={img} alt="" height="100px" />
            <label className="pr-3" htmlFor="image">
              Add photo
            </label>
            <input
              className="btn btn-primary"
              type="file"
              id="image"
              name="image"
              accept=".jpg,.png,.webp"
              placeholder="Select an image"
              required={required}
              onChange={handleChange}
              autoComplete="off"
            />
            <small className="form-text text-muted">
              Min width and height: 200px, width and height: 4000px
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              id="desc"
              name="desc"
              className="form-control"
              placeholder="Description"
              maxLength="200"
              value={desc}
              onChange={handleChange}
              autoComplete="off"
            />
            <small className="form-text text-muted">Max text length 200</small>
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
              value={price}
              required
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="form-check"></div>
          <button type="submit" className="btn btn-primary" disabled={!loadImg}>
            Add Product
          </button>
          <Link to="/home" className="btn btn-success ml-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
