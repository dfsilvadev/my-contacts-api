const { Router } = require("express");

const ContactController = require("./app/controllers/ContactController");
const CategoryController = require("./app/controllers/CategoryController");

const router = Router();

router.get("/api/contacts", ContactController.index);
router.get("/api/contacts/:id", ContactController.show);
router.post("/api/contacts", ContactController.store);
router.put("/api/contacts/:id", ContactController.update);
router.delete("/api/contacts/:id", ContactController.delete);

router.get("/api/categories", CategoryController.index);
router.get("/api/categories/:id", CategoryController.show);
router.post("/api/categories", CategoryController.store);
router.put("/api/categories/:id", CategoryController.update);
router.delete("/api/categories/:id", CategoryController.delete);

module.exports = router;
