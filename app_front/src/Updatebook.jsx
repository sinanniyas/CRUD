import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";

const Updateuser = () => {
  const { id } = useParams();
 const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/getBook/' + id)
      .then((result) => {console.log(result.data)
      setTitle(result.data.title)
      setName(result.data.name)
      setPrice(result.data.price)
      setPages(result.data.pages)
    })
  }, []);

  const update = (e) =>{
    e.preventDefault();
  axios
  .put('http://localhost:3001/updateBook/' + id, { title ,name, price, pages })
  .then(result => {  
    console.log(result);
    navigate('/books');
  })
  .catch((err) => console.log(err));


  } 
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Form onSubmit={update}>
          <h2>Update User</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswo">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Email" value={name} onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmia">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEma">
            <Form.Label>Page</Form.Label>
            <Form.Control type="number" placeholder="Enter pages" value={pages} onChange={(e) => setPages(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Updateuser;
