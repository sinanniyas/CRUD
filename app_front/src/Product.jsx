import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const limit = 5; // items per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/products?q=${searchTerm}&page=${page}&limit=${limit}`
        );
        setProduct(res.data.products);
        setPages(res.data.pages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [searchTerm, page]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteproduct/" + id)
      .then(() => {
        setProduct(product.filter((p) => p._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/createp" className="btn btn-success">
            Add +
          </Link>
          <input
            type="text"
            placeholder="Search products/category"
            className="form-control w-50"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset to page 1 on search
            }}
          />
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Left</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  <Link
                    className="btn btn-success me-2"
                    to={`/updateproduct/${p._id}`}
                  >
                    Update
                  </Link>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        
        <div className="d-flex justify-content-center mt-3">
          {Array.from({ length: pages }, (_, i) => (
            <Button
              key={i + 1}
              className="me-2"
              variant={i + 1 === page ? "primary" : "light"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
