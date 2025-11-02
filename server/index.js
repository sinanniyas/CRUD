const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/users");
const BookModel = require("./models/books");
const ProductModel = require("./models/products");
const AuthModel = require("./models/auth");

require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://sinanniyasn_db_user:sinan6886@cluster0.hwmnbdd.mongodb.net/"
);

app.post("/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await AuthModel.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await AuthModel.create({ username, email, password: hashedPassword });

    res.json({ message: "Registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/auth/google", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // payload contains email, name, picture etc.
    console.log(payload);

    res.json({ user: payload });
  } catch (err) {
    console.error("Google verify error", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const query = req.query.q || ""; // search term
    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 5; // items per page
    const skip = (page - 1) * limit;

    let filter = {};
    if (query) {
      filter = {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      };
    }

    const total = await UserModel.countDocuments(filter); // total matching users
    const users = await UserModel.find(filter).skip(skip).limit(limit);

    res.json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then((deletedUser) => res.json(deletedUser))
    .catch((err) => res.json(err));
});

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/books", async (req, res) => {
  try {
    const query = req.query.q || ""; // search term
    const page = parseInt(req.query.page) || 1; // current page
    const limit = 5; // items per page
    const skip = (page - 1) * limit;

    let filter = {};
    if (query) {
      filter = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
        ],
      };
    }

    const total = await BookModel.countDocuments(filter);
    const books = await BookModel.find(filter).skip(skip).limit(limit);

    res.json({
      books,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/createb", (req, res) => {
  BookModel.create(req.body)
    .then((books) => res.json(books))
    .catch((err) => res.json(err));
});

app.delete("/deleteBook/:id", (req, res) => {
  const id = req.params.id;
  BookModel.findByIdAndDelete(id)
    .then((deletedBook) => res.json(deletedBook))
    .catch((err) => res.json(err));
});

app.get("/getBook/:id", (req, res) => {
  const id = req.params.id;
  BookModel.findById({ _id: id })
    .then((books) => res.json(books))
    .catch((err) => res.json(err));
});

app.put("/updateBook/:id", (req, res) => {
  const id = req.params.id;
  BookModel.findByIdAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      name: req.body.name,
      price: req.body.price,
      pages: req.body.pages,
    }
  )
    .then((books) => res.json(books))
    .catch((err) => res.json(err));
});

app.get("/products", async (req, res) => {
  try {
    const query = req.query.q || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const total = await ProductModel.countDocuments(filter);
    const products = await ProductModel.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const pages = Math.ceil(total / limit);

    res.json({ products, total, pages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/createProducts", (req, res) => {
  ProductModel.create(req.body)
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});

app.get("/getproduct/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findById({ _id: id })
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});

app.put("/updateproduct/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findByIdAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image,
    }
  )
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});

app.delete("/deleteproduct/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findByIdAndDelete(id)
    .then((deletedproduct) => res.json(deletedproduct))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("surver is running");
});
