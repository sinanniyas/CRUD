import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1); // total pages

  const limit = 5; // users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `https://crud-wqs3.onrender.com/users?q=${searchTerm}&page=${page}&limit=${limit}`
        );
        setUsers(res.data.users);
        setPages(res.data.pages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [searchTerm, page]);

  const handleDelete = (id) => {
    axios
      .delete("https://crud-wqs3.onrender.com/deleteUser/" + id)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
          <input
            type="text"
            placeholder="Search users..."
            className="form-control w-50"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset page to 1 on search
            }}
          />
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link
                    className="btn btn-success me-2"
                    to={`/update/${user._id}`}
                  >
                    Update
                  </Link>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination controls */}
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
};

export default Users;
