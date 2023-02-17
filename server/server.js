require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

// Insert Routes Here

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
