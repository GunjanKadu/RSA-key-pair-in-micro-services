const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const JWT = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const app = express();
const privateKey = fs.readFileSync("./certs/private.pem");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/login", async (req, res, next) => {
  // Currently just issuing JWT assuming that the login is already done
  const token = JWT.sign({ username: "dummyUser" }, privateKey, {
    expiresIn: "10min",
    algorithm: "RS256",
  });
  res.send({ message: "Token generated successfully", token });
});

app.use("/api", require("./routes/api.route"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
