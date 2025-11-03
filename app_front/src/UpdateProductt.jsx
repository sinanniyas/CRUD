import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";

const Updateproduct = () => {
  const { id } = useParams();
 const [title, setTitle] = useState("");
  const [category, setcategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setPages] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/getproduct/' + id)
      .then((result) => {console.log(result.data)
      setTitle(result.data.title)
      setcategory(result.data.category)
      setPrice(result.data.price)
      setPages(result.data.stock)
    })
  }, []);

  const update = (e) =>{
    e.preventDefault();
  axios
  .put('http://localhost:3001/updateproduct/' + id, { title ,category, price, stock })
  .then(result => {  
    console.log(result);
    navigate('/products');
  })
  .catch((err) => console.log(err));


  } 
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Form onSubmit={update}>
          <h2>Update Product</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswo">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Email" value={category} onChange={(e) => setcategory(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmia">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEma">
            <Form.Label>Page</Form.Label>
            <Form.Control type="number" placeholder="Enter stock" value={stock} onChange={(e) => setPages(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Updateproduct;
