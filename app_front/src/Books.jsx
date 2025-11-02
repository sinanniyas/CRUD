import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const limit = 5; // books per page

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/books?q=${searchTerm}&page=${page}&limit=${limit}`
        );
        setBooks(res.data.books);
        setPages(res.data.pages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooks();
  }, [searchTerm, page]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteBook/" + id)
      .then(() => {
        setBooks(books.filter((book) => book._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/createb" className="btn btn-success">
            Add +
          </Link>
          <input
            type="text"
            placeholder="Search books..."
            className="form-control w-50"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset page when searching
            }}
          />
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Price</th>
              <th>Pages</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.name}</td>
                <td>{book.price}</td>
                <td>{book.pages}</td>
                <td>
                  <Link
                    className="btn btn-success me-2"
                    to={`/updateBook/${book._id}`}
                  >
                    Update
                  </Link>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination buttons like Users */}
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

export default Books;
