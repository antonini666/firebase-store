import React, { useState } from "react";
import { database, storage } from "../../firebase";
import NewProduct from "../NewProductClass";
import ItemForm from "../ItemForm";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [loadImg, setLoadImg] = useState(true);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "image":
        const file = e.target.files[0];
        let fileUrl = `${file.name.split(".")[0]}${Date.now()}.${
          file.name.split(".")[1]
        }`;

        const uploadTask = storage.ref(`images/${fileUrl}`).put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setLoadImg(snapshot.bytesTransferred === snapshot.totalBytes);
          },
          (error) => console.log(error),
          () => {
            storage
              .ref("images")
              .child(fileUrl)
              .getDownloadURL()
              .then((url) => {
                console.log(url);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    database.ref().push(new NewProduct(title, img, desc, price, Date.now()));
    setTitle("");
    setImg("");
    setPrice("");
    setDesc("");
  };

  return (
    <ItemForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      title={title}
      img={img}
      desc={desc}
      price={price}
      loadImg={loadImg}
      required={true}
    />
  );
};

export default AddPage;
