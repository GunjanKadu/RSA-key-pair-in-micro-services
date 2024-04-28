const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Resource API is working 🚀" });
});

module.exports = router;
