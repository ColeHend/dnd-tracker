require("dotenv").config();
const { Login, Register } = require("./controllers/loginControllers");
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// app.post("/login", Login);
// app.post("/register", Register);

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
