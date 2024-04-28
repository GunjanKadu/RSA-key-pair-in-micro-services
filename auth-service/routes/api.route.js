const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Auth Service is  working 🚀" });
});

module.exports = router;
