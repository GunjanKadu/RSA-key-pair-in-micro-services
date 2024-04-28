const fs = require("fs");
var rsaPemToJwk = require("rsa-pem-to-jwk");

const privateKey = fs.readFileSync("./certs/private.pem");

const jwk = rsaPemToJwk(privateKey, { use: "sig" }, "public");
