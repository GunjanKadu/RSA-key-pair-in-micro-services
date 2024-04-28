const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const { expressjwt } = require("express-jwt");
const jwksClient = require("jwks-rsa");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

/**
 * The `express-jwt` library is used to handle JWT authentication in Express applications.
 * When used as middleware, `express-jwt` automatically extracts the JWT token from the
 * `Authorization` header in the HTTP request. The token is expected to be in the format:
 * `Authorization: Bearer <token>`.
 *
 * This middleware parses the `Authorization` header, extracts the JWT token, and proceeds
 * to verify the token's signature based on the provided configuration (such as the secret
 * or the public key obtained from the JWKS endpoint).
 *
 * In summary, `express-jwt` is responsible for extracting the JWT token from the header
 * and handling JWT authentication in Express applications.
 */
app.use(
  expressjwt({
    secret: jwksClient.expressJwtSecret({
      jwksUri: "http://localhost:4000/.well-known/jwks.json",
      cache: true,
      rateLimit: true,
    }),
    algorithms: ["RS256"],
  }).unless({ path: ["/"] })
);

app.get("/", async (req, res, next) => {
  res.send({ message: "Resource Service it works 🐻" });
});
app.get("/protected", async (req, res, next) => {
  res.send({ message: "This is a protected route" });
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
