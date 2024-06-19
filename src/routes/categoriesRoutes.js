const { Router } = require("express");

const CategoryController = require("../app/controllers/CategoryController");

const router = Router();

router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.post("/categories", CategoryController.store);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

module.exports = router;
