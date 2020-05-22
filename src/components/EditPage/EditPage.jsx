import React, { useState } from "react";
import { storage, database } from "../../firebase";
import NewProduct from "../NewProductClass";
import ItemForm from "../ItemForm";

const EditPage = ({ data, id }) => {
  const [title, setTitle] = useState(data.title);
  const [price, setPrice] = useState(data.price);
  const [desc, setDesc] = useState(data.description);
  const [img, setImg] = useState(data.img);
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
    database
      .ref()
      .child(id)
      .set(new NewProduct(title, img, desc, price, data.id));
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
      required={false}
    />
  );
};

export default EditPage;
