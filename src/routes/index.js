const { Router } = require("express");

const router = Router();

router.use("/api", require("./contactsRoutes"));
router.use("/api", require("./categoriesRoutes"));

router.get("/", (_, res) => {
  res.send("API Working");
});

module.exports = router;
