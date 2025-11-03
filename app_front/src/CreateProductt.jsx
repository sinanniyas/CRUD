import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Createproduct = () => {

  const preset_key="sinanniyasss";
  const cloud_name="dy23i7wvr";
  const [image, setimage] = useState("")

  const [title, setTitle] = useState("");
  const [category, setcategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setstock] = useState("");
  
  const navigate = useNavigate();

  function Uploadimage(event){
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file',file)
    formData.append('upload_preset', preset_key )
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res) => {
        setimage(res.data.secure_url);
         
      })
      .catch((err) => console.error(err));
  ;

  }

const submit = (e) => {
  e.preventDefault();

  if (!image) {
    alert("Please wait for the image to finish uploading.");
    return;
  }

  axios
    .post("http://localhost:3001/createProducts", {
      title,
      category,
      price,
      stock,
      image
    })
    .then((result) => {
      console.log(result);
      navigate("/products");
    })
    .catch((err) => console.log(err));
};

   
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Form onSubmit={submit}>
          <h2>Add Book</h2>

          <Form.Group className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              onChange={(e) => setcategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock left</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of stockleft"
              onChange={(e) => setstock(e.target.value)}
            />
          </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" onChange={Uploadimage} />
      </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Createproduct;
