import React, { useState } from "react";
import { database, storage } from "../../firebase";
import { Link } from "react-router-dom";
import NewProduct from "./NewProductClass";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [newData, SetNewData] = useState(null);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "image":
        const file = e.target.files[0];
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        console.log(uploadTask);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(file.name)
              .getDownloadURL()
              .then((url) => {
                setImg(url);
              });
          }
        );
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
    SetNewData(new NewProduct(title, img, desc, price));
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Add photo</label>
            {/* <FileInput accept=".png,.jpg" placeholder="Select an image" /> */}
            <input
              type="file"
              accept=".png,.jpg"
              id="image"
              name="image"
              placeholder="Select an image"
              required
              onChange={handleChange}
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
              required
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
              required
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
